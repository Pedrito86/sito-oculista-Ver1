import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ChiSono from './pages/ChiSono';
import Servizi from './pages/Servizi';
import VisitaOculisticaBologna from './pages/VisitaOculisticaBologna';
import OculistaPediatricoBologna from './pages/OculistaPediatricoBologna';
import Contatti from './pages/Contatti';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-sono" element={<ChiSono />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/visita-oculistica-bologna" element={<VisitaOculisticaBologna />} />
            <Route path="/oculista-pediatrico-bologna" element={<OculistaPediatricoBologna />} />
            <Route path="/contatti" element={<Contatti />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
