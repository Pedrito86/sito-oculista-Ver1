import { Users, Eye, ScanEye, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Servizi() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Servizi Oculistici Bologna | Visite ed Esami – Dott.ssa Di Sanzo</title>
        <meta 
          name="description" 
          content="Servizi oculistici a Bologna, Dott.ssa Di Sanzo: visite adulti e bambini, OCT, campo visivo, screening glaucoma e tonometria." 
        />
        <link rel="canonical" href="https://www.oculistadisanzo.it/servizi" />
        <link rel="alternate" hrefLang="it" href="https://www.oculistadisanzo.it/servizi" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Servizi Oculistici Bologna | Dott.ssa Di Sanzo" />
        <meta property="og:description" content="Visite oculistiche complete, OCT, esame del fondo oculare e tonometria a Bologna." />
        <meta property="og:image" content="https://www.oculistadisanzo.it/oculista-bologna-di-sanzo.jpg" />
        <meta property="og:url" content="https://www.oculistadisanzo.it/servizi" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Servizi Oculistici",
              "description": "Elenco dei servizi oculistici offerti: visite, esami diagnostici, screening.",
              "medicalAudience": "Patients"
            }
          `}
        </script>
      </Helmet>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Servizi di Oculistica</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 card border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visite Oculistiche per Adulti</h2>
              <p className="text-gray-600 leading-relaxed">
                Un controllo periodico è fondamentale per preservare la salute degli occhi. La visita completa include la misurazione della vista, la valutazione del segmento anteriore e l'esame del fondo oculare per prevenire patologie come glaucoma e maculopatie.
              </p>
            </div>

            <div className="bg-white p-8 card border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visite Oculistiche Pediatriche</h2>
              <p className="text-gray-600 leading-relaxed">
                Screening visivo specializzato per neonati, bambini e adolescenti. L'obiettivo è individuare e correggere precocemente difetti come l'ambliopia (occhio pigro) e lo strabismo, garantendo un corretto sviluppo visivo.
              </p>
            </div>

            <div className="bg-white p-8 card border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ScanEye className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Esami Diagnostici</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Lo studio si avvale di tecnologie di ultima generazione per una diagnostica precisa e non invasiva:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">OCT (Tomografia a Coerenza Ottica)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Esame del fondo oculare</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Tonometria (Pressione oculare)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Campo visivo computerizzato</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Pachimetria corneale</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 card mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Patologie Trattate</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Grazie all'esperienza clinica ospedaliera, la Dott.ssa Di Sanzo è in grado di gestire un ampio spettro di patologie oculari, dalle più comuni ametropie alle condizioni più complesse che richiedono un monitoraggio costante.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Miopia, ipermetropia, astigmatismo',
                'Presbiopia',
                'Cataratta (Valutazione pre-operatoria)',
                'Glaucoma (Diagnosi e terapia)',
                'Maculopatie e retinopatie',
                'Occhio secco (Dry Eye) e blefariti',
                'Congiuntiviti e infezioni oculari',
                'Ambliopia e strabismo',
                'Miodesopsie ("mosche volanti")'
              ].map((patologia, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{patologia}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Domande Frequenti (FAQ)</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quanto dura una visita oculistica?</h3>
                <p className="text-gray-700">
                  Una visita completa dura mediamente tra i 20 e i 30 minuti. Se è necessario eseguire esami diagnostici aggiuntivi o la dilatazione della pupilla (cicloplegia), la durata potrebbe estendersi fino a 45-60 minuti.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">È necessario dilatare la pupilla?</h3>
                <p className="text-gray-700">
                  La dilatazione è spesso necessaria per esaminare accuratamente il fondo oculare (retina) e, nei bambini, per misurare la vista reale senza l'interferenza dell'accomodazione. L'effetto delle gocce dura qualche ora.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cosa devo portare alla visita?</h3>
                <p className="text-gray-700">
                  È importante portare gli occhiali in uso, eventuale documentazione oculistica precedente (referti, esami) e la lista dei farmaci che si stanno assumendo, anche per patologie non oculari.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ogni quanto fare un controllo?</h3>
                <p className="text-gray-700">
                  In assenza di patologie, si consiglia un controllo ogni 2 anni. Dopo i 40 anni o in presenza di fattori di rischio (diabete, familiarità per glaucoma), è preferibile una visita annuale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tariffe" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Prestazioni e Tariffe</h2>
            <p className="text-gray-600 text-lg">Tariffe indicative</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left text-lg font-semibold">Prestazione</th>
                    <th className="px-6 py-4 text-right text-lg font-semibold">Prezzo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: 'Visita completa', price: 'da €120' },
                    { service: 'Visita oculistica pediatrica', price: 'da €120' },
                    { service: 'Esame OCT', price: 'da €100' },
                    { service: 'Screening visivo pediatrico', price: 'da €120' }
                  ].map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 transition-colors`}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{item.service}</td>
                      <td className="px-6 py-4 text-right text-lg price">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 px-6 py-4 border-t-2 border-blue-200">
              <p className="text-gray-600 text-sm text-center">
                Le tariffe possono variare in base al tipo di prestazione. Per informazioni aggiornate è possibile contattare la segreteria.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
