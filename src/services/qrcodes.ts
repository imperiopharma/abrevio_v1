
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser } from './auth';

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
