import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';
import { Clock, Lock, Mail, AlertTriangle, CheckCircle, Calendar, Send, Play, Settings } from 'lucide-react';

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  status: 'confirmed' | 'cancelled';
  notes?: string;
  reminder_sent?: boolean;
}

interface TodayOverviewProps {
  bookings: Booking[];
  upcomingBookings?: Booking[];
  onUpdate: () => void;
}

const TIME_SLOTS = ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

export default function TodayOverview({ bookings, upcomingBookings = [], onUpdate }: TodayOverviewProps) {
  const [blockingSlot, setBlockingSlot] = useState<string | null>(null);
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);
  const [isSendingAll, setIsSendingAll] = useState(false);
  const [autoSendEnabled, setAutoSendEnabled] = useState(() => {
    return localStorage.getItem('autoSendReminders') === 'true';
  });

  // Filter confirmed bookings for today
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const confirmedUpcomingBookings = upcomingBookings.filter(b => b.status === 'confirmed');
  
  // Calculate occupied and free slots
  const occupiedSlots = confirmedBookings.map(b => b.time);
  const freeSlots = TIME_SLOTS.filter(slot => !occupiedSlots.includes(slot));

  useEffect(() => {
    localStorage.setItem('autoSendReminders', String(autoSendEnabled));
  }, [autoSendEnabled]);

  // Auto-send effect
  useEffect(() => {
    const unsentReminders = confirmedUpcomingBookings.filter(b => !b.reminder_sent);
    if (autoSendEnabled && unsentReminders.length > 0 && !isSendingAll && !sendingReminder) {
        const timer = setTimeout(() => {
            handleSendAllReminders(false); // false = no confirm
        }, 2000); // 2 second delay to allow UI to settle and user to see what's happening
        return () => clearTimeout(timer);
    }
  }, [confirmedUpcomingBookings, autoSendEnabled]);

  const handleBlockSlot = async (time: string) => {
    setBlockingSlot(time);
    const today = new Date().toISOString().split('T')[0];

    try {
      const { error } = await supabase.from('bookings').insert({
        date: today,
        time: time,
        name: 'SLOT BLOCCATO',
        email: 'admin@system.local',
        phone: '0000000000',
        status: 'confirmed',
        notes: 'Bloccato manualmente da admin'
      });

      if (error) throw error;
      onUpdate();
    } catch (err) {
      console.error('Errore blocco slot:', err);
      alert('Impossibile bloccare lo slot.');
    } finally {
      setBlockingSlot(null);
    }
  };

  const sendReminderEmail = async (booking: Booking, isTomorrow: boolean) => {
    try {
        const templateParams = {
            to_name: booking.name,
            from_name: 'Dott.ssa Di Sanzo',
            from_email: 'noreply@oculistadisanzo.it',
            to_email: booking.email,
            reply_to: 'info@oculistadisanzo.it',
            patient_email: booking.email,
            phone: booking.phone,
            date: new Date(booking.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
            time: booking.time,
            type: isTomorrow ? 'Promemoria Appuntamento' : 'Reminder Appuntamento',
            cancellation_link: `${window.location.origin}/cancella-prenotazione?token=${booking.id}`
        };

        await emailjs.send(
            EMAIL_CONFIG.SERVICE_ID,
            EMAIL_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAIL_CONFIG.PUBLIC_KEY
        );

        const { error } = await supabase
            .from('bookings')
            .update({ reminder_sent: true })
            .eq('id', booking.id);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error(`Errore invio reminder per ${booking.email}:`, err);
        return false;
    }
  };

  const handleSendReminder = async (booking: Booking, isTomorrow: boolean = false) => {
    setSendingReminder(booking.id);
    const success = await sendReminderEmail(booking, isTomorrow);
    setSendingReminder(null);
    
    if (success) {
        alert(`Reminder inviato a ${booking.email}`);
        onUpdate();
    } else {
        alert('Errore durante l\'invio del reminder.');
    }
  };

  const handleSendAllReminders = async (askConfirm: boolean = true) => {
    const toSend = confirmedUpcomingBookings.filter(b => !b.reminder_sent);
    if (toSend.length === 0) return;

    if (askConfirm && !confirm(`Vuoi inviare ${toSend.length} email di promemoria in sequenza?`)) return;

    setIsSendingAll(true);
    let sentCount = 0;

    for (const booking of toSend) {
        setSendingReminder(booking.id);
        const success = await sendReminderEmail(booking, true);
        if (success) sentCount++;
        // Delay to avoid rate limits
        await new Promise(r => setTimeout(r, 800));
    }

    setSendingReminder(null);
    setIsSendingAll(false);
    onUpdate();
    
    if (askConfirm || sentCount < toSend.length) {
        alert(`Processo completato. Inviati ${sentCount} su ${toSend.length} promemoria.`);
    }
  };

  return (
    <div className="space-y-8">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-blue-600" />
          Oggi
        </h2>
        <div className="flex space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {confirmedBookings.length} Appuntamenti
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${freeSlots.length > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {freeSlots.length} Slot Liberi
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lista Appuntamenti Oggi */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">In Programma</h3>
          {confirmedBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              Nessun appuntamento per oggi.
            </div>
          ) : (
            <div className="space-y-3">
              {confirmedBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center">
                    <div className="font-mono text-blue-600 font-bold mr-3">{booking.time}</div>
                    <div>
                        <div className="font-medium text-gray-900">{booking.name}</div>
                        <div className="text-xs text-gray-500">{booking.phone}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSendReminder(booking)}
                    disabled={sendingReminder === booking.id || booking.name === 'SLOT BLOCCATO'}
                    className={`p-2 rounded-full transition-colors disabled:opacity-50 ${booking.reminder_sent ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-100'}`}
                    title={booking.reminder_sent ? "Reminder già inviato" : "Invia Reminder"}
                  >
                    {booking.reminder_sent ? <CheckCircle className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Azioni Rapide / Slot Liberi */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
            Slot Liberi & Azioni Rapide
          </h3>
          
          {freeSlots.length === 0 ? (
            <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
                <CheckCircle className="w-5 h-5 mr-2" />
                Tutto prenotato per oggi!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {freeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleBlockSlot(slot)}
                  disabled={blockingSlot === slot}
                  className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all group"
                  title="Blocca questo slot"
                >
                  <span className="font-mono mr-2">{slot}</span>
                  {blockingSlot === slot ? (
                    <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Lock className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          )}
          
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg">
            <p>Clicca su un orario libero per bloccarlo immediatamente.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Promemoria Prossimi Appuntamenti */}
    {confirmedUpcomingBookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                    Prossimi Appuntamenti
                </h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {confirmedUpcomingBookings.length} Appuntamenti
                </span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100 gap-4">
                    <div className="flex items-center">
                        <Mail className="w-5 h-5 text-indigo-600 mr-3" />
                        <div>
                            <h3 className="font-medium text-indigo-900">Invia Promemoria</h3>
                            <p className="text-sm text-indigo-700">
                                {confirmedUpcomingBookings.filter(b => !b.reminder_sent).length} email da inviare
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <label className="flex items-center space-x-2 text-sm text-indigo-700 cursor-pointer select-none bg-white px-3 py-2 rounded-lg border border-indigo-100 hover:border-indigo-300 transition-colors">
                            <input 
                                type="checkbox" 
                                checked={autoSendEnabled}
                                onChange={(e) => setAutoSendEnabled(e.target.checked)}
                                className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="flex items-center">
                                <Settings className="w-3 h-3 mr-1" />
                                Auto-invio all'apertura
                            </span>
                        </label>

                        <button
                            onClick={() => handleSendAllReminders(true)}
                            disabled={isSendingAll || confirmedUpcomingBookings.filter(b => !b.reminder_sent).length === 0}
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm w-full sm:w-auto justify-center"
                        >
                            {isSendingAll ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Invio in corso...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 mr-2 fill-current" />
                                    Invia Tutti Ora
                                </>
                            )}
                        </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {confirmedUpcomingBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                            <div className="flex items-center min-w-0">
                                <div className="font-mono text-indigo-600 font-bold mr-3">
                                    {new Date(booking.date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })} {booking.time}
                                </div>
                                <div className="truncate">
                                    <div className="font-medium text-gray-900 truncate">{booking.name}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleSendReminder(booking, true)}
                                disabled={sendingReminder === booking.id || booking.reminder_sent}
                                className={`ml-2 p-2 rounded-full transition-colors flex-shrink-0 ${
                                    booking.reminder_sent 
                                    ? 'text-green-600 bg-green-50 cursor-default' 
                                    : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                                }`}
                                title={booking.reminder_sent ? "Promemoria inviato" : "Invia Promemoria"}
                            >
                                {booking.reminder_sent ? (
                                    <CheckCircle className="w-4 h-4" />
                                ) : (
                                    sendingReminder === booking.id ? <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> : <Send className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    )}
    </div>
  );
}
