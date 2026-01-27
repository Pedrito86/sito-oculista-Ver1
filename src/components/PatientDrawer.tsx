import { useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';
import { supabase } from '../lib/supabase';
import { X, Calendar, Phone, Mail, Clock, Save, Trash2, CheckCircle, RotateCcw, FileText, History } from 'lucide-react';

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  status: 'confirmed' | 'cancelled';
  notes?: string;
  cancellation_token?: string;
  // service?: string;
}

interface PatientDrawerProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function PatientDrawer({ booking, isOpen, onClose, onUpdate }: PatientDrawerProps) {
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<Booking[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const fetchHistory = useCallback(async (email: string) => {
    if (!email) return;
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('email', email)
        .neq('id', booking?.id) // Exclude current
        .order('date', { ascending: false });
      
      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error('Errore caricamento storico:', err);
    } finally {
      setLoadingHistory(false);
    }
  }, [booking?.id]);

  // Reset state when booking changes
  useEffect(() => {
    if (booking) {
      setNotes(booking.notes || '');
      setNewDate(booking.date);
      setNewTime(booking.time);
      fetchHistory(booking.email);
    }
  }, [booking, fetchHistory]);

  const handleSaveNotes = async () => {
    if (!booking) return;
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ notes })
        .eq('id', booking.id);
      
      if (error) throw error;
      onUpdate(); // Refresh parent list
      // Show temporary success feedback if needed
    } catch (err) {
      console.error('Errore salvataggio note:', err);
      alert('Errore nel salvataggio delle note');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!booking || !confirm('Sei sicuro di voler cancellare questa prenotazione?')) return;
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', booking.id);

      if (error) throw error;
      onUpdate();
      onClose();
    } catch {
      alert('Errore durante la cancellazione');
    }
  };

  const handleReschedule = async () => {
    if (!booking) return;
    try {
      // Check availability (simplified for admin - assumes admin knows best, or we could reuse check logic)
      // For now, let's just update.
      const { error } = await supabase
        .from('bookings')
        .update({ date: newDate, time: newTime })
        .eq('id', booking.id);

      if (error) throw error;
      setRescheduling(false);
      onUpdate();
      alert('Appuntamente riprogrammato.');

      try {
        const cleanEmail = booking.email.trim();
        const formattedDate = new Date(newDate).toLocaleDateString('it-IT', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });

        const templateParams = {
          to_name: 'Dott.ssa Di Sanzo',
          from_name: booking.name,
          from_email: cleanEmail,
          patient_email: cleanEmail,
          to_email: cleanEmail,
          reply_to: cleanEmail,
          phone: booking.phone,
          date: formattedDate,
          time: newTime,
          type: 'Riprogrammazione Appuntamento',
        };

        await emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams, EMAIL_CONFIG.PUBLIC_KEY);
      } catch (err) {
        console.error('Errore invio email riprogrammazione:', err);
      }
    } catch {
      alert('Errore durante la riprogrammazione');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
        {booking && (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{booking.name}</h2>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {booking.status === 'confirmed' ? 'Confermato' : 'Cancellato'}
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Actions Bar */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              <button 
                onClick={() => alert('Conferma inviata (simulazione)')}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <CheckCircle className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Conferma</span>
              </button>
              <button 
                onClick={() => setRescheduling(!rescheduling)}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors"
              >
                <RotateCcw className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Ripianifica</span>
              </button>
              <button 
                onClick={handleCancelBooking}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Cancella</span>
              </button>
            </div>

            {/* Reschedule Form */}
            {rescheduling && (
              <div className="mb-8 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <h3 className="font-semibold text-orange-900 mb-3">Nuova Data e Ora</h3>
                <div className="space-y-3">
                  <input 
                    type="date" 
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <select 
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <button 
                    onClick={handleReschedule}
                    className="w-full py-2 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700"
                  >
                    Salva Modifiche
                  </button>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <span>{booking.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <span>{booking.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <span>{new Date(booking.date).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-gray-400" />
                <span>{booking.time}</span>
              </div>
              {/* Service removed as we use notes now */}
            </div>

            {/* Notes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Note
                </h3>
                {savingNotes && <span className="text-xs text-gray-500">Salvataggio...</span>}
              </div>
              <div className="relative">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Scrivi una nota..."
                ></textarea>
                <button
                  onClick={handleSaveNotes}
                  className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm"
                  title="Salva nota"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* History */}
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                <History className="w-4 h-4 mr-2" />
                Storico Appuntamenti
              </h3>
              {loadingHistory ? (
                <div className="text-center py-4 text-gray-500">Caricamento storico...</div>
              ) : history.length === 0 ? (
                <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">Nessun altro appuntamento trovato.</div>
              ) : (
                <div className="space-y-3">
                  {history.map((h) => (
                    <div key={h.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-gray-900">
                          {new Date(h.date).toLocaleDateString('it-IT')}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${h.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {h.status === 'confirmed' ? 'Confermato' : 'Cancellato'}
                        </span>
                      </div>
                      <div className="text-gray-600">{h.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
