import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ChiSono from './pages/ChiSono';
import Servizi from './pages/Servizi';
import VisitaOculisticaBologna from './pages/VisitaOculisticaBologna';
import OculistaPediatricoBologna from './pages/OculistaPediatricoBologna';
import Contatti from './pages/Contatti';
import Prenotazione from './pages/Prenotazione';
import Cancellazione from './pages/Cancellazione';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CookieBanner from './components/CookieBanner';

const PublicLayout = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    <CookieBanner />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chi-sono" element={<ChiSono />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/visita-oculistica-bologna" element={<VisitaOculisticaBologna />} />
          <Route path="/oculista-pediatrico-bologna" element={<OculistaPediatricoBologna />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/prenotazione" element={<Prenotazione />} />
          <Route path="/cancella-prenotazione" element={<Cancellazione />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
