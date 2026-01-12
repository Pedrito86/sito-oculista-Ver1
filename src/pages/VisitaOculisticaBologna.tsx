import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function VisitaOculisticaBologna() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Visita Oculistica Bologna Completa | Dott.ssa Maria Di Sanzo</title>
        <meta 
          name="description" 
          content="Visita oculistica completa a Bologna con la Dott.ssa Di Sanzo. Esami vista, tonometria e fondo oculare all'Ospedale Maggiore." 
        />
        <link rel="canonical" href="https://www.mariadisanzo.com/visita-oculistica-bologna" />
        <link rel="alternate" hrefLang="it" href="https://www.mariadisanzo.com/visita-oculistica-bologna" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Visita Oculistica Bologna Completa | Dott.ssa Maria Di Sanzo" />
        <meta property="og:description" content="Controllo completo della vista, tonometria e fondo oculare a Bologna." />
        <meta property="og:image" content="https://www.mariadisanzo.com/oculista-bologna-di-sanzo.jpg" />
        <meta property="og:url" content="https://www.mariadisanzo.com/visita-oculistica-bologna" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalProcedure",
              "name": "Visita Oculistica Completa",
              "description": "Visita oculistica specialistica comprensiva di esame della vista, tonometria e fondo oculare.",
              "performer": {
                "@type": "Physician",
                "name": "Dott.ssa Maria Di Sanzo"
              },
              "location": {
                "@type": "Hospital",
                "name": "Ospedale Maggiore di Bologna",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Largo Bartolo Nigrisoli",
                  "addressLocality": "Bologna",
                  "postalCode": "40133",
                  "addressCountry": "IT"
                }
              }
            }
          `}
        </script>
      </Helmet>
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
              Una <strong>visita oculistica completa</strong> è un esame medico fondamentale non solo per valutare la capacità visiva, ma per preservare la salute globale dei tuoi occhi. A Bologna, presso l'Ospedale Maggiore (AUSL Bologna), la Dott.ssa Maria Di Sanzo esegue controlli approfonditi utilizzando le più moderne tecnologie diagnostiche per individuare precocemente patologie che, se trascurate, potrebbero compromettere la vista in modo permanente.
            </p>

            <p className="mb-8">
              La vista è il nostro senso più prezioso: circa l'80% delle informazioni che riceviamo dal mondo esterno passa attraverso gli occhi. Per questo motivo, sottoporsi a controlli regolari è essenziale a qualsiasi età, anche in assenza di sintomi evidenti.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cosa comprende la visita oculistica?</h2>
            <p className="mb-6">
              La visita specialistica segue un protocollo rigoroso e completo, suddiviso in diverse fasi per analizzare ogni aspetto della funzione visiva e della struttura oculare:
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">1. Anamnesi Patologica e Familiare</h3>
                  <p>Il primo passo è il colloquio con il paziente. Vengono raccolte informazioni sulla storia clinica, eventuali malattie sistemiche (come diabete o ipertensione), allergie e familiarità con patologie oculari come glaucoma o maculopatia. Questo permette di delineare il profilo di rischio individuale.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">2. Esame della Vista (Refrazione)</h3>
                  <p>Attraverso l'uso di ottotipi (le tabelle con lettere o numeri) e lenti di prova, si misura l'acutezza visiva naturale e corretta. Questo test permette di diagnosticare difetti refrattivi comuni come <strong>miopia</strong> (difficoltà a vedere da lontano), <strong>ipermetropia</strong>, <strong>astigmatismo</strong> e <strong>presbiopia</strong> (la difficoltà di lettura che insorge dopo i 40 anni).</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">3. Biomicroscopia (Lampada a Fessura)</h3>
                  <p>Utilizzando un microscopio biooculare, l'oculista ispeziona le strutture anteriori dell'occhio: palpebre, congiuntiva, cornea, iride e cristallino. È fondamentale per rilevare infiammazioni, occhio secco, o l'inizio di una cataratta.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">4. Tonometria (Misurazione della Pressione)</h3>
                  <p>La misurazione della pressione intraoculare (IOP) è il test principale per lo screening del <strong>glaucoma</strong>. Una pressione elevata, infatti, può danneggiare silenziosamente il nervo ottico portando a una perdita irreversibile del campo visivo.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">5. Esame del Fondo Oculare (Fundus Oculi)</h3>
                  <p>Attraverso la dilatazione della pupilla (quando necessaria), si esamina la parte posteriore dell'occhio: retina, macula e nervo ottico. Questo esame è cruciale per diagnosticare maculopatie, distacchi di retina e retinopatia diabetica o ipertensiva.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Quando è necessario prenotare una visita?</h2>
            <p className="mb-4">
              Oltre ai controlli di routine (consigliati ogni 1-2 anni), è importante richiedere tempestivamente un appuntamento in presenza di questi sintomi:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-700">
              <li>Calo improvviso o progressivo della vista (da lontano o da vicino).</li>
              <li>Visione offuscata o sdoppiata.</li>
              <li>Comparsa di "mosche volanti" (miodesopsie) o lampi di luce (fosfeni).</li>
              <li>Dolore oculare, arrossamento persistente o secrezioni.</li>
              <li>Mal di testa frequenti associati all'uso della vista.</li>
              <li>Difficoltà nella visione notturna o sensibilità alla luce.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Prevenzione: la migliore cura</h2>
            <p className="mb-6">
              Molte malattie oculari, come il <strong>glaucoma</strong> o la <strong>degenerazione maculare</strong>, sono asintomatiche nelle fasi iniziali. Solo attraverso una visita oculistica completa è possibile diagnosticarle prima che provochino danni irreversibili.
            </p>
            <p className="mb-8">
              Per i pazienti diabetici, ipertesi o con familiarità per patologie oculari, i controlli devono essere rigorosi e periodici. La Dott.ssa Di Sanzo saprà indicare la cadenza più appropriata in base al quadro clinico individuale.
            </p>

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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prenota la tua visita oculistica oggi stesso</h2>
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
