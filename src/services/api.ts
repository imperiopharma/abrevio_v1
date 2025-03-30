
import { supabase } from "@/integrations/supabase/client";
import { Plan } from "@/components/admin/plans/types";

// Função para buscar os planos do banco de dados
export const fetchPlans = async (): Promise<Plan[]> => {
  const { data, error } = await supabase
    .from('plans')
    .select('*');
  
  if (error) {
    console.error("Erro ao buscar planos:", error);
    throw error;
  }
  
  return data || [];
};

// Função para salvar um plano no banco de dados
export const savePlan = async (plan: Plan): Promise<Plan> => {
  const { data, error } = await supabase
    .from('plans')
    .upsert([plan], { onConflict: 'id' })
    .select()
    .single();
  
  if (error) {
    console.error("Erro ao salvar plano:", error);
    throw error;
  }
  
  return data;
};

// Função para excluir um plano do banco de dados
export const deletePlan = async (planId: string): Promise<void> => {
  const { error } = await supabase
    .from('plans')
    .delete()
    .eq('id', planId);
  
  if (error) {
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
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error("Erro ao buscar usuário atual:", error);
    return null;
  }
  
  return data.user;
};
