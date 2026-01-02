import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar as CalendarIcon, Plus, Trash2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface Override {
  date: string;
  is_available: boolean;
  note: string;
}

export default function AdminSchedule() {
  const [overrides, setOverrides] = useState<Override[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDate, setNewDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newType, setNewType] = useState<'closed' | 'open'>('closed');
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOverrides();
  }, []);

  const fetchOverrides = async () => {
    try {
      const { data, error } = await supabase
        .from('schedule_overrides')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setOverrides(data || []);
    } catch (err) {
      console.error('Errore caricamento eccezioni:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    setError(null);
    try {
      const datesToUpsert = [];
      const start = new Date(newDate);
      const end = newEndDate ? new Date(newEndDate) : new Date(newDate);

      if (end < start) {
        throw new Error('La data di fine deve essere successiva alla data di inizio');
      }

      // Loop per generare tutte le date nel range
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        datesToUpsert.push({
          date: d.toISOString().split('T')[0],
          is_available: newType === 'open',
          note: newNote
        });
      }

      const { error } = await supabase
        .from('schedule_overrides')
        .upsert(datesToUpsert);

      if (error) throw error;

      setNewDate('');
      setNewEndDate('');
      setNewNote('');
      fetchOverrides();
    } catch (err: any) {
      setError(err.message || 'Errore salvataggio');
    }
  };

  const handleDelete = async (date: string) => {
    if (!window.confirm('Rimuovere questa eccezione?')) return;

    try {
      const { error } = await supabase
        .from('schedule_overrides')
        .delete()
        .eq('date', date);

      if (error) throw error;
      setOverrides(overrides.filter(o => o.date !== date));
    } catch (err) {
      alert('Errore cancellazione');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <CalendarIcon className="w-6 h-6 mr-2 text-blue-600" />
        Gestione Eccezioni (Ferie & Aperture Straordinarie)
      </h2>

      {/* Form Aggiunta */}
      <form onSubmit={handleAddOverride} className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Inizio</label>
            <input
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Fine (Opz.)</label>
            <input
              type="date"
              value={newEndDate}
              min={newDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Eccezione</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'closed' | 'open')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="closed">CHIUSO (Ferie/Festa)</option>
              <option value="open">APERTO (Straordinario)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note (Opzionale)</label>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Es. Ferragosto"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi
          </button>
        </div>
        {error && (
          <div className="mt-3 text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}
      </form>

      {/* Lista Eccezioni */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stato</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Note</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500">Caricamento...</td></tr>
            ) : overrides.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500">Nessuna eccezione impostata.</td></tr>
            ) : (
              overrides.map((override) => (
                <tr key={override.date} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {new Date(override.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    {override.is_available ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Aperto
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Chiuso
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {override.note || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(override.date)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                      title="Rimuovi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
