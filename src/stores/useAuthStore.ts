import { User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);

  const setUser = (newUser: any) => {
    user.value = newUser;
  };

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
  };

  const isLoggedIn = () => !!user.value;

  return { user, loading, setUser, setLoading, isLoggedIn };
});
