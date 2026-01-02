import { useState } from 'react';
import { Menu, X, Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const getLinkClass = (path: string) => 
    `transition-colors font-medium ${isActive(path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`;

  const getMobileLinkClass = (path: string) => 
    `block w-full text-left py-2 font-medium ${isActive(path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dott.ssa Maria Di Sanzo</h1>
              <p className="text-sm text-blue-600">Oculista Specialista</p>
            </div>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/chi-sono" className={getLinkClass('/chi-sono')}>Chi Sono</Link>
            <Link to="/servizi" className={getLinkClass('/servizi')}>Servizi</Link>
            <Link to="/visita-oculistica-bologna" className={getLinkClass('/visita-oculistica-bologna')}>Visita Oculistica</Link>
            <Link to="/oculista-pediatrico-bologna" className={getLinkClass('/oculista-pediatrico-bologna')}>Oculista Pediatrico</Link>
            <Link to="/contatti" className={getLinkClass('/contatti')}>Contatti</Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={closeMenu} className={getMobileLinkClass('/')}>Home</Link>
            <Link to="/chi-sono" onClick={closeMenu} className={getMobileLinkClass('/chi-sono')}>Chi Sono</Link>
            <Link to="/servizi" onClick={closeMenu} className={getMobileLinkClass('/servizi')}>Servizi</Link>
            <Link to="/visita-oculistica-bologna" onClick={closeMenu} className={getMobileLinkClass('/visita-oculistica-bologna')}>Visita Oculistica Bologna</Link>
            <Link to="/oculista-pediatrico-bologna" onClick={closeMenu} className={getMobileLinkClass('/oculista-pediatrico-bologna')}>Oculista Pediatrico Bologna</Link>
            <Link to="/contatti" onClick={closeMenu} className={getMobileLinkClass('/contatti')}>Contatti</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
