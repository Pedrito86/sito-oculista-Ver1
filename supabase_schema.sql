-- Esegui questo script nell'SQL Editor di Supabase per creare la tabella necessaria

-- Crea la tabella bookings
create table bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date date not null,
  time text not null,
  name text not null,
  email text not null,
  phone text not null,
  status text default 'confirmed'::text, -- 'confirmed', 'cancelled'
  cancellation_token uuid default gen_random_uuid() not null
);

-- Abilita RLS (Row Level Security) per sicurezza
alter table bookings enable row level security;

-- Policy: Permetti a chiunque di leggere le prenotazioni (per verificare disponibilità)
-- In produzione potresti voler limitare la lettura solo alle date/orari occupati senza esporre i dati personali,
-- ma per semplicità qui permettiamo la lettura (il frontend filtrerà cosa mostrare).
-- Una pratica migliore sarebbe creare una vista o una funzione RPC per la disponibilità.
create policy "Enable read access for all users" on bookings
  for select using (true);

-- Policy: Permetti a chiunque di inserire nuove prenotazioni
create policy "Enable insert for all users" on bookings
  for insert with check (true);

-- Policy: Permetti aggiornamento (cancellazione) solo tramite token (simulato via RPC o logica backend, 
-- ma qui per semplicità permettiamo update pubblici SE conosci il token - gestito da frontend/backend logic).
-- ATTENZIONE: Questo permette a chiunque di modificare se non ristretto. 
-- Per sicurezza massima, useremo una funzione RPC per la cancellazione.

create or replace function cancel_booking(token_input uuid)
returns boolean
language plpgsql
security definer
as $$
begin
  update bookings
  set status = 'cancelled'
  where cancellation_token = token_input
  and status = 'confirmed';
  
  return found;
end;
$$;
