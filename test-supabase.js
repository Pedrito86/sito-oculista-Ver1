
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hnnpqmfzgercyvwvtjuj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubnBxbWZ6Z2VyY3l2d3Z0anVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTg0NzAsImV4cCI6MjA4MjkzNDQ3MH0.TNPQsKZey7KvRFN-thtmviLgETjbHsHOiqrM-Uk-b6c';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('Testing Supabase connection...');
  try {
    const { data, error } = await supabase.from('bookings').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Connection failed or table not found:', error);
    } else {
      console.log('✅ Connection successful!');
      console.log('Table "bookings" exists. Row count:', data); // data is null for head:true usually, but count is in 'count' property? No, with head:true data is null, count is in result.count
    }
    
    // Check if we can get count properly
    const { count, error: countError } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
    if (countError) {
        console.error('❌ Count failed:', countError);
    } else {
        console.log('✅ Table access verified. Total bookings:', count);
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testConnection();
