import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdate = new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy & Cookie Policy</h1>
          <p className="text-blue-100">Informativa ai sensi degli artt. 13-14 del Regolamento UE 2016/679 (GDPR)</p>
          <p className="text-sm mt-4 opacity-80">Ultimo aggiornamento: {lastUpdate}</p>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
          
          {/* Sezione 1: Titolare del Trattamento */}
          <section>
            <div className="flex items-center mb-4 text-blue-800">
              <Shield className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">1. Titolare del Trattamento</h2>
            </div>
            <p>
              Il Titolare del trattamento dei dati personali è la <strong>Dott.ssa Maria Di Sanzo</strong>.<br />
              Luogo di esercizio principale: Ospedale Maggiore di Bologna, Largo Bartolo Nigrisoli, Bologna.<br />
              Email di contatto per questioni privacy: <a href="mailto:mariadisanzo@gmail.com" className="text-blue-600 hover:underline">mariadisanzo@gmail.com</a>
            </p>
          </section>

          {/* Sezione 2: Tipologia di Dati Raccolti */}
          <section>
            <div className="flex items-center mb-4 text-blue-800">
              <FileText className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">2. Tipologia di Dati Raccolti</h2>
            </div>
            <p className="mb-2">Durante la navigazione e l'utilizzo dei servizi di questo sito (es. modulo contatti, prenotazione visite), possono essere raccolti i seguenti dati:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Dati comuni:</strong> Nome, Cognome, Email, Numero di Telefono.</li>
              <li><strong>Dati particolari (ex sensibili):</strong> Dati relativi allo stato di salute che l'utente potrebbe spontaneamente inserire nei campi "Messaggio" o durante la prenotazione, necessari per l'erogazione della prestazione sanitaria richiesta (Art. 9 GDPR).</li>
              <li><strong>Dati di navigazione:</strong> Indirizzi IP, log di sistema, utilizzati a fini statistici e di sicurezza.</li>
            </ul>
          </section>

          {/* Sezione 3: Finalità e Base Giuridica */}
          <section>
            <div className="flex items-center mb-4 text-blue-800">
              <Lock className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">3. Finalità e Base Giuridica</h2>
            </div>
            <p className="mb-2">I dati sono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Erogazione del servizio:</strong> Rispondere alle richieste di contatto e gestire le prenotazioni delle visite mediche. (Base giuridica: Esecuzione di misure precontrattuali/contrattuali).</li>
              <li><strong>Diagnosi e Cura:</strong> Trattamento necessario per finalità di medicina preventiva, diagnosi, assistenza o terapia sanitaria o sociale (Art. 9 par. 2 lett. h GDPR).</li>
              <li><strong>Adempimenti Legali:</strong> Fatturazione e obblighi fiscali. (Base giuridica: Obbligo di legge).</li>
            </ul>
          </section>

          {/* Sezione 4: Modalità di Trattamento e Sicurezza */}
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-4">4. Modalità di Trattamento e Sicurezza</h2>
            <p>
              Il trattamento avviene mediante strumenti informatici e telematici con logiche strettamente correlate alle finalità. 
              Sono adottate specifiche misure di sicurezza per prevenire la perdita dei dati, usi illeciti o non corretti ed accessi non autorizzati, 
              in conformità con quanto previsto dal GDPR e dalle linee guida in ambito sanitario.
            </p>
          </section>

          {/* Sezione 5: Conservazione dei Dati */}
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-4">5. Conservazione dei Dati</h2>
            <p>
              I dati personali saranno conservati per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti.
              In particolare:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>I dati di contatto/prenotazione: per la durata necessaria all'evasione della richiesta.</li>
              <li>I dati sanitari/cartelle cliniche: conservati illimitatamente come previsto dalla normativa sanitaria vigente.</li>
              <li>Dati amministrativi/fiscali: 10 anni come per legge.</li>
            </ul>
          </section>

          {/* Sezione 6: Cookie Policy */}
          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-center mb-4 text-blue-800">
              <Eye className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">6. Cookie Policy</h2>
            </div>
            <p className="mb-4">
              Questo sito utilizza cookie per migliorare l'esperienza di navigazione.
            </p>
            <h3 className="font-bold text-gray-800 mb-2">Cosa sono i cookie?</h3>
            <p className="mb-4">
              I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, dove vengono memorizzati per essere ritrasmessi agli stessi siti in occasione di visite successive.
            </p>
            <h3 className="font-bold text-gray-800 mb-2">Tipologie di cookie utilizzati:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cookie Tecnici (Necessari):</strong> Indispensabili per il corretto funzionamento del sito (es. navigazione, gestione sessione). Non richiedono consenso.</li>
              <li><strong>Cookie Analitici (Anonimizzati):</strong> Utilizzati per raccogliere informazioni in forma aggregata sul numero degli utenti e su come questi visitano il sito, a fini statistici.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              L'utente può gestire le preferenze sui cookie direttamente all'interno del proprio browser (Impostazioni &gt; Privacy e Sicurezza).
            </p>
          </section>

          {/* Sezione 7: Diritti dell'Interessato */}
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-4">7. Diritti dell'Interessato</h2>
            <p>
              Ai sensi degli artt. 15-22 del GDPR, l'utente ha diritto di chiedere al Titolare:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>L'accesso ai propri dati personali.</li>
              <li>La rettifica o la cancellazione degli stessi.</li>
              <li>La limitazione del trattamento.</li>
              <li>L'opposizione al trattamento.</li>
              <li>La portabilità dei dati.</li>
            </ul>
            <p className="mt-4">
              Le richieste possono essere rivolte all'indirizzo email: <strong>mariadisanzo@gmail.com</strong>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
