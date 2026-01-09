import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, Lock, Mail, AlertTriangle, CheckCircle } from 'lucide-react';

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  status: 'confirmed' | 'cancelled';
  notes?: string;
}

interface TodayOverviewProps {
  bookings: Booking[];
  onUpdate: () => void;
}

const TIME_SLOTS = ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

export default function TodayOverview({ bookings, onUpdate }: TodayOverviewProps) {
  const [blockingSlot, setBlockingSlot] = useState<string | null>(null);
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);

  // Filter confirmed bookings for today
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  
  // Calculate occupied and free slots
  const occupiedSlots = confirmedBookings.map(b => b.time);
  const freeSlots = TIME_SLOTS.filter(slot => !occupiedSlots.includes(slot));

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

  const handleSendReminder = async (booking: Booking) => {
    setSendingReminder(booking.id);
    // Simulazione invio email
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Reminder inviato a ${booking.email}`);
    setSendingReminder(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
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
                    className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50"
                    title="Invia Reminder"
                  >
                    <Mail className="w-4 h-4" />
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
  );
}
