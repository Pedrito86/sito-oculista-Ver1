-- Aggiunge la colonna reminder_sent alla tabella bookings
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS reminder_sent BOOLEAN DEFAULT FALSE;
