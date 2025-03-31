
import { supabase } from "@/integrations/supabase/client";

export const signUp = async (email: string, password: string) => {
  try {
    console.log('Attempting to sign up with:', email);
    
    // Note: For development, we'll skip email confirmation for test accounts
    const isTestAccount = email === 'usuario@teste.com' || email === 'admin@teste.com';
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/login',
        data: {
          role: isTestAccount && email === 'admin@teste.com' ? 'admin' : 'user'
        }
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
      
      // Provide more descriptive error messages
      if (error.message.includes('already registered')) {
        throw new Error('Este email já está cadastrado');
      } else if (error.message.includes('password')) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      } else if (error.message.includes('security purposes')) {
        throw new Error('Por razões de segurança, aguarde um momento antes de tentar novamente');
      } else {
        throw error;
      }
    }
    
    console.log('Sign up successful:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Sign up exception:', error);
    throw error;
  }
};
