import { createClient, SupabaseClient } from '@supabase/supabase-js'
import useUserAuth from 'src/composables/useAuthUser';

const supabaseUrl: string = '';
const supabaseAnonKey: string = '';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)



supabase.auth.onAuthStateChange(async (event, session) => {
    const {user} = useUserAuth()
    
    user.value = session?.user || null
    console.log(user.value)
});

export default function useSupabase() {
    return {supabase}
}