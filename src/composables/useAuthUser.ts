import { ref } from "vue";
import useSupabase from 'boot/supabase'

interface User {
    email: string;
    password: string;
}

const user = ref<User | null>(null);

export default function useUserAuth() {
    const { supabase } = useSupabase();

    const login = async ({ email, password }: { email: string; password: string }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error;

        if (data.user.email != null) {
            user.value = { email: data.user.email, password: '' };
        } else {
            user.value = null;
        }
        return user.value;
    };

    const logout = async (): Promise<void> => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error;
    };

    const isLoggedIn = (): boolean => {
        return !!user.value;
    };

    const register = async ({
        email,
        password,
        ...meta
    }: { email: string; password: string;[key: string]: any }) => {
        // const { data, error } = await supabase.auth.signUp({
        //     email: email,
        //     password: password,
        // },
        // redirectTo: `${window.location.origin}/me?fromEmail=regist`,
        // )
        // if (error) throw error;
    };

    const update = async (data: Partial<User>): Promise<void> => {
    };

    const sendPasswordResetEmail = async (email: string): Promise<void> => {
    };

    return {
        user,
        login,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordResetEmail,
    };
}
