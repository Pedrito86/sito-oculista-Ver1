
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hnnpqmfzgercyvwvtjuj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubnBxbWZ6Z2VyY3l2d3Z0anVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTg0NzAsImV4cCI6MjA4MjkzNDQ3MH0.TNPQsKZey7KvRFN-thtmviLgETjbHsHOiqrM-Uk-b6c';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkColumn() {
  console.log('Checking for reminder_sent column...');
  try {
    // Try to select the column. Limit 1.
    const { data, error } = await supabase
      .from('bookings')
      .select('reminder_sent')
      .limit(1);
    
    if (error) {
      console.error('❌ Error selecting reminder_sent:', error);
      if (error.message && error.message.includes('does not exist')) {
        console.log('⚠️ Column reminder_sent likely MISSING.');
      }
    } else {
      console.log('✅ Column reminder_sent exists!');
      console.log('Sample data:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkColumn();
