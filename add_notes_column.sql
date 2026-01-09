-- Aggiunge la colonna note alla tabella bookings
alter table bookings add column if not exists notes text;

-- Aggiorna la policy per permettere la lettura delle note (se necessario, ma la policy pubblica 'Enable read access for all users' copre già tutto)
-- Nota: In un'app reale, le note dovrebbero essere visibili solo agli admin, ma per ora manteniamo la semplicità come da schema esistente.
