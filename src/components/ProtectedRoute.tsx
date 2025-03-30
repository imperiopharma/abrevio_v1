
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
  const { user, loading, session, isAuthenticated } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: 'Acesso restrito',
        description: 'Você precisa estar logado para acessar esta página',
        variant: 'destructive',
      });
    }
  }, [loading, isAuthenticated]);

  // Enquanto carrega, mostra um spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-abrev-dark">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-abrev-blue" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para o login
  if (!session || !user) {
    console.log('No authenticated session, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
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
