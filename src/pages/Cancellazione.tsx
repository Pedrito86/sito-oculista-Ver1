import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

export default function Cancellazione() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');

  useEffect(() => {
    const cancelBooking = async () => {
      // Evitiamo la doppia esecuzione in React Strict Mode
      if (!token) {
        setStatus('invalid');
        return;
      }

      try {
        // Prima controlliamo lo stato attuale della prenotazione per dare un messaggio più preciso
        const { data: bookingCheck, error: checkError } = await supabase
          .from('bookings')
          .select('status')
          .eq('cancellation_token', token)
          .single();

        if (checkError) {
             console.error('Check Error:', checkError);
             // Se non la trova, potrebbe essere un token errato
        }

        if (bookingCheck && bookingCheck.status === 'cancelled') {
             // Caso: Già cancellata in precedenza (o dal doppio click/render)
             // Lo trattiamo come successo per l'utente, cambiando solo leggermente il messaggio se necessario
             setStatus('success'); 
             return;
        }

        // Chiama la funzione RPC 'cancel_booking' definita su Supabase
        const { data, error } = await supabase.rpc('cancel_booking', { token_input: token });

        if (error) {
           console.error('RPC Error:', error);
           // Fallback: prova cancellazione diretta se RPC fallisce (non dovrebbe succedere se SQL è eseguito)
           const { error: updateError, data: updateData } = await supabase
             .from('bookings')
             .update({ status: 'cancelled' })
             .eq('cancellation_token', token)
             .eq('status', 'confirmed')
             .select();
             
           if (updateError || !updateData || updateData.length === 0) {
             throw error || updateError || new Error('Cancellazione fallita');
           }
           setStatus('success');
           return;
        }

        // Se data è true, la cancellazione è avvenuta. Se false, il token non esisteva o era già cancellato.
        if (data) {
          setStatus('success');
        } else {
          setStatus('error'); // O già cancellata
        }
      } catch (err) {
        console.error('Errore cancellazione:', err);
        setStatus('error');
      }
    };

    cancelBooking();
  }, [token]);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Elaborazione cancellazione...</h2>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prenotazione Cancellata</h2>
            <p className="text-gray-600 mb-6">
              Il tuo appuntamento è stato annullato correttamente. Lo slot è tornato disponibile per altri pazienti.
            </p>
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Torna alla Home
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Errore</h2>
            <p className="text-gray-600 mb-6">
              Impossibile cancellare la prenotazione. Potrebbe essere già stata cancellata o il link non è valido.
            </p>
            <div className="space-y-4">
              <Link to="/contatti" className="block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Contatta Segreteria
              </Link>
              <Link to="/" className="block text-gray-500 hover:text-gray-700 text-sm">
                Torna alla Home
              </Link>
            </div>
          </div>
        )}

        {status === 'invalid' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Link non valido</h2>
            <p className="text-gray-600 mb-6">
              Manca il token di cancellazione. Controlla di aver cliccato il link corretto nell'email.
            </p>
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Torna alla Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
