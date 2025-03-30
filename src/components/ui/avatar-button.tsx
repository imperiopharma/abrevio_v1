
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile } from '@/services/profile';

const AvatarButton = () => {
  const { user, signOut } = useAuth();
  const [profileName, setProfileName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      const profile = await getUserProfile(user.id);
      if (profile) {
        setProfileName(profile.full_name);
        setAvatarUrl(profile.avatar_url);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const getInitials = (name: string | null): string => {
    if (!name) return user?.email?.slice(0, 2).toUpperCase() || 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (!user) {
    return (
      <Button asChild variant="outline" className="rounded-full">
        <Link to="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl || undefined} alt={profileName || user.email || 'User'} />
            <AvatarFallback className="bg-abrev-blue/20 text-abrev-blue">
              {getInitials(profileName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profileName || 'Usuário'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex w-full items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            Meu Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="cursor-pointer flex w-full items-center">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        {user.user_metadata?.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-red-500 focus:text-red-500"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarButton;
