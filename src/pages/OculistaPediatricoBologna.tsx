import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function OculistaPediatricoBologna() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Oculista Pediatrico Bologna | Visite per Bambini – Dott.ssa Di Sanzo</title>
        <meta 
          name="description" 
          content="Visite oculistiche pediatriche a Bologna. Dott.ssa Di Sanzo: screening neonatale, cura ambliopia e strabismo nei bambini." 
        />
        <link rel="canonical" href="https://www.mariadisanzo.com/oculista-pediatrico-bologna" />
        <link rel="alternate" hrefLang="it" href="https://www.mariadisanzo.com/oculista-pediatrico-bologna" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Oculista Pediatrico Bologna | Visite per Bambini" />
        <meta property="og:description" content="Screening visivo neonatale, diagnosi e cura di ambliopia e strabismo a Bologna." />
        <meta property="og:image" content="https://www.mariadisanzo.com/oculista-bologna-di-sanzo.jpg" />
        <meta property="og:url" content="https://www.mariadisanzo.com/oculista-pediatrico-bologna" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalSpecialty",
              "name": "Oculistica Pediatrica",
              "description": "Visite oculistiche per neonati, bambini e adolescenti.",
              "medicalSpecialty": "Pediatric",
              "practitioner": {
                "@type": "Physician",
                "name": "Dott.ssa Maria Di Sanzo"
              },
              "availableService": {
                "@type": "MedicalProcedure",
                "name": "Screening visivo pediatrico"
              }
            }
          `}
        </script>
      </Helmet>
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
              La vista è il senso principale attraverso cui i bambini imparano, esplorano e si relazionano con il mondo circostante. Una <strong>visita oculistica pediatrica</strong> non è solo un controllo della capacità visiva, ma un passo fondamentale per garantire un corretto sviluppo psicomotorio. Presso lo studio di Bologna, la Dott.ssa Maria Di Sanzo si dedica con particolare attenzione alla cura dei piccoli pazienti, offrendo un servizio diagnostico completo e personalizzato per ogni fascia d'età, dal neonato all'adolescente.
            </p>

            <p className="mb-8">
              A differenza degli adulti, i bambini spesso non sono in grado di riferire di non vederci bene, semplicemente perché non hanno un termine di paragone. Potrebbero abituarsi a una visione sfocata o utilizzare un solo occhio senza che i genitori se ne accorgano. Per questo motivo, il ruolo dell'oculista pediatrico è cruciale per intercettare problematiche "siliziose" prima che diventino permanenti.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">L'importanza della diagnosi precoce: Ambliopia e Strabismo</h2>
            <p className="mb-4">
              Il sistema visivo dei bambini è estremamente "plastico", ovvero modificabile, fino ai 7-8 anni di età. Intervenire in questa finestra temporale permette di correggere difetti che, in età adulta, non sarebbero più recuperabili. Due delle condizioni più importanti da diagnosticare tempestivamente sono:
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Ambliopia (Occhio Pigro)</h3>
              <p className="mb-3">
                L'ambliopia si verifica quando un occhio non sviluppa una capacità visiva normale, spesso a causa di un difetto di refrazione non corretto (come una forte ipermetropia o astigmatismo in un solo occhio) o di uno strabismo. Il cervello, ricevendo un'immagine nitida dall'occhio sano e una sfocata da quello "pigro", tende a ignorare quest'ultimo.
              </p>
              <p className="mb-3">
                <strong>Perché è urgente?</strong> Se non trattata entro i primi anni di vita (solitamente tramite l'uso di occhiali e il bendaggio dell'occhio dominante), l'ambliopia può portare a una riduzione permanente della vista che non potrà essere corretta con lenti in età adulta.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Strabismo</h3>
              <p className="mb-3">
                Lo strabismo è una condizione in cui gli occhi non sono allineati correttamente e puntano in direzioni diverse. Può essere costante o intermittente. Oltre al problema estetico, lo strabismo può impedire lo sviluppo della visione binoculare (la capacità di vedere in 3D) e causare ambliopia.
              </p>
              <p>
                La visita specialistica permette di distinguere tra strabismo vero e "pseudostrabismo" (una condizione comune nei neonati dovuta alla conformazione delle palpebre) e di impostare la terapia corretta, che può variare dagli occhiali, agli esercizi ortottici, fino all'intervento chirurgico nei casi necessari.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Il calendario della prevenzione visiva: quando fare i controlli?</h2>
            <p className="mb-6">
              Molti genitori si chiedono quale sia il momento giusto per la prima visita. Le linee guida oftalmologiche raccomandano un calendario preciso per monitorare il corretto sviluppo visivo:
            </p>
            <ul className="space-y-4 mb-8 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-800 w-32 flex-shrink-0">Alla nascita:</span>
                <span>Viene eseguito solitamente in ospedale il <strong>test del riflesso rosso</strong> per escludere patologie congenite gravi come la cataratta o il retinoblastoma.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-800 w-32 flex-shrink-0">Entro i 3 anni:</span>
                <span>È il momento della <strong>prima visita completa</strong>. Anche se il bambino non sa leggere, è possibile valutare la presenza di difetti visivi, strabismo o ambliopia con test oggettivi.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-800 w-32 flex-shrink-0">A 5-6 anni:</span>
                <span>Controllo fondamentale <strong>pre-scolare</strong>. Si verifica che il sistema visivo sia pronto per l'impegno della lettura e della scrittura, correggendo eventuali difetti che potrebbero ostacolare l'apprendimento.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-800 w-32 flex-shrink-0">Età scolare:</span>
                <span>Controlli ogni 1-2 anni (o secondo indicazione medica) per monitorare l'eventuale insorgenza di miopia, sempre più frequente a causa dell'impegno visivo ravvicinato.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Altre patologie frequenti nell'infanzia</h2>
            <p className="mb-4">
              Oltre ai difetti di vista, l'oculista pediatrico si occupa della diagnosi e terapia di altre condizioni comuni nei bambini:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Stenosi del dotto naso-lacrimale</h3>
                <p className="text-sm">Molto comune nei neonati, si manifesta con occhio costantemente umido e secrezione. Spesso si risolve spontaneamente con massaggi mirati, ma richiede monitoraggio specialistico se persiste oltre l'anno di età.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Congiuntiviti</h3>
                <p className="text-sm">I bambini sono frequenti soggetti a infiammazioni della congiuntiva. È fondamentale distinguere tra forme batteriche, virali o allergiche per impostare la corretta terapia ed evitare contagi.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Campanelli d'allarme: quando preoccuparsi?</h2>
            <p className="mb-4">
              Oltre ai controlli di routine previsti dal pediatra, i genitori dovrebbero prestare attenzione ad alcuni segnali che potrebbero indicare un problema visivo nel bambino:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-700">
              <li><strong>Avvicinamento eccessivo agli oggetti:</strong> Se il bambino tiene libri o tablet molto vicini al viso o si siede attaccato alla televisione.</li>
              <li><strong>Strizzare gli occhi:</strong> Il gesto di socchiudere le palpebre per mettere a fuoco oggetti lontani è tipico della miopia.</li>
              <li><strong>Anomala posizione del capo:</strong> Se il bambino inclina o ruota la testa mentre guarda la TV o legge, potrebbe cercare di compensare un disturbo visivo o uno strabismo.</li>
              <li><strong>Sfatregamento frequente degli occhi:</strong> Può essere sintomo di affaticamento visivo, allergie o secchezza oculare.</li>
              <li><strong>Lacrimazione eccessiva o sensibilità alla luce (fotofobia).</strong></li>
              <li><strong>Mal di testa:</strong> Cefalee frequenti, specialmente a fine giornata scolastica, possono derivare dallo sforzo per compensare ipermetropia o astigmatismo.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Come si svolge la visita pediatrica?</h2>
            <p className="mb-6">
              Molti genitori si chiedono come sia possibile visitare un bambino che non sa ancora leggere o parlare. Grazie a tecniche oggettive, è possibile valutare la vista anche nei neonati.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Esame della Refrazione in Cicloplegia</h3>
                  <p>È il momento fondamentale della visita: vengono instillate delle gocce (cicloplegico) che dilatano la pupilla e rilassano il muscolo della messa a fuoco. Questo permette all'oculista di misurare il <strong>reale difetto visivo</strong> del bambino senza che lo sforzo accomodativo falsi il risultato. È indispensabile per prescrivere gli occhiali corretti.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Test dell'Acutezza Visiva</h3>
                  <p>In base all'età, si utilizzano diversi metodi: test di preferenza visiva per i neonati, ottotipi con simboli o disegni (E di Albini, figure) per i bambini in età prescolare, e le classiche lettere per i più grandi.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Valutazione Ortottica</h3>
                  <p>Si esamina la motilità oculare, la convergenza e la presenza di visione stereoscopica (3D), fondamentali per escludere strabismi latenti o manifesti.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Consigli per la salute visiva nell'era digitale</h2>
            <p className="mb-4">
              L'aumento dell'uso di dispositivi digitali ha portato a una maggiore incidenza di miopia e affaticamento visivo nei bambini. Ecco alcuni consigli pratici:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-700">
              <li><strong>Regola del 20-20-20:</strong> Ogni 20 minuti di attività da vicino, fai una pausa di 20 secondi guardando a 20 piedi (circa 6 metri) di distanza.</li>
              <li><strong>Tempo all'aria aperta:</strong> Studi scientifici dimostrano che trascorrere almeno 2 ore al giorno all'aperto riduce il rischio di insorgenza e progressione della miopia, grazie alla luce naturale e alla visione da lontano.</li>
              <li><strong>Distanza corretta:</strong> Mantenere tablet e libri ad almeno 30-40 cm dagli occhi.</li>
            </ul>

            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 my-8">
              <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center">
                <Heart className="w-5 h-5 mr-2" /> Un approccio a misura di bambino
              </h3>
              <p className="text-gray-800">
                Sappiamo che la visita medica può spaventare i più piccoli. Per questo, la Dott.ssa Di Sanzo utilizza un approccio dolce e giocoso, trasformando l'esame in un momento sereno e talvolta divertente. L'obiettivo è costruire un rapporto di fiducia che faciliti i controlli futuri.
              </p>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prenota una visita per il tuo bambino</h2>
              <div className="flex flex-col items-center">
                <Link
                  to="/prenotazione"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Prenota visita oculistica pediatrica
                </Link>
                <p className="mt-4 text-sm text-gray-500 font-medium">
                  Risposta via email • Nessun impegno immediato • Prenotazione semplice
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
