
import { supabase } from "@/integrations/supabase/client";

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
