
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Transition } from '@/components/animations/Transition';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Camera, User, Link as LinkIcon } from 'lucide-react';

interface ProfileData {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    id: '',
    full_name: '',
    avatar_url: '',
    bio: '',
    website: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      setProfile(data || { 
        id: user!.id, 
        full_name: '', 
        avatar_url: '', 
        bio: '', 
        website: '' 
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Erro ao carregar perfil', {
        description: 'Não foi possível carregar suas informações'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          bio: profile.bio,
          website: profile.website,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        throw error;
      }
      
      toast.success('Perfil atualizado', {
        description: 'Suas informações foram atualizadas com sucesso'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil', {
        description: 'Não foi possível salvar suas informações'
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file || !user) return;
    
    // Validar se é uma imagem
    if (!file.type.startsWith('image/')) {
      toast.error('Formato inválido', {
        description: 'O arquivo deve ser uma imagem'
      });
      return;
    }
    
    // Validar tamanho máximo (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Arquivo muito grande', {
        description: 'A imagem deve ter no máximo 2MB'
      });
      return;
    }
    
    try {
      setAvatarUploading(true);
      
      // Criar bucket de storage se não existir
      const { error: bucketError } = await supabase.storage.createBucket('avatars', {
        public: true
      });
      
      if (bucketError && !bucketError.message.includes('already exists')) {
        throw bucketError;
      }
      
      // Gerar um nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      
      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Obter a URL pública do arquivo
      const { data: publicURL } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      // Atualizar perfil com o novo avatar
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicURL.publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // Atualizar o estado local
      setProfile({
        ...profile,
        avatar_url: publicURL.publicUrl
      });
      
      toast.success('Avatar atualizado', {
        description: 'Sua foto de perfil foi atualizada com sucesso'
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Erro ao atualizar avatar', {
        description: 'Não foi possível salvar sua foto de perfil'
      });
    } finally {
      setAvatarUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-abrev-blue" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl p-4">
      <Transition type="fade">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Meu Perfil</h1>
          <p className="text-gray-400">Gerencie suas informações pessoais</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>Sua foto de perfil</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User'} />
                    <AvatarFallback className="bg-abrev-blue/20 text-abrev-blue">
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <label 
                    className="absolute bottom-0 right-0 p-2 bg-abrev-blue rounded-full cursor-pointer shadow-lg hover:bg-abrev-blue/80 transition-colors"
                    htmlFor="avatar-upload"
                  >
                    {avatarUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <Camera className="h-5 w-5 text-white" />
                    )}
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={avatarUploading}
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-white font-medium">
                    {profile.full_name || 'Usuário'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {user?.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name || ''}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="Seu nome completo"
                      className="bg-abrev-dark/50 border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex">
                      <div className="bg-abrev-dark/70 border-gray-700 border rounded-l-md flex items-center px-3">
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="website"
                        value={profile.website || ''}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        placeholder="https://seu-site.com"
                        className="bg-abrev-dark/50 border-gray-700 rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio || ''}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Conte um pouco sobre você..."
                      className="bg-abrev-dark/50 border-gray-700 min-h-32"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-abrev-blue hover:bg-abrev-blue/80"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      'Salvar Alterações'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Profile;
