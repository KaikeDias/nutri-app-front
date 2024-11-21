import { ref } from "vue";
import useSupabase from 'boot/supabase'

const user = ref();

export default function useUserAuth() {
    const { supabase } = useSupabase();

    const login = async ({ email, password }: { email: string; password: string }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
        if (error) throw error;
        if(data.user.email != null) {
            if (data.user) {
                const role = data.user.user_metadata?.role; 
        
                if (role !== '1') {
                    user.value = null;
                    throw new Error("Tipo de usuário não autorizado");
                }
                
        
                user.value = { email: data.user.email, password: '' };
            } else {
                user.value = null;
            }
        
            return user.value;
        }
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
        const { data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: meta.name,
                    birthdate: meta.birth_date,
                    cpf: meta.cpf,
                    role: meta.role,
                    crn: meta.crn
                }
            }
        },
        )
        if (error) throw error;
    };

    // const update = async (dataUser): Promise<void> => {
    //     const {data, error} = await supabase.auth.updateUser(dataUser)
    //     if(error) throw error;
    // };

    // const sendPasswordResetEmail = async (email: string): Promise<void> => {
    // };

    return {
        user,
        login,
        logout,
        isLoggedIn,
        register,
        // update,
        // sendPasswordResetEmail,
    };
}