import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hnnpqmfzgercyvwvtjuj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubnBxbWZ6Z2VyY3l2d3Z0anVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTg0NzAsImV4cCI6MjA4MjkzNDQ3MH0.TNPQsKZey7KvRFN-thtmviLgETjbHsHOiqrM-Uk-b6c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
