
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      toast({
        title: 'Acesso restrito',
        description: 'Você precisa estar logado para acessar esta página',
        variant: 'destructive',
      });
    }
  }, [loading, session]);

  // Enquanto carrega, mostra um spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-abrev-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-abrev-blue"></div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para o login
  if (!session || !user) {
    console.log('No authenticated session, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Se for uma rota de admin, verificar permissões
  if (isAdmin) {
    const isUserAdmin = user.user_metadata?.role === 'admin';
    if (!isUserAdmin) {
      toast({
        title: 'Acesso restrito',
        description: 'Você não tem permissão para acessar esta área',
        variant: 'destructive',
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
