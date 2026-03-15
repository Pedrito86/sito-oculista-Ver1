import { Eye, Phone, Mail, MapPin, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
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

          <div className="flex flex-col md:items-center">
            <div>
              <h4 className="font-bold text-lg mb-4">Link Rapidi</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <Link to="/chi-sono" className="text-gray-400 hover:text-blue-400 transition-colors">Chi Sono</Link>
                <Link to="/servizi" className="text-gray-400 hover:text-blue-400 transition-colors">Servizi</Link>
                <Link to="/visita-oculistica-bologna" className="text-gray-400 hover:text-blue-400 transition-colors">Visita Oculistica</Link>
                <Link to="/oculista-pediatrico-bologna" className="text-gray-400 hover:text-blue-400 transition-colors">Oculista Pediatrico</Link>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</Link>
                <Link to="/contatti" className="text-gray-400 hover:text-blue-400 transition-colors">Contatti</Link>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors sm:col-span-2">Privacy & Cookie Policy</Link>
              </div>
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

        <div className="border-t border-gray-800 pt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center text-gray-400 text-sm">
          <p className="md:justify-self-start">&copy; {new Date().getFullYear()} Dott.ssa Maria Di Sanzo - Oculista. Tutti i diritti riservati.</p>

          <a
            href="https://www.sornexstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="justify-self-center inline-flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/40 px-4 py-3 text-gray-200 hover:border-blue-500/60 hover:text-white transition-colors w-fit"
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
                <defs>
                  <linearGradient id="sornexLogoStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4F8CFF" />
                    <stop offset="1" stopColor="#8B5CFF" />
                  </linearGradient>
                </defs>
                <rect x="18" y="6" width="40" height="40" rx="11" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="4" />
                <rect x="6" y="18" width="40" height="40" rx="11" fill="none" stroke="#4F8CFF" strokeWidth="4" strokeOpacity="0.75" />
                <rect x="14" y="24" width="40" height="40" rx="11" fill="none" stroke="url(#sornexLogoStroke)" strokeWidth="4" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm">Sornex Studio</span>
              <span className="text-xs text-gray-400">Web Agency</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>

          <Link
            to="/admin"
            className="flex items-center justify-self-center md:justify-self-end hover:text-blue-400 transition-colors opacity-50 hover:opacity-100"
          >
            <Lock className="w-3 h-3 mr-1" />
            Area Riservata
          </Link>
        </div>
      </div>
    </footer>
  );
}
