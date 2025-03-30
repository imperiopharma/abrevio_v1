
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Autenticação
export const signIn = async (email: string, password: string) => {
  try {
    console.log('Attempting to sign in with:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
      throw error;
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
    });
    
    if (error) {
      console.error('Sign up error:', error);
      throw error;
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
