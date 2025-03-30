
import { supabase } from "@/integrations/supabase/client";
import { Plan } from "@/components/admin/plans/types";
import { nanoid } from 'nanoid';

// Interface para os links encurtados
export interface ShortLink {
  id?: string;
  user_id?: string;
  slug: string;
  original_url: string;
  short_url: string;
  title?: string;
  is_active?: boolean;
  expires_at?: string | null;
  created_at?: string;
  tags?: string[];
}

// Interface para as métricas de cliques
export interface ClickData {
  id?: string;
  link_id: string;
  ip?: string;
  user_agent?: string;
  referer?: string;
  device?: string;
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  created_at?: string;
}

// Interface para configurações de QR Code
export interface QRCodeConfig {
  id?: string;
  link_id: string;
  user_id?: string;
  color?: string;
  background?: string;
  margin?: number;
  size?: number;
  logo_url?: string;
  created_at?: string;
}

// Função para verificar se uma tabela existe
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Usar rpc para gerar slug aleatório
    const { data, error } = await supabase.rpc('generate_random_slug');
    
    if (error) {
      console.warn(`Erro ao verificar funcionalidade RPC:`, error);
      return false;
    }
    
    // Tentativa direta de usar a tabela
    if (tableName === 'links' || tableName === 'clicks' || tableName === 'qr_codes') {
      const { count, error: countError } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .limit(1);
        
      // Se não houver erro, a tabela existe
      return !countError;
    }
    
    return false;
  } catch (error) {
    console.error(`Erro ao verificar tabela ${tableName}:`, error);
    return false;
  }
};

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

// Função para encurtar um link
export const shortenLink = async (
  originalUrl: string, 
  customSlug?: string, 
  title?: string,
  expiresAt?: string | null,
  tags?: string[]
): Promise<ShortLink | null> => {
  try {
    const user = await getCurrentUser();
    
    // Gerar slug se não fornecido
    const slug = customSlug || nanoid(6);
    const shortUrl = `abrev.io/${slug}`;
    
    const newLink: ShortLink = {
      user_id: user?.id,
      slug,
      original_url: originalUrl,
      short_url: shortUrl,
      title: title || '',
      expires_at: expiresAt,
      tags: tags || []
    };
    
    const { data, error } = await supabase
      .from('links')
      .insert([newLink])
      .select()
      .single();
    
    if (error) {
      console.error("Erro ao encurtar link:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao encurtar link:", error);
    return null;
  }
};

// Função para buscar links do usuário
export const fetchUserLinks = async (): Promise<ShortLink[]> => {
  try {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar links:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Erro ao buscar links:", error);
    return [];
  }
};

// Função para excluir um link
export const deleteLink = async (linkId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', linkId);
    
    if (error) {
      console.error("Erro ao excluir link:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Erro ao excluir link:", error);
    return false;
  }
};

// Função para registrar um clique em um link
export const registerClick = async (
  linkId: string, 
  clickData: Partial<ClickData>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('clicks')
      .insert([{
        link_id: linkId,
        ...clickData
      }]);
    
    if (error) {
      console.error("Erro ao registrar clique:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Erro ao registrar clique:", error);
    return false;
  }
};

// Função para buscar estatísticas de um link
export const fetchLinkStats = async (linkId: string): Promise<{ 
  totalClicks: number;
  clicksByDay: any[];
  clicksByBrowser: any[];
  clicksByDevice: any[];
  clicksByCountry: any[];
}> => {
  try {
    // Buscar total de cliques
    const { count: totalClicks, error: countError } = await supabase
      .from('clicks')
      .select('*', { count: 'exact', head: true })
      .eq('link_id', linkId);
    
    if (countError) {
      console.error("Erro ao buscar total de cliques:", countError);
    }
    
    // Buscar cliques por dia (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: clicksByDay, error: byDayError } = await supabase
      .from('clicks')
      .select('created_at')
      .eq('link_id', linkId)
      .gte('created_at', thirtyDaysAgo.toISOString());
    
    if (byDayError) {
      console.error("Erro ao buscar cliques por dia:", byDayError);
    }
    
    // Buscar cliques por navegador
    const { data: clicksByBrowser, error: byBrowserError } = await supabase
      .from('clicks')
      .select('browser')
      .eq('link_id', linkId);
    
    if (byBrowserError) {
      console.error("Erro ao buscar cliques por navegador:", byBrowserError);
    }
    
    // Buscar cliques por dispositivo
    const { data: clicksByDevice, error: byDeviceError } = await supabase
      .from('clicks')
      .select('device')
      .eq('link_id', linkId);
    
    if (byDeviceError) {
      console.error("Erro ao buscar cliques por dispositivo:", byDeviceError);
    }
    
    // Buscar cliques por país
    const { data: clicksByCountry, error: byCountryError } = await supabase
      .from('clicks')
      .select('country')
      .eq('link_id', linkId);
    
    if (byCountryError) {
      console.error("Erro ao buscar cliques por país:", byCountryError);
    }
    
    // Processar e agrupar dados para retorno
    const processedClicksByDay = processClicksByDay(clicksByDay || []);
    const processedClicksByBrowser = processClicksByCategory(clicksByBrowser || [], 'browser');
    const processedClicksByDevice = processClicksByCategory(clicksByDevice || [], 'device');
    const processedClicksByCountry = processClicksByCategory(clicksByCountry || [], 'country');
    
    return {
      totalClicks: totalClicks || 0,
      clicksByDay: processedClicksByDay,
      clicksByBrowser: processedClicksByBrowser,
      clicksByDevice: processedClicksByDevice,
      clicksByCountry: processedClicksByCountry
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return {
      totalClicks: 0,
      clicksByDay: [],
      clicksByBrowser: [],
      clicksByDevice: [],
      clicksByCountry: []
    };
  }
};

// Função auxiliar para processar cliques por dia
const processClicksByDay = (clicks: any[]) => {
  const now = new Date();
  const dates: { [key: string]: number } = {};
  
  // Inicializar os últimos 30 dias com zero cliques
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dates[dateStr] = 0;
  }
  
  // Contar os cliques por dia
  clicks.forEach(click => {
    const dateStr = new Date(click.created_at).toISOString().split('T')[0];
    if (dates[dateStr] !== undefined) {
      dates[dateStr]++;
    }
  });
  
  // Converter para array para gráficos
  return Object.entries(dates)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

// Função auxiliar para processar cliques por categoria
const processClicksByCategory = (clicks: any[], category: string) => {
  const counts: { [key: string]: number } = {};
  
  clicks.forEach(click => {
    const value = click[category] || 'Desconhecido';
    counts[value] = (counts[value] || 0) + 1;
  });
  
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Função para salvar configuração QR Code
export const saveQRCodeConfig = async (config: QRCodeConfig): Promise<QRCodeConfig | null> => {
  try {
    const user = await getCurrentUser();
    
    const newConfig = {
      ...config,
      user_id: user?.id
    };
    
    const { data, error } = await supabase
      .from('qr_codes')
      .upsert([newConfig])
      .select()
      .single();
    
    if (error) {
      console.error("Erro ao salvar configuração QR Code:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao salvar configuração QR Code:", error);
    return null;
  }
};

// Função para buscar configuração QR Code
export const fetchQRCodeConfig = async (linkId: string): Promise<QRCodeConfig | null> => {
  try {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('link_id', linkId)
      .single();
    
    if (error) {
      if (error.code !== 'PGRST116') { // Código para "não encontrado"
        console.error("Erro ao buscar configuração QR Code:", error);
      }
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar configuração QR Code:", error);
    return null;
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

// Função para criar contas de teste
export const createTestAccounts = async () => {
  try {
    // Verifica se já existe o usuário de teste
    const { data: existingUsers, error: searchError } = await supabase.auth.admin.listUsers();
    
    if (searchError) {
      console.error("Erro ao verificar usuários existentes:", searchError);
      return;
    }
    
    // Verifica se o usuário comum já existe
    const userExists = existingUsers.users.some(user => user.email === "usuario@teste.com");
    
    // Verifica se o admin já existe
    const adminExists = existingUsers.users.some(user => user.email === "admin@teste.com");
    
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
