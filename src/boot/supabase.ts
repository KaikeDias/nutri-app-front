import { createClient, SupabaseClient } from '@supabase/supabase-js'
import useUserAuth from 'src/composables/useAuthUser';
import { useAuthStore } from 'src/stores/useAuthStore';

const supabaseUrl: string = 'https://mftofuwjfgxndyacyqcn.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdG9mdXdqZmd4bmR5YWN5cWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNDIzMzksImV4cCI6MjA0NTcxODMzOX0.jOWqMT2KTUdZl0yx1jDL4FPK0UX-gF0tMQSq-RHhrmc';
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