
import { supabase } from "@/integrations/supabase/client";
import { AdminUserAttributes } from "@supabase/supabase-js";

// Function to create and confirm test accounts for development
export const createTestAccounts = async () => {
  try {
    console.log("Tentando criar contas de teste...");
    
    // Create or confirm user account
    const userResult = await createOrConfirmTestAccount(
      "usuario@teste.com",
      "123456",
      { role: "user" }
    );
    
    // Create or confirm admin account
    const adminResult = await createOrConfirmTestAccount(
      "admin@teste.com",
      "123456",
      { role: "admin" }
    );
    
    return {
      success: true,
      user: userResult,
      admin: adminResult
    };
  } catch (error) {
    console.error("Erro ao criar contas de teste:", error);
    return { success: false, error };
  }
};

// Helper function to create or confirm a test account
async function createOrConfirmTestAccount(
  email: string,
  password: string,
  userData: { role: "user" | "admin" }
) {
  try {
    // Check if user already exists
    const { data, error: getUserError } = await supabase.auth.admin.listUsers();
    
    if (getUserError) {
      console.error(`Erro ao verificar se o email ${email} já existe:`, getUserError);
      return { success: false, error: getUserError };
    }
    
    // Properly type the users array to fix the TypeScript error
    const existingUser = data?.users && data.users.length > 0 
      ? data.users.find(u => u.email === email) 
      : undefined;
    
    if (existingUser) {
      // User exists, check if their email is confirmed
      if (existingUser.email_confirmed_at) {
        console.log(`Conta ${email} já existe e está confirmada.`);
        
        // Update user metadata to ensure role is set
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          { user_metadata: userData }
        );
        
        if (updateError) {
          console.error(`Erro ao atualizar metadados para ${email}:`, updateError);
        }
        
        return { success: true, alreadyExists: true };
      } else {
        // Email not confirmed, update user and confirm email
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          { 
            email_confirm: true,
            user_metadata: userData
          }
        );
        
        if (updateError) {
          console.error(`Erro ao confirmar email para ${email}:`, updateError);
          return { success: false, error: updateError };
        }
        
        console.log(`Email confirmado para ${email}`);
        return { success: true, confirmed: true };
      }
    } else {
      // User doesn't exist, create a new account
      const { data, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: userData
      });
      
      if (createError) {
        console.error(`Erro ao criar conta para ${email}:`, createError);
        return { success: false, error: createError };
      }
      
      console.log(`Conta ${email} criada com sucesso`);
      return { success: true, created: true, user: data.user };
    }
  } catch (error) {
    console.error(`Erro ao criar/confirmar conta para ${email}:`, error);
    return { success: false, error };
  }
}
