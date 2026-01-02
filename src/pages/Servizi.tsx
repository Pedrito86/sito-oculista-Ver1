import { Users, Eye, ScanEye, CheckCircle } from 'lucide-react';

export default function Servizi() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Servizi</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visite Oculistiche per Adulti</h3>
              <p className="text-gray-600 leading-relaxed">
                Controllo completo della vista, diagnosi dei difetti visivi e monitoraggio delle principali patologie oculari.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visite Oculistiche Pediatriche</h3>
              <p className="text-gray-600 leading-relaxed">
                Screening visivo per neonati, bambini e adolescenti. Individuazione precoce di problemi visivi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ScanEye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Esami Diagnostici</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Disponibili tecnologie avanzate per una valutazione approfondita:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">OCT (Tomografia ottica)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Esame del fondo oculare</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Tonometria</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Campo visivo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Screening glaucoma</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Patologie Trattate</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Miopia, ipermetropia, astigmatismo',
                'Cataratta',
                'Glaucoma',
                'Occhio secco e infiammazioni oculari',
                'Difetti visivi nei bambini',
                'Degenerazioni retiniche',
                'Allergie oculari'
              ].map((patologia, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{patologia}</span>
                </div>
              ))}
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
                      <td className="px-6 py-4 text-right text-blue-600 font-bold text-lg">{item.price}</td>
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
