import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar } from 'lucide-react';

export default function VisitaOculisticaBologna() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Visita Oculistica Bologna</h1>
            <p className="text-xl text-gray-600 mb-8">
              La Dott.ssa Maria Di Sanzo offre visite oculistiche complete e specialistiche per adulti a Bologna.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="mb-6">
              Una <strong>visita oculistica completa</strong> è fondamentale per preservare la salute dei tuoi occhi e prevenire patologie che potrebbero compromettere la vista. A Bologna, presso l'Ospedale Maggiore (AUSL Bologna), la Dott.ssa Maria Di Sanzo esegue controlli accurati utilizzando le più moderne tecnologie diagnostiche.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cosa comprende la visita oculistica?</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <span><strong>Anamnesi:</strong> Raccolta della storia clinica del paziente per comprendere eventuali sintomi o familiarità con patologie oculari.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <span><strong>Esame della vista:</strong> Misurazione dell'acutezza visiva per individuare miopia, ipermetropia, astigmatismo o presbiopia.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <span><strong>Tonometria:</strong> Misurazione della pressione intraoculare, essenziale per la prevenzione del glaucoma.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <span><strong>Esame del fondo oculare:</strong> Valutazione della retina e del nervo ottico per diagnosticare patologie retiniche, maculopatie o danni da diabete e ipertensione.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Perché scegliere la Dott.ssa Di Sanzo a Bologna?</h2>
            <p className="mb-6">
              Scegliere un professionista esperto è garanzia di una diagnosi precisa e di un trattamento efficace. La Dott.ssa Di Sanzo unisce competenza clinica, aggiornamento continuo e un approccio umano che mette il paziente al centro.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 my-8">
              <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" /> Dove si svolge la visita
              </h3>
              <p>
                Le visite si svolgono presso l'<strong>Ospedale Maggiore di Bologna</strong>, Largo Bartolo Nigrisoli, una struttura d'eccellenza facilmente raggiungibile.
              </p>
              <div className="mt-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Ospedale+Maggiore+Largo+Bartolo+Nigrisoli+Bologna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Indicazioni stradali su Google Maps
                </a>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Prenota la tua visita oggi</h3>
              <Link
                to="/contatti"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Richiedi un appuntamento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
