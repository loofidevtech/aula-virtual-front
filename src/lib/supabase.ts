import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://efgdcxfzvqdathuzpbsj.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmZ2RjeGZ6dnFkYXRodXpwYnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzY0NjYsImV4cCI6MjA5NDY1MjQ2Nn0.tcPnXSX6dqsaFVuytSRfng9I8TAuARgT4DCCb8LXRL0'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Usando credenciales de Supabase de respaldo directo.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
