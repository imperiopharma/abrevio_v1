
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const signIn = async (email: string, password: string) => {
  try {
    console.log('Attempting to sign in with:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
      
      // Provide more descriptive error messages
      if (error.message.includes('Invalid login')) {
        throw new Error('Email ou senha incorretos');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Por favor, confirme seu email antes de fazer login');
      } else {
        throw error;
      }
    }
    
    console.log('Sign in successful:', data.user?.email);
    return data;
  } catch (error) {
    console.error('Sign in exception:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    console.log('Attempting to sign out');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }
    
    console.log('Sign out successful');
    window.location.href = '/';
  } catch (error) {
    console.error('Sign out exception:', error);
    throw error;
  }
};
