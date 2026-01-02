import { ScanEye, Award, CheckCircle, Users } from 'lucide-react';

export default function ChiSono() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Chi Sono</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <ScanEye className="w-10 h-10 text-white" />
              </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Dott.ssa Maria Di Sanzo</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sono un medico chirurgo specialista in Oftalmologia, laureata con lode presso l'Università di Bologna e specializzata con lode all'Università degli Studi di Ferrara.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Svolgo attività ambulatoriale e diagnostica presso l'AUSL di Bologna, dove seguo pazienti adulti e pediatrici con un approccio attento, moderno e personalizzato.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Il mio obiettivo è garantire a ogni paziente una valutazione accurata, una diagnosi chiara e un percorso terapeutico efficace, privilegiando professionalità, ascolto e trasparenza.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                  <h4 className="text-2xl font-bold text-gray-900">Formazione</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700"><span className="font-semibold">Laurea in Medicina e Chirurgia</span> – 110/110 e lode, Università di Bologna</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700"><span className="font-semibold">Specializzazione in Oftalmologia</span> – 110/110 e lode, Università di Ferrara</p>
                  </div>
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
