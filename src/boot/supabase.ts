import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = '';
const supabaseAnonKey: string = '';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

console.log('supabase: ', supabase)

export default function useSupabase() {
    return {supabase}
}