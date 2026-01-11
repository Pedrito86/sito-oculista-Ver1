import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';
import { supabase } from '../lib/supabase';
import { AlertCircle, Calendar as CalendarIcon, CalendarPlus, CheckCircle, ChevronLeft, ChevronRight, Loader2, Trash2, XCircle } from 'lucide-react';

export default function Cancellazione() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'ready' | 'cancelled' | 'error' | 'invalid' | 'not_found'>('loading');
  const [action, setAction] = useState<'none' | 'reschedule' | 'rescheduling' | 'rescheduled' | 'cancelling'>('none');
  const [actionError, setActionError] = useState<string | null>(null);
  const [booking, setBooking] = useState<{
    id: string;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    status: 'confirmed' | 'cancelled';
  } | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [scheduleOverrides, setScheduleOverrides] = useState<Record<string, boolean>>({});

  const availableDays = [1, 3];
  const timeSlots = useMemo(
    () => ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'],
    []
  );

  useEffect(() => {
    const loadBooking = async () => {
      if (!token) {
        setStatus('invalid');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('id, date, time, name, email, phone, status')
          .eq('cancellation_token', token)
          .single();

        if (error || !data) {
          setStatus('not_found');
          return;
        }

        setBooking(data);
        if (data.status === 'cancelled') {
          setStatus('cancelled');
        } else {
          setStatus('ready');
        }
      } catch {
        setStatus('error');
      }
    };

    loadBooking();
  }, [token]);

  useEffect(() => {
    const loadOverrides = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startDate = new Date(year, month, 1).toISOString().split('T')[0];
      const endDate = new Date(year, month + 1, 7).toISOString().split('T')[0];

      try {
        const { data, error } = await supabase
          .from('schedule_overrides')
          .select('date, is_available')
          .gte('date', startDate)
          .lte('date', endDate);

        if (error) throw error;

        const overridesMap: Record<string, boolean> = {};
        data?.forEach((item: { date: string; is_available: boolean }) => {
          overridesMap[item.date] = item.is_available;
        });
        setScheduleOverrides(overridesMap);
      } catch {
        setScheduleOverrides({});
      }
    };

    loadOverrides();
  }, [currentDate]);

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    
    // Limit navigation to 365 days from today
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 365);

    if (newDate > maxDate) {
      return;
    }

    setCurrentDate(newDate);
    setSelectedDate(null);
    setSelectedSlot(null);
    setOccupiedSlots([]);
    setActionError(null);
  };

  const isDayAvailable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toLocaleDateString('en-CA');

    if (scheduleOverrides[dateStr] !== undefined) {
      return scheduleOverrides[dateStr];
    }

    const dayOfWeek = date.getDay();
    return availableDays.includes(dayOfWeek);
  };

  const fetchOccupiedSlots = async (date: Date) => {
    if (!booking) return;
    setLoadingSlots(true);
    setOccupiedSlots([]);
    const dateStr = date.toLocaleDateString('en-CA');

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('time, id')
        .eq('date', dateStr)
        .eq('status', 'confirmed');

      if (error) throw error;

      const occupied = (data || [])
        .filter((b: { id: string }) => b.id !== booking.id)
        .map((b: { time: string }) => b.time);
      setOccupiedSlots(occupied);
    } catch {
      setOccupiedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateClick = (day: number) => {
    if (!isDayAvailable(day)) return;
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedSlot(null);
    setActionError(null);
    fetchOccupiedSlots(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-14"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDayAvailable(day);
      const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth();
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

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
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
  ];

  const getGoogleCalendarUrl = (dateStr: string, time: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const details = `Prenotazione visita oculistica con Dott.ssa Di Sanzo\nTel: +39 347 070 0989\nLuogo: Ospedale Maggiore di Bologna`;
    const location = 'Largo Bartolo Nigrisoli, Bologna';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Visita Oculistica Dott.ssa Di Sanzo&dates=${formatDate(
      startDate
    )}/${formatDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  const handleReschedule = async () => {
    if (!token || !booking || !selectedDate || !selectedSlot) return;
    setAction('rescheduling');
    setActionError(null);

    const dateStr = selectedDate.toLocaleDateString('en-CA');

    try {
      // Usa la RPC per riprogrammare in modo sicuro e gestire i permessi RLS
      const { data, error } = await supabase.rpc('reschedule_booking', {
        token_input: token,
        new_date: dateStr,
        new_time: selectedSlot
      });

      if (error) throw error;

      // Cast del risultato (supabase rpc ritorna any/json)
      const result = data as { success: boolean; message: string };
      
      if (!result.success) {
        throw new Error(result.message);
      }

      setBooking({ ...booking, date: dateStr, time: selectedSlot });
      
      // Invia email di conferma riprogrammazione
      try {
        const link = `${window.location.origin}/cancella-prenotazione?token=${token}`;
        const templateParams = {
          to_name: 'Dott.ssa Di Sanzo',
          from_name: booking.name,
          from_email: booking.email,
          patient_email: booking.email,
          to_email: booking.email,
          reply_to: booking.email,
          phone: booking.phone,
          date: selectedDate.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
          time: selectedSlot,
          type: 'Riprogrammazione Visita',
          cancellation_link: link
        };

        await emailjs.send(
          EMAIL_CONFIG.SERVICE_ID,
          EMAIL_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAIL_CONFIG.PUBLIC_KEY
        );
        console.log('Email di riprogrammazione inviata con successo');
      } catch (emailErr) {
        console.error('Errore invio email riprogrammazione:', emailErr);
        // Non blocchiamo il flusso se l'email fallisce, ma logghiamo l'errore
      }

      setSelectedDate(null);
      setSelectedSlot(null);
      setOccupiedSlots([]);
      setAction('rescheduled');
    } catch (err) {
      console.error('Errore riprogrammazione:', err);
      if (err instanceof Error) setActionError(err.message);
      else setActionError('Impossibile riprogrammare la visita. Riprova più tardi.');
      setAction('reschedule');
    }
  };

  const handleCancel = async () => {
    if (!token || !booking) return;
    if (!window.confirm('Vuoi cancellare la prenotazione?')) return;

    setAction('cancelling');
    setActionError(null);

    try {
      const { data, error } = await supabase.rpc('cancel_booking', { token_input: token });

      if (error) {
        const { error: updateError, data: updateData } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('cancellation_token', token)
          .eq('status', 'confirmed')
          .select();

        if (updateError || !updateData || updateData.length === 0) {
          throw error || updateError || new Error('Cancellazione fallita');
        }
        setStatus('cancelled');
        return;
      }

      if (data) {
        setStatus('cancelled');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setAction('none');
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        {status === 'loading' && (
          <div className="flex flex-col items-center text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Caricamento prenotazione...</h2>
          </div>
        )}

        {status === 'ready' && booking && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestisci la tua prenotazione</h1>
              <p className="text-gray-600 mt-2">
                Appuntamento per{' '}
                <span className="font-semibold text-gray-900">
                  {new Date(`${booking.date}T00:00:00`).toLocaleDateString('it-IT', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>{' '}
                alle ore <span className="font-semibold text-gray-900">{booking.time}</span>
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
            </div>

            {action === 'rescheduled' && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm text-center">
                La visita è stata riprogrammata con successo.
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <button
                type="button"
                onClick={() => {
                  setAction('reschedule');
                  setActionError(null);
                  setSelectedDate(null);
                  setSelectedSlot(null);
                  setOccupiedSlots([]);
                }}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                disabled={action === 'rescheduling' || action === 'cancelling'}
              >
                Riprogramma visita
              </button>
              <a
                href={getGoogleCalendarUrl(booking.date, booking.time)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors font-semibold"
              >
                <CalendarPlus className="w-5 h-5 mr-2" />
                Aggiungi al Calendario
              </a>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-red-600 px-6 py-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors font-semibold"
                disabled={action === 'rescheduling' || action === 'cancelling'}
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Cancella prenotazione
              </button>
            </div>

            {action === 'reschedule' || action === 'rescheduling' ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                <div className="p-6 md:p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      disabled={action === 'rescheduling'}
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-900">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button
                      onClick={() => changeMonth(1)}
                      className={`p-2 rounded-full transition-colors ${
                        (action === 'rescheduling' || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1) > new Date(new Date().setDate(new Date().getDate() + 365)))
                          ? 'opacity-30 cursor-not-allowed'
                          : 'hover:bg-gray-100'
                      }`}
                      disabled={action === 'rescheduling' || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1) > new Date(new Date().setDate(new Date().getDate() + 365))}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day) => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

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

                <div className="p-6 md:p-8 md:w-1/2 bg-gray-50 flex flex-col">
                  {selectedDate ? (
                    <div className="flex-grow flex flex-col h-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {selectedSlot ? 'Conferma riprogrammazione' : 'Orari disponibili'}
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
                            timeSlots.map((slot) => {
                              const isOccupied = occupiedSlots.includes(slot);
                              return (
                                <button
                                  key={slot}
                                  onClick={() => !isOccupied && setSelectedSlot(slot)}
                                  disabled={isOccupied || action === 'rescheduling'}
                                  className={`
                                    py-3 px-4 rounded-lg text-sm font-semibold transition-all border
                                    ${
                                      isOccupied
                                        ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
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
                        <div className="mt-auto space-y-3">
                          {actionError && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center">{actionError}</div>
                          )}

                          <button
                            type="button"
                            disabled={action === 'rescheduling'}
                            onClick={handleReschedule}
                            className="w-full py-4 rounded-xl text-lg font-bold transition-all shadow-lg flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {action === 'rescheduling' ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Riprogrammazione in corso...
                              </>
                            ) : (
                              <>
                                <CalendarIcon className="w-5 h-5 mr-2" />
                                Conferma riprogrammazione
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={action === 'rescheduling'}
                            onClick={() => setSelectedSlot(null)}
                            className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors disabled:opacity-50"
                          >
                            Cambia orario
                          </button>
                        </div>
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
            ) : null}

            <div className="mt-8 text-center">
              <Link to="/" className="text-blue-600 font-medium hover:underline">
                Torna alla Home
              </Link>
            </div>
          </div>
        )}

        {status === 'cancelled' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prenotazione cancellata</h2>
            <p className="text-gray-600 mb-6">
              Il tuo appuntamento è stato annullato correttamente. Se vuoi, puoi prenotare una nuova visita.
            </p>
            <div className="space-y-3 w-full max-w-sm">
              <Link to="/prenotazione" className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Prenota una nuova visita
              </Link>
              <Link to="/" className="block text-gray-500 hover:text-gray-700 text-sm">
                Torna alla Home
              </Link>
            </div>
          </div>
        )}

        {status === 'not_found' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prenotazione non trovata</h2>
            <p className="text-gray-600 mb-6">Il link non è valido o la prenotazione non esiste.</p>
            <div className="space-y-4 w-full max-w-sm">
              <Link to="/contatti" className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Contatta Segreteria
              </Link>
              <Link to="/" className="block text-gray-500 hover:text-gray-700 text-sm">
                Torna alla Home
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Errore</h2>
            <p className="text-gray-600 mb-6">Si è verificato un errore. Riprova più tardi o contatta la segreteria.</p>
            <div className="space-y-4 w-full max-w-sm">
              <Link to="/contatti" className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Contatta Segreteria
              </Link>
              <Link to="/" className="block text-gray-500 hover:text-gray-700 text-sm">
                Torna alla Home
              </Link>
            </div>
          </div>
        )}

        {status === 'invalid' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Link non valido</h2>
            <p className="text-gray-600 mb-6">Manca il token. Controlla di aver cliccato il link corretto nell'email.</p>
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Torna alla Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
