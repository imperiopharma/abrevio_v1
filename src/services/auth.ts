
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
    // Verifica se já existe o usuário de teste
    const { data: existingUsers, error: searchError } = await supabase.auth.admin.listUsers();
    
    if (searchError) {
      console.error("Erro ao verificar usuários existentes:", searchError);
      return;
    }
    
    // Define o tipo explícito para os usuários
    type UserWithEmail = {
      email?: string;
      user_metadata?: {
        role?: string;
      };
    };
    
    // Verifica se o usuário comum já existe
    const userExists = existingUsers?.users?.some((user: UserWithEmail) => 
      user?.email === "usuario@teste.com"
    );
    
    // Verifica se o admin já existe
    const adminExists = existingUsers?.users?.some((user: UserWithEmail) => 
      user?.email === "admin@teste.com"
    );
    
    // Cria o usuário comum se não existir
    if (!userExists) {
      const { error: userError } = await supabase.auth.admin.createUser({
        email: "usuario@teste.com",
        password: "123456",
        email_confirm: true
      });
      
      if (userError) {
        console.error("Erro ao criar usuário de teste:", userError);
      } else {
        console.log("Usuário de teste criado com sucesso");
      }
    }
    
    // Cria o usuário admin se não existir
    if (!adminExists) {
      const { error: adminError } = await supabase.auth.admin.createUser({
        email: "admin@teste.com",
        password: "123456",
        email_confirm: true,
        user_metadata: { role: "admin" }
      });
      
      if (adminError) {
        console.error("Erro ao criar admin de teste:", adminError);
      } else {
        console.log("Admin de teste criado com sucesso");
      }
    }
  } catch (error) {
    console.error("Erro ao criar contas de teste:", error);
  }
};
