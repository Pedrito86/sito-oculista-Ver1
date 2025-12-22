import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-20">
      <section id="home" className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Dott.ssa Maria Di Sanzo
              </h2>
              <p className="text-2xl text-blue-600 font-semibold mb-6">
                Oculista Specialista a Bologna
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Visite oculistiche, diagnostica avanzata e prevenzione visiva per adulti e bambini presso l'AUSL di Bologna.
              </p>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                Prenota una visita per prenderti cura della tua vista con l'aiuto di una professionista attenta, preparata e orientata al benessere del paziente.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex-shrink-0 mt-1"></div>
                  <p className="text-gray-700 text-lg">Ospedale Maggiore di Bologna – AUSL Bologna</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex-shrink-0 mt-1"></div>
                  <p className="text-gray-700 text-lg">Visite specialistiche per adulti e bambini</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex-shrink-0 mt-1"></div>
                  <p className="text-gray-700 text-lg">Tecnologie diagnostiche di ultima generazione</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contatti"
                  className="bg-blue-600 text-center text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Prenota ora
                </Link>
                <Link
                  to="/servizi"
                  className="bg-white text-center text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Scopri i servizi
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/oculista-bologna-di-sanzo.jpg"
                  alt="Dottoressa sorridente in camice con cartella in mano"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visite Adulti</h3>
              <p className="text-gray-600 mb-4">Controllo completo della vista e diagnosi patologie.</p>
              <Link to="/visita-oculistica-bologna" className="text-blue-600 font-semibold flex items-center justify-center hover:underline">
                Scopri di più <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visite Pediatriche</h3>
              <p className="text-gray-600 mb-4">Screening visivo e cura per i più piccoli.</p>
              <Link to="/oculista-pediatrico-bologna" className="text-blue-600 font-semibold flex items-center justify-center hover:underline">
                Scopri di più <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diagnostica</h3>
              <p className="text-gray-600 mb-4">Tecnologie avanzate per esami approfonditi.</p>
              <Link to="/servizi" className="text-blue-600 font-semibold flex items-center justify-center hover:underline">
                Scopri di più <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Dove visitare a Bologna</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Ospedale Maggiore – AUSL Bologna</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Indirizzo</p>
                      <p className="text-gray-700">Largo Bartolo Nigrisoli, Bologna (BO)</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Struttura moderna, facilmente raggiungibile e dotata di servizi di accoglienza.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Parcheggio disponibile nelle aree dedicate.
                </p>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg h-64">
                <img
                  src="/ospedale-maggiore.jpeg"
                  alt="Ospedale Maggiore di Bologna"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
