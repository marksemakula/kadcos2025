import { createClient } from '@supabase/supabase-js'

// These will be replaced with actual credentials when connected
const SUPABASE_URL = 'https://iwywmoxqiwfmffybdwqp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eXdtb3hxaXdmbWZmeWJkd3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NzU4MTMsImV4cCI6MjA3MjI1MTgxM30.KQyF4e-SNnRFcx9uAyAZnO1UC1ir2qCUFPp4tGZpDtY'

// For demo purposes, create a mock client that won't break the build
const mockSupabase = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Contact Admin' } }),
    delete: () => Promise.resolve({ data: null, error: null }),
    eq: () => ({ data: null, error: null }),
    order: () => ({ data: [], error: null })
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Contact Admin' } }),
    signOut: () => Promise.resolve({ error: null })
  }
}

// Use mock client for demo, replace with real client when Supabase is connected
export const supabase = mockSupabase

export default supabase