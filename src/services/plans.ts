
import { supabase } from "@/integrations/supabase/client";
import { Plan } from "@/components/admin/plans/types";

// Função para buscar os planos do banco de dados
export const fetchPlans = async (): Promise<Plan[]> => {
  try {
    // Como não temos acesso à tabela plans, vamos retornar mock data
    return [];
  } catch (error) {
    console.error("Erro ao acessar planos:", error);
    return [];
  }
};

// Função para salvar um plano no banco de dados
export const savePlan = async (plan: Plan): Promise<Plan> => {
  try {
    // Como não temos acesso à tabela plans, apenas retornamos o plano
    return plan;
  } catch (error) {
    console.error("Erro ao salvar plano:", error);
    return plan; // Retornar o plano original caso falhe
  }
};

// Função para excluir um plano do banco de dados
export const deletePlan = async (planId: string): Promise<void> => {
  try {
    // Sem acesso à tabela plans, esta função não faz nada
    console.log(`Simulação: Plano ${planId} excluído.`);
  } catch (error) {
    console.error("Erro ao excluir plano:", error);
  }
};
