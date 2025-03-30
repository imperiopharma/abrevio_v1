
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
    
    // Função auxiliar para criar e confirmar conta
    const createAndConfirmAccount = async (email, password, role) => {
      try {
        // Tenta fazer login para verificar se a conta já existe
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        // Se conseguiu fazer login, a conta já existe
        if (!loginError) {
          console.log(`Conta ${role} já existe e está confirmada.`);
          return { success: true, alreadyExists: true };
        }
        
        // Se o erro for "Email not confirmed", tenta confirmar o email
        if (loginError && loginError.message.includes('Email not confirmed')) {
          console.log(`Conta ${role} existe, mas email não está confirmado. Tentando confirmar...`);
          await confirmEmail(email);
          return { success: true };
        }
        
        // Tenta criar a conta
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role }
          }
        });
        
        if (signUpError) {
          // Se der erro que já está registrado, tente confirmar o email
          if (signUpError.message.includes('already registered')) {
            console.log(`Email ${email} já registrado, tentando confirmar...`);
            await confirmEmail(email);
            return { success: true };
          } else {
            console.error(`Erro ao criar ${role}:`, signUpError);
            return { success: false, error: signUpError };
          }
        } else {
          console.log(`Conta ${role} criada! ID: ${signUpData.user?.id}`);
        }
        
        // Auto-confirmar email para testes
        try {
          await confirmEmail(email);
          return { success: true };
        } catch (confirmErr) {
          console.error(`Erro na função de confirmar email para ${email}:`, confirmErr);
          return { success: false, error: confirmErr };
        }
      } catch (err) {
        console.error(`Erro ao processar conta ${role}:`, err);
        return { success: false, error: err };
      }
    };
    
    const confirmEmail = async (email) => {
      console.log(`Tentando confirmar email para ${email}...`);
      const { error } = await supabase.functions.invoke('confirm-user-email', {
        body: { email }
      });
      
      if (error) {
        console.error(`Erro ao confirmar email para ${email}:`, error);
        throw error;
      }
      
      console.log(`Email para ${email} confirmado com sucesso!`);
    };
    
    // Criar conta de usuário comum
    const userResult = await createAndConfirmAccount("usuario@teste.com", "123456", "user");
    console.log("Resultado da criação do usuário:", userResult);
    
    // Criar conta de administrador
    const adminResult = await createAndConfirmAccount("admin@teste.com", "123456", "admin");
    console.log("Resultado da criação do admin:", adminResult);
    
    return { success: true, user: userResult, admin: adminResult };
  } catch (error) {
    console.error("Erro geral ao criar contas de teste:", error);
    return { success: false, error };
  } finally {
    // Certifique-se de que não há nenhuma sessão ativa após criar as contas
    await supabase.auth.signOut();
  }
};
