-- Crea la tabella per le eccezioni al calendario (Ferie, Festività, Aperture straordinarie)
create table schedule_overrides (
  date date primary key,
  is_available boolean not null, -- TRUE = Aperto straordinariamente, FALSE = Chiuso (Ferie/Festa)
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Abilita RLS
alter table schedule_overrides enable row level security;

-- Policy: Tutti possono leggere (serve al frontend per sapere se è aperto/chiuso)
create policy "Enable read access for all users" on schedule_overrides
  for select using (true);

-- Policy: Solo admin può modificare/inserire
create policy "Enable all access for authenticated users only" on schedule_overrides
  for all
  to authenticated
  using (true)
  with check (true);
