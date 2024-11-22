import { createClient, SupabaseClient } from '@supabase/supabase-js'
import useUserAuth from 'src/composables/useAuthUser';
import { useAuthStore } from 'src/stores/useAuthStore';

const supabaseUrl: string = process.env.SUPABASE_URL ?? (() => {
    throw new Error('SUPABASE_URL is not defined');
  })();
const supabaseAnonKey: string = process.env.SUPABASE_KEY ?? (() => {
    throw new Error('SUPABASE_ is not defined');})();
    
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange(async (event, session) => {
    const authStore = useAuthStore();
    authStore.setLoading(true);
  
    try {
      const user = session?.user || null;
      authStore.setUser(user);
    } finally {
      authStore.setLoading(false);
    }
  });
export default function useSupabase() {
    return {supabase}
}