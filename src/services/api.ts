
import { supabase } from "@/integrations/supabase/client";
import { Plan } from "@/components/admin/plans/types";

// Função para buscar os planos do banco de dados
export const fetchPlans = async (): Promise<Plan[]> => {
  try {
    // Verificar se a tabela existe antes de tentar consultar
    const { data: tableExists, error: tableCheckError } = await supabase
      .from('plans')
      .select('*')
      .limit(1);
    
    if (tableCheckError) {
      console.warn("Tabela de planos pode não existir:", tableCheckError);
      return [];
    }
    
    const { data, error } = await supabase
      .from('plans')
      .select('*');
    
    if (error) {
      console.error("Erro ao buscar planos:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Erro ao acessar planos:", error);
    return [];
  }
};

// Função para salvar um plano no banco de dados
export const savePlan = async (plan: Plan): Promise<Plan> => {
  try {
    // Tentativa de inserir/atualizar de forma mais segura
    const { data, error } = await supabase
      .from('plans')
      .upsert([plan])
      .select()
      .single();
    
    if (error) {
      console.error("Erro ao salvar plano:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao salvar plano:", error);
    return plan; // Retornar o plano original caso falhe
  }
};

// Função para excluir um plano do banco de dados
export const deletePlan = async (planId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('plans')
      .delete()
      .eq('id', planId);
    
    if (error) {
      console.error("Erro ao excluir plano:", error);
      throw error;
    }
  } catch (error) {
    console.error("Erro ao excluir plano:", error);
    throw error;
  }
};

// Autenticação
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
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
