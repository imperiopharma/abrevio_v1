
import { nanoid } from 'nanoid';
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser } from './auth';

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
