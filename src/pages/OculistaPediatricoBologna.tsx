import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Heart } from 'lucide-react';

export default function OculistaPediatricoBologna() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Oculista Pediatrico Bologna</h1>
            <p className="text-xl text-gray-600 mb-8">
              Visite oculistiche specialistiche per bambini e neonati a Bologna. Prevenzione e cura dei difetti visivi nell'infanzia.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="mb-6">
              La vista è il senso principale attraverso cui i bambini imparano e scoprono il mondo. Una <strong>visita oculistica pediatrica</strong> è essenziale per individuare precocemente eventuali difetti visivi che, se trascurati, potrebbero influenzare lo sviluppo visivo e l'apprendimento scolastico.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Quando fare la prima visita oculistica?</h2>
            <p className="mb-4">
              Si consiglia di effettuare controlli periodici anche in assenza di sintomi evidenti. Le tappe fondamentali per lo screening visivo nei bambini sono:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <span>Alla nascita (screening neonatale)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <span>Entro i 3 anni di età</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <span>Prima dell'inizio della scuola elementare (5-6 anni)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <span>Ogni 1-2 anni durante il periodo scolastico</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Patologie pediatriche trattate</h2>
            <p className="mb-4">
              La Dott.ssa Maria Di Sanzo è specializzata nella diagnosi e trattamento delle principali patologie oculari dell'infanzia, tra cui:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mb-8">
              <li className="bg-blue-50 p-4 rounded-lg flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Ambliopia ("occhio pigro")
              </li>
              <li className="bg-blue-50 p-4 rounded-lg flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Strabismo
              </li>
              <li className="bg-blue-50 p-4 rounded-lg flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Miopia, Ipermetropia, Astigmatismo
              </li>
              <li className="bg-blue-50 p-4 rounded-lg flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Congiuntiviti e allergie
              </li>
            </ul>

            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 my-8">
              <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center">
                <Heart className="w-5 h-5 mr-2" /> Un approccio a misura di bambino
              </h3>
              <p className="text-gray-800">
                Sappiamo che la visita medica può spaventare i più piccoli. Per questo, la Dott.ssa Di Sanzo utilizza un approccio dolce e giocoso, strumenti diagnostici adatti all'età pediatrica e un ambiente accogliente per mettere il bambino a proprio agio.
              </p>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Prenota una visita per il tuo bambino</h3>
              <Link
                to="/contatti"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Contatta per appuntamento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
