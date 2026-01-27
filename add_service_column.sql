-- Aggiunge la colonna service alla tabella bookings
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS service TEXT;
