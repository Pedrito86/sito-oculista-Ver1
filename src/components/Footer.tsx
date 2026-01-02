import { Eye, Phone, Mail, MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Dott.ssa Maria Di Sanzo</h3>
                <p className="text-blue-400 text-sm">Oculista Specialista</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Specialista in Oftalmologia presso AUSL Bologna
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Link Rapidi</h4>
            <div className="space-y-2 flex flex-col">
              <Link to="/chi-sono" className="text-gray-400 hover:text-blue-400 transition-colors">Chi Sono</Link>
              <Link to="/servizi" className="text-gray-400 hover:text-blue-400 transition-colors">Servizi</Link>
              <Link to="/visita-oculistica-bologna" className="text-gray-400 hover:text-blue-400 transition-colors">Visita Oculistica Bologna</Link>
              <Link to="/oculista-pediatrico-bologna" className="text-gray-400 hover:text-blue-400 transition-colors">Oculista Pediatrico Bologna</Link>
              <Link to="/contatti" className="text-gray-400 hover:text-blue-400 transition-colors">Contatti</Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy & Cookie Policy</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contatti</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+39 347 070 0989</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>mariadisanzo@gmail.com</span>
              </p>
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Ospedale Maggiore di Bologna<br />Largo Bartolo Nigrisoli, Bologna</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Dott.ssa Maria Di Sanzo - Oculista. Tutti i diritti riservati.</p>
          <Link to="/admin" className="flex items-center mt-4 md:mt-0 hover:text-blue-400 transition-colors opacity-50 hover:opacity-100">
            <Lock className="w-3 h-3 mr-1" />
            Area Riservata
          </Link>
        </div>
      </div>
    </footer>
  );
}
