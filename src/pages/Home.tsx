import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Oculista a Bologna | Visite per Adulti e Bambini – Dott.ssa Maria Di Sanzo</title>
        <meta 
          name="description" 
          content="Oculista a Bologna presso AUSL. Visite oculistiche per adulti e bambini. Cura e prevenzione della vista. Prenota una visita." 
        />
        <link rel="canonical" href="https://www.mariadisanzo.com/" />
        <link rel="alternate" hrefLang="it" href="https://www.mariadisanzo.com/" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Oculista a Bologna | Dott.ssa Maria Di Sanzo" />
        <meta property="og:description" content="Visite oculistiche specialistiche per adulti e bambini a Bologna. Prenota il tuo appuntamento." />
        <meta property="og:image" content="https://www.mariadisanzo.com/oculista-bologna-di-sanzo.jpg" />
        <meta property="og:url" content="https://www.mariadisanzo.com/" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dott.ssa Maria Di Sanzo",
              "image": "https://www.mariadisanzo.com/oculista-bologna-di-sanzo.jpg",
              "@id": "https://www.mariadisanzo.com",
              "url": "https://www.mariadisanzo.com",
              "telephone": "+393470700989",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Largo Bartolo Nigrisoli",
                "addressLocality": "Bologna",
                "postalCode": "40133",
                "addressCountry": "IT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 44.5009,
                "longitude": 11.3175
              },
              "medicalSpecialty": "Ophthalmology",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            }
          `}
        </script>
      </Helmet>
      <section id="home" className="pt-16 pb-16 md:pt-12 md:pb-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #f5f9ff, #ffffff)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                Dott.ssa Maria Di Sanzo
              </h1>
              <p className="text-2xl text-blue-600 font-semibold mb-6">
                Oculista a Bologna per la cura e la prevenzione della vista
              </p>
              <p className="text-xl text-gray-800 font-medium mb-6">
                Specialista per adulti e bambini – AUSL Bologna
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                La Dott.ssa Maria Di Sanzo è oculista a Bologna e svolge la propria attività presso l’AUSL di Bologna, occupandosi della prevenzione, diagnosi e cura delle principali patologie oculari. Esegue visite oculistiche per adulti e bambini, con particolare attenzione alla salute visiva in ogni fase della vita.
              </p>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                Un approccio attento, chiaro e professionale, pensato per accompagnare ogni paziente con serenità durante la visita oculistica.
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

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex flex-col items-center">
                  <Link
                    to="/prenotazione"
                    className="bg-blue-600 text-center text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Prenota un appuntamento
                  </Link>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Risposta via email • Nessun impegno immediato
                  </p>
                </div>
                <Link
                  to="/servizi"
                  className="bg-white text-center text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Scopri i servizi
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center order-1 md:order-2">
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">I Nostri Servizi</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-blue-50 card">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visite oculistiche per adulti</h3>
              <p className="text-gray-600 mb-4">Controllo completo della vista e diagnosi patologie.</p>
              <Link to="/visita-oculistica-bologna" className="text-blue-600 font-semibold flex items-center justify-center hover:underline">
                Scopri di più <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-6 bg-blue-50 card">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visite oculistiche pediatriche</h3>
              <p className="text-gray-600 mb-4">Screening visivo e cura per i più piccoli.</p>
              <Link to="/oculista-pediatrico-bologna" className="text-blue-600 font-semibold flex items-center justify-center hover:underline">
                Scopri di più <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-6 bg-blue-50 card">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diagnostica oculistica</h3>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Dove ricevo a Bologna</h2>
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
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Ospedale+Maggiore+Largo+Bartolo+Nigrisoli+Bologna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Vedi su Google Maps
                      </a>
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
