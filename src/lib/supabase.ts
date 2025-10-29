import { createClient } from '@supabase/supabase-js';

// 🔑 Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
