import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  
  const [preferences, setPreferences] = useState({
    technical: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      technical: true,
      analytics: true,
      marketing: true
    });
  };

  const handleRejectAll = () => {
    savePreferences({
      technical: true,
      analytics: false,
      marketing: false
    });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {!showCustomize ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600 flex-1">
              <p className="mb-2">
                Utilizziamo cookie tecnici per il funzionamento del sito e, con il tuo consenso, cookie analitici e di profilazione per migliorare la tua esperienza.
              </p>
              <p>
                Puoi accettare tutti i cookie, rifiutarli (verranno usati solo quelli tecnici essenziali) o personalizzare le tue scelte.
                Per maggiori info consulta la <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy & Cookie Policy</Link>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
              >
                Accetta tutti
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 md:flex-none bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-semibold transition-colors"
              >
                Rifiuta
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="flex-1 md:flex-none border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm font-semibold transition-colors"
              >
                Personalizza
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg text-gray-900">Personalizza preferenze cookie</h3>
              <button onClick={() => setShowCustomize(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <input 
                  type="checkbox" 
                  checked={true} 
                  disabled 
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Necessari (Tecnici)</p>
                  <p className="text-xs text-gray-500">Sempre attivi. Necessari per il funzionamento base del sito.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <input 
                  type="checkbox" 
                  checked={preferences.analytics} 
                  onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Analitici</p>
                  <p className="text-xs text-gray-500">Ci aiutano a capire come interagisci con il sito per migliorarlo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <input 
                  type="checkbox" 
                  checked={preferences.marketing} 
                  onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Marketing</p>
                  <p className="text-xs text-gray-500">Utilizzati per inviarti pubblicità in linea con le tue preferenze.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleRejectAll}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-semibold transition-colors"
              >
                Rifiuta tutti
              </button>
              <button
                onClick={handleSaveCustom}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
              >
                Salva preferenze
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
