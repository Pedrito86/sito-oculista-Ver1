import { Award, CheckCircle, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function ChiSono() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Chi Sono | Dott.ssa Maria Di Sanzo – Oculista a Bologna</title>
        <meta 
          name="description" 
          content="Scopri di più sulla Dott.ssa Maria Di Sanzo, medico chirurgo specialista in Oftalmologia presso l'AUSL di Bologna. Formazione, esperienza e approccio clinico." 
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Chi Sono | Dott.ssa Maria Di Sanzo – Oculista a Bologna" />
        <meta property="og:description" content="Medico chirurgo specialista in Oftalmologia. Visite per adulti e bambini presso AUSL Bologna." />
        <meta property="og:image" content="https://www.oculistadisanzo.it/oculista-bologna-di-sanzo.jpg" />
        <meta property="og:url" content="https://www.oculistadisanzo.it/chi-sono" />
        <meta property="og:type" content="profile" />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dott.ssa Maria Di Sanzo",
              "image": "https://www.oculistadisanzo.it/oculista-bologna-di-sanzo.jpg",
              "@id": "https://www.oculistadisanzo.it/chi-sono",
              "url": "https://www.oculistadisanzo.it/chi-sono",
              "telephone": "+393470700989",
              "jobTitle": "Oculista",
              "worksFor": {
                "@type": "MedicalOrganization",
                "name": "AUSL Bologna"
              },
              "description": "Medico chirurgo specialista in Oftalmologia presso AUSL Bologna.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Largo Bartolo Nigrisoli",
                "addressLocality": "Bologna",
                "postalCode": "40133",
                "addressCountry": "IT"
              }
            }
          `}
        </script>
      </Helmet>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Dott.ssa Maria Di Sanzo – Oculista a Bologna</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 card border-2 border-blue-100">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img 
                      src="/oculista-bologna-di-sanzo.jpg" 
                      alt="Dott.ssa Maria Di Sanzo" 
                      className="w-full h-full object-cover rounded-full border-4 border-blue-100 shadow-md"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Dott.ssa Maria Di Sanzo</h3>
                    <p className="text-blue-600 font-medium">Medico Chirurgo Specialista in Oftalmologia</p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sono la Dott.ssa Maria Di Sanzo, medico chirurgo specialista in Oftalmologia. 
                  Svolgo la mia attività come oculista a Bologna presso l’AUSL di Bologna, 
                  occupandomi della prevenzione, diagnosi e cura delle principali patologie dell’occhio.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Eseguo visite oculistiche per adulti e bambini, con particolare attenzione alla salute visiva 
                  in ogni fase della vita, dalla prima infanzia all’età adulta. 
                  Il mio approccio si basa su ascolto, chiarezza e accuratezza diagnostica, 
                  per accompagnare il paziente con serenità durante la visita.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Opero all’interno di una struttura pubblica, collaborando con un’équipe multidisciplinare 
                  e utilizzando strumentazioni diagnostiche aggiornate, nel rispetto delle linee guida 
                  e degli standard clinici.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Formazione e attività professionale</h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Dopo la laurea in Medicina e Chirurgia, ho conseguito la specializzazione in Oftalmologia, 
                    approfondendo in particolare la diagnosi e il trattamento delle patologie oculari 
                    in ambito pediatrico e dell’adulto.
                  </p>
                  <p>
                    Svolgo attività clinica presso l’Ospedale Maggiore – AUSL Bologna, 
                    dove mi occupo di visite oculistiche, controlli specialistici e follow-up.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <h4 className="text-2xl font-bold text-gray-900">Approccio di lavoro</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Visite accurate e spiegazioni semplici</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Diagnosi personalizzate</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Aggiornamento continuo sulle tecniche e tecnologie in ambito oculistico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
