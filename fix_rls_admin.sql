-- FIX RLS: Permetti agli utenti autenticati (Admin) di gestire le prenotazioni

-- 1. Permetti agli utenti autenticati di LEGGERE tutto (era già pubblico, ma esplicitiamo o estendiamo se serve)
-- (La policy pubblica esistente "Enable read access for all users" copre già questo caso)

-- 2. Permetti agli utenti autenticati di AGGIORNARE qualsiasi riga (es. per cancellare/modificare)
create policy "Enable update for authenticated users only"
  on bookings
  for update
  to authenticated
  using (true)
  with check (true);

-- 3. Permetti agli utenti autenticati di CANCELLARE (se mai userai delete invece di update status)
create policy "Enable delete for authenticated users only"
  on bookings
  for delete
  to authenticated
  using (true);

-- Nota: Assicurati che l'utente creato sia confermato e possa fare login.
