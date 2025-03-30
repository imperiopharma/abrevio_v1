
import { supabase } from "@/integrations/supabase/client";

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
