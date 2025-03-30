
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

// Authentication
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

export const signOut = async () => {
  try {
    console.log('Attempting to sign out');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }
    
    console.log('Sign out successful');
    // Redirect to home page after sign out
    window.location.href = '/';
  } catch (error) {
    console.error('Sign out exception:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Erro ao buscar usuário atual:", error);
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password-confirm',
    });
    
    if (error) {
      console.error('Reset password error:', error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Reset password exception:', error);
    throw error;
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) {
      console.error('Update password error:', error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Update password exception:', error);
    throw error;
  }
};

// Função para criar contas de teste
export const createTestAccounts = async () => {
  try {
    console.log("Tentando criar contas de teste...");
    
    // Primeiro, verificar usuário comum
    const { data: userExistsCheck, error: userCheckError } = await supabase.auth.signInWithPassword({
      email: "usuario@teste.com",
      password: "123456"
    });
    
    // Se o usuário comum não existe, criar
    if (userCheckError && userCheckError.message.includes('Invalid login')) {
      console.log("Criando conta de usuário comum...");
      const { error: userError } = await supabase.auth.signUp({
        email: "usuario@teste.com",
        password: "123456",
        options: {
          data: { role: 'user' }
        }
      });
      
      if (userError) {
        console.error("Erro ao criar usuário comum:", userError);
      } else {
        console.log("Conta de usuário comum criada!");
        
        // Auto-confirmar email para testes (supabase admin seria necessário para isso)
        try {
          const { error } = await supabase.functions.invoke('confirm-user-email', {
            body: { email: "usuario@teste.com" }
          });
          if (error) console.error("Erro ao confirmar email:", error);
        } catch (err) {
          console.error("Erro na função de confirmar email:", err);
        }
      }
    } else {
      console.log("Usuário comum já existe");
    }
    
    // Verificar admin
    const { data: adminExistsCheck, error: adminCheckError } = await supabase.auth.signInWithPassword({
      email: "admin@teste.com",
      password: "123456"
    });
    
    // Se o admin não existe, criar
    if (adminCheckError && adminCheckError.message.includes('Invalid login')) {
      console.log("Criando conta de administrador...");
      const { error: adminError } = await supabase.auth.signUp({
        email: "admin@teste.com",
        password: "123456",
        options: {
          data: { role: 'admin' }
        }
      });
      
      if (adminError) {
        console.error("Erro ao criar administrador:", adminError);
      } else {
        console.log("Conta de administrador criada!");
        
        // Auto-confirmar email para testes
        try {
          const { error } = await supabase.functions.invoke('confirm-user-email', {
            body: { email: "admin@teste.com" }
          });
          if (error) console.error("Erro ao confirmar email:", error);
        } catch (err) {
          console.error("Erro na função de confirmar email:", err);
        }
      }
    } else {
      console.log("Administrador já existe");
    }
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar contas de teste:", error);
    return { success: false, error };
  }
};
