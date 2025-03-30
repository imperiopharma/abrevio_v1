
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Get current user profile
export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (profile: Partial<Profile> & { id: string }): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq('id', profile.id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating user profile:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
};

// Upload avatar image
export const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
  try {
    // Create bucket if it doesn't exist
    const { error: bucketError } = await supabase.storage.createBucket('avatars', {
      public: true
    });
    
    if (bucketError && !bucketError.message.includes('already exists')) {
      console.error("Error creating avatars bucket:", bucketError);
      return null;
    }
    
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });
    
    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return null;
    }
    
    // Get the public URL
    const { data: publicURL } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    
    // Update profile with the new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: publicURL.publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (updateError) {
      console.error("Error updating profile with avatar URL:", updateError);
      return null;
    }
    
    return publicURL.publicUrl;
  } catch (error) {
    console.error("Error in avatar upload process:", error);
    return null;
  }
};
