import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bgerrxarxjtvcajinlkg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXJyeGFyeGp0dmNhamlubGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MjE2NDIsImV4cCI6MjA3NzI5NzY0Mn0.XqRCc7ltnrxblpoMRwynQ1x-VrjlB29ewpwUc2OREzk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ✅ Usage example:
// import { supabase } from '@/lib/supabase'
// const { data, error } = await supabase.from('intake_submissions').insert([{ email: 'test@example.com' }])
