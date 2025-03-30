
import { supabase } from "@/integrations/supabase/client";

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/login',
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
      
      // Provide more descriptive error messages
      if (error.message.includes('already registered')) {
        throw new Error('Este email já está cadastrado');
      } else if (error.message.includes('password')) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      } else {
        throw error;
      }
    }
    
    return data;
  } catch (error) {
    console.error('Sign up exception:', error);
    throw error;
  }
};
