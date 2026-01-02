import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle, Loader2, CalendarPlus } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';
import { supabase } from '../lib/supabase';

export default function Prenotazione() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [cancellationLink, setCancellationLink] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [scheduleOverrides, setScheduleOverrides] = useState<Record<string, boolean>>({}); // 'YYYY-MM-DD': true/false

  // Configuration
  const availableDays = [1, 3]; // 1 = Monday, 3 = Wednesday
  const timeSlots = [
    '14:30', '15:00', '15:30', '16:00', 
    '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  useEffect(() => {
    fetchScheduleOverrides();
  }, [currentDate]);

  const fetchScheduleOverrides = async () => {
    // Calcola inizio e fine del mese visualizzato (inclusi un po' di giorni prima/dopo per sicurezza)
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const startDate = new Date(year, month, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month + 1, 7).toISOString().split('T')[0]; // Un po' di buffer

    try {
      const { data, error } = await supabase
        .from('schedule_overrides')
        .select('date, is_available')
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) throw error;

      const overridesMap: Record<string, boolean> = {};
      data?.forEach((item: any) => {
        overridesMap[item.date] = item.is_available;
      });
      setScheduleOverrides(overridesMap);
    } catch (err) {
      console.error('Error fetching schedule overrides:', err);
    }
  };

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    // Adjust to make Monday = 0, Sunday = 6 for European calendar
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
    setSelectedDate(null);
    setSelectedSlot(null);
    setBookingConfirmed(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  const isDayAvailable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD local

    // 1. Check override
    if (scheduleOverrides[dateStr] !== undefined) {
      return scheduleOverrides[dateStr];
    }

    // 2. Fallback to standard days
    const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ...
    return availableDays.includes(dayOfWeek);
  };

  const handleDateClick = (day: number) => {
    if (isDayAvailable(day)) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      // Adjust timezone offset to avoid date shifting when saving/reading ISO strings
      // Or simply use local date string for querying
      
      setSelectedDate(newDate);
      setSelectedSlot(null);
      setBookingConfirmed(false);
      fetchOccupiedSlots(newDate);
    }
  };

  const fetchOccupiedSlots = async (date: Date) => {
    setLoadingSlots(true);
    setOccupiedSlots([]);
    
    // Format date as YYYY-MM-DD to match database
    // We use 'en-CA' because it outputs YYYY-MM-DD format consistently
    const dateStr = date.toLocaleDateString('en-CA'); 

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('time')
        .eq('date', dateStr)
        .eq('status', 'confirmed');

      if (error) throw error;

      if (data) {
        setOccupiedSlots(data.map(booking => booking.time));
      }
    } catch (error) {
      console.error('Errore recupero disponibilità:', error);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedSlot && formData.name && formData.email && formData.phone) {
      setIsSubmitting(true);
      setSubmitError(null);

      const dateStr = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD

      try {
        // 1. Verifica disponibilità finale (double check)
        const { data: existing } = await supabase
          .from('bookings')
          .select('id')
          .eq('date', dateStr)
          .eq('time', selectedSlot)
          .eq('status', 'confirmed')
          .single();

        if (existing) {
          throw new Error('Questo orario è stato appena prenotato da un altro utente.');
        }

        // 2. Inserisci prenotazione su Supabase
        const { data: newBooking, error: insertError } = await supabase
          .from('bookings')
          .insert([
            {
              date: dateStr,
              time: selectedSlot,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              status: 'confirmed'
            }
          ])
          .select('cancellation_token')
          .single();

        if (insertError) throw insertError;
        
        const cancellationToken = newBooking?.cancellation_token;
        const link = `${window.location.origin}/cancella-prenotazione?token=${cancellationToken}`;
        setCancellationLink(link);
        
        // Log per debug immediato (utile se l'email non arriva)
        console.log('Link cancellazione generato:', link);

        // 3. Invia Email con EmailJS
        const cleanEmail = formData.email.trim();
        
        const templateParams = {
          to_name: 'Dott.ssa Di Sanzo',
          from_name: formData.name,
          from_email: cleanEmail,     // Variabile per chi invia
          patient_email: cleanEmail,  // Variabile esplicita per il destinatario (paziente)
          to_email: cleanEmail,       // Fallback comune
          reply_to: cleanEmail,       // Utile per il "Reply-To"
          phone: formData.phone,
          date: selectedDate.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
          time: selectedSlot,
          type: 'Prenotazione Visita',
          cancellation_link: link // Assicurati di aggiungere {{cancellation_link}} nel template EmailJS
        };

        await emailjs.send(
          EMAIL_CONFIG.SERVICE_ID,
          EMAIL_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAIL_CONFIG.PUBLIC_KEY
        );
        
        setBookingConfirmed(true);
        // Refresh slots just in case
        fetchOccupiedSlots(selectedDate);
        
      } catch (error: any) {
        console.error('Errore prenotazione:', error);
        // EmailJS returns error.text, Error objects return error.message
        const errorMessage = error.text || error.message || 'Si è verificato un errore. Riprova più tardi.';
        setSubmitError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedSlot) return '';
    
    const [hours, minutes] = selectedSlot.split(':').map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30); // 30 min duration
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const details = `Prenotazione visita oculistica con Dott.ssa Di Sanzo\nTel: +39 347 070 0989\nLuogo: Ospedale Maggiore di Bologna`;
    const location = "Largo Bartolo Nigrisoli, Bologna";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Visita Oculistica Dott.ssa Di Sanzo&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-14"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDayAvailable(day);
      const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth();
      const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={!isAvailable}
          className={`
            h-10 md:h-14 rounded-lg flex items-center justify-center text-sm md:text-base font-medium transition-all
            ${isSelected ? 'bg-blue-600 text-white shadow-md scale-105' : ''}
            ${!isSelected && isAvailable ? 'hover:bg-blue-100 text-blue-900 font-bold cursor-pointer' : ''}
            ${!isSelected && !isAvailable ? 'text-gray-300 cursor-not-allowed' : ''}
            ${isToday && !isSelected ? 'border-2 border-blue-600' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prenota la tua Visita</h1>
          <p className="text-gray-600 text-lg">Seleziona una data e un orario disponibile per il tuo appuntamento.</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Calendar Section */}
          <div className="p-6 md:p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>

            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span>Selezionato</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-100 rounded-full mr-2"></div>
                <span>Disponibile</span>
              </div>
            </div>
          </div>

          {/* Slots Section */}
          <div className="p-6 md:p-8 md:w-1/2 bg-gray-50 flex flex-col">
            {bookingConfirmed ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Prenotazione Inviata!</h3>
                <p className="text-gray-600 mb-6">
                  Grazie <span className="font-bold">{formData.name}</span>,<br />
                  hai richiesto un appuntamento per il giorno <br />
                  <span className="font-bold text-gray-900">
                    {selectedDate?.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span> alle ore <span className="font-bold text-gray-900">{selectedSlot}</span>.
                </p>

                {cancellationLink && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 max-w-md w-full">
                    <p className="font-semibold mb-2 flex items-center justify-center">
                      <span className="mr-2">⚠️</span> Gestione Appuntamento
                    </p>
                    <p className="mb-2">
                      Abbiamo inviato una email di conferma a <strong>{formData.email}</strong>.
                      Se necessario, puoi cancellare l'appuntamento usando il link nell'email o cliccando qui sotto:
                    </p>
                    <a 
                      href={cancellationLink} 
                      className="text-blue-600 hover:text-blue-800 underline font-medium break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cancella / Gestisci Prenotazione
                    </a>
                  </div>
                )}

                <a 
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  <CalendarPlus className="w-5 h-5" />
                  <span>Aggiungi al Calendario</span>
                </a>

                <button 
                  onClick={() => {
                    setBookingConfirmed(false);
                    setSelectedDate(null);
                    setSelectedSlot(null);
                    setFormData({ name: '', email: '', phone: '' });
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Prenota un'altra visita
                </button>
              </div>
            ) : selectedDate ? (
              <div className="flex-grow flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {selectedSlot ? 'Completa i tuoi dati' : 'Orari disponibili'}
                </h3>
                <p className="text-blue-600 mb-6 font-medium">
                  {selectedDate.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
                  {selectedSlot && <span className="text-gray-900"> - ore {selectedSlot}</span>}
                </p>

                {!selectedSlot ? (
                  <div className="grid grid-cols-2 gap-3 mb-8 overflow-y-auto max-h-[400px] pr-2">
                    {loadingSlots ? (
                      <div className="col-span-2 flex justify-center py-8">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                      </div>
                    ) : (
                      timeSlots.map(slot => {
                        const isOccupied = occupiedSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            onClick={() => !isOccupied && setSelectedSlot(slot)}
                            disabled={isOccupied}
                            className={`
                              py-3 px-4 rounded-lg text-sm font-semibold transition-all border 
                              ${isOccupied 
                                ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed decoration-slice' 
                                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md'
                              }
                            `}
                          >
                            {slot} {isOccupied && '(Occupato)'}
                          </button>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="flex-grow flex flex-col">
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome *</label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="Mario Rossi"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="mario@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefono *</label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                          placeholder="333 1234567"
                        />
                      </div>
                    </div>

                    <div className="mt-auto space-y-3">
                      {submitError && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                          {submitError}
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl text-lg font-bold transition-all shadow-lg flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Invio in corso...
                          </>
                        ) : (
                          <>
                            <CalendarIcon className="w-5 h-5 mr-2" />
                            Conferma Prenotazione
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setSelectedSlot(null)}
                        className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors disabled:opacity-50"
                      >
                        Cambia orario
                      </button>
                      
                      <p className="text-xs text-center text-gray-500">
                        La prenotazione è soggetta a conferma da parte della segreteria.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-400">
                <CalendarIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">Seleziona una data dal calendario per vedere gli orari disponibili.</p>
                <p className="text-sm mt-2 opacity-60">Le visite sono disponibili Lunedì e Mercoledì pomeriggio.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
