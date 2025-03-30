
import { supabase } from "@/integrations/supabase/client";

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password-confirm',
    });
    
    if (error) {
      console.error('Reset password error:', error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Reset password exception:', error);
    throw error;
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) {
      console.error('Update password error:', error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Update password exception:', error);
    throw error;
  }
};
