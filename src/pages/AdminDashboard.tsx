import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, Calendar, Search, Trash2, Mail, Phone, Clock, CheckCircle, XCircle, Settings } from 'lucide-react';
import AdminSchedule from '../components/AdminSchedule';
import TodayOverview from '../components/TodayOverview';
import PatientDrawer from '../components/PatientDrawer';

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  status: 'confirmed' | 'cancelled';
  created_at: string;
  notes?: string;
  cancellation_token?: string;
  reminder_sent?: boolean;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'upcoming' | 'today' | 'all' | 'cancelled'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'appointments' | 'schedule'>('appointments');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  const navigate = useNavigate();

  const fetchBookings = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Errore recupero prenotazioni:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const getFilteredBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    
    let filtered = bookings;

    // Status Filter
    if (filter === 'upcoming') {
      filtered = bookings.filter(b => b.date >= today && b.status === 'confirmed');
    } else if (filter === 'today') {
      filtered = bookings.filter(b => b.date === today && b.status === 'confirmed');
    } else if (filter === 'cancelled') {
      filtered = bookings.filter(b => b.status === 'cancelled');
    }

    // Search Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(lowerTerm) || 
        b.email.toLowerCase().includes(lowerTerm) ||
        b.phone.includes(searchTerm)
      );
    }

    return filtered;
  };

  const handleCancel = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent drawer opening
    if (!window.confirm('Sei sicuro di voler cancellare questa prenotazione?')) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) throw error;
      
      // Refresh list locally
      setBookings(bookings.map(b => 
        b.id === id ? { ...b, status: 'cancelled' } : b
      ));
    } catch (error) {
      console.error('Errore cancellazione:', error);
      alert('Impossibile cancellare la prenotazione');
    }
  };

  const filteredBookings = getFilteredBookings();
  const todayDate = new Date().toISOString().split('T')[0];
  
  // Calculate upcoming bookings (smart weekend logic)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  
  // Base window is 1 day (tomorrow)
  let lookaheadDays = 1;

  // If Friday (5), lookahead 3 days (Sat, Sun, Mon)
  // If Saturday (6), lookahead 2 days (Sun, Mon)
  if (dayOfWeek === 5) lookaheadDays = 3; // Friday -> Show until Monday
  if (dayOfWeek === 6) lookaheadDays = 2; // Saturday -> Show until Monday
  
  const upcomingBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    const diffTime = bookingDate.getTime() - new Date(todayDate).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 && diffDays <= lookaheadDays;
  });

  const todayBookings = bookings.filter(b => b.date === todayDate);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6" />
              <span className="font-bold text-xl">Gestione Appuntamenti</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Esci</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-4 px-2 font-medium transition-colors border-b-2 ${
              activeTab === 'appointments'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Appuntamenti
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`pb-4 px-2 font-medium transition-colors border-b-2 flex items-center ${
              activeTab === 'schedule'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Gestione Calendario
          </button>
        </div>

        {activeTab === 'schedule' ? (
          <AdminSchedule />
        ) : (
          <div className="space-y-6">
            {/* Filters & Stats - Moved to top for quick access */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setFilter('today')}
                className={`p-4 rounded-xl border shadow-sm transition-all text-left ${
                  filter === 'today' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="text-sm font-medium opacity-80">Oggi</div>
                <div className="text-2xl font-bold mt-1">
                  {bookings.filter(b => b.date === todayDate && b.status === 'confirmed').length}
                </div>
              </button>
              
              <button
                onClick={() => setFilter('upcoming')}
                className={`p-4 rounded-xl border shadow-sm transition-all text-left ${
                  filter === 'upcoming' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="text-sm font-medium opacity-80">In Arrivo</div>
                <div className="text-2xl font-bold mt-1">
                  {bookings.filter(b => b.date >= todayDate && b.status === 'confirmed').length}
                </div>
              </button>

              <button
                onClick={() => setFilter('all')}
                className={`p-4 rounded-xl border shadow-sm transition-all text-left ${
                  filter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="text-sm font-medium opacity-80">Totali</div>
                <div className="text-2xl font-bold mt-1">{bookings.length}</div>
              </button>

              <button
                onClick={() => setFilter('cancelled')}
                className={`p-4 rounded-xl border shadow-sm transition-all text-left ${
                  filter === 'cancelled' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 hover:bg-red-50'
                }`}
              >
                <div className="text-sm font-medium opacity-80">Cancellati</div>
                <div className="text-2xl font-bold mt-1">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </div>
              </button>
            </div>

            {/* Split Layout: Table (Left) + Today Overview (Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                
                {/* Main Content: Table & Search - Takes 2/3 space on large screens */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                      <Search className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Cerca per nome, email o telefono..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data e Ora</th>
                              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Paziente</th>
                              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contatti</th>
                              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stato</th>
                              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Azioni</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {loading ? (
                              <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                  Caricamento...
                                </td>
                              </tr>
                            ) : filteredBookings.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                  Nessun appuntamento trovato.
                                </td>
                              </tr>
                            ) : (
                              filteredBookings.map((booking) => (
                                <tr 
                                  key={booking.id} 
                                  onClick={() => setSelectedBooking(booking)}
                                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-gray-900 flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                        {new Date(booking.date).toLocaleDateString('it-IT')}
                                      </span>
                                      <span className="text-sm text-gray-500 flex items-center mt-1">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {booking.time}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                                        {booking.name.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                        <div className="text-xs text-gray-500">ID: {booking.id.slice(0, 8)}...</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex flex-col space-y-1">
                                      <div className="flex items-center text-sm text-gray-600">
                                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                        {booking.email}
                                      </div>
                                      <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                        {booking.phone}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    {booking.status === 'confirmed' ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Confermato
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        <XCircle className="w-3 h-3 mr-1" />
                                        Cancellato
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    {booking.status === 'confirmed' && (
                                      <button
                                        onClick={(e) => handleCancel(e, booking.id)}
                                        className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-full transition-colors"
                                        title="Cancella Prenotazione"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>

                {/* Sidebar: Today & Upcoming - Takes 1/3 space on large screens */}
                <div className="xl:col-span-1">
                    <TodayOverview 
                      bookings={todayBookings} 
                      upcomingBookings={upcomingBookings}
                      onUpdate={fetchBookings} 
                    />
                </div>
            </div>
          </div>
        )}
      </main>

      {/* Drawer */}
      <PatientDrawer 
        booking={selectedBooking} 
        isOpen={!!selectedBooking} 
        onClose={() => setSelectedBooking(null)} 
        onUpdate={fetchBookings}
      />
    </div>
  );
}
