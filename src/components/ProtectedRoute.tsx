
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { createTestAccounts } from '@/services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
  const { user, loading, session, isAuthenticated } = useAuth();
  const location = useLocation();

  // Cria contas de teste ao carregar o componente
  useEffect(() => {
    const setupTestAccounts = async () => {
      try {
        console.log("Iniciando criação de contas de teste...");
        const result = await createTestAccounts();
        console.log("Resultado da criação de contas de teste:", result);
        
        // Se a criação foi bem-sucedida, notifica o usuário
        if (result.success) {
          toast.success("Contas de teste criadas com sucesso", {
            description: "Use os botões na tela de login para testar"
          });
        }
      } catch (error) {
        console.error('Erro ao criar contas de teste:', error);
      }
    };
    
    setupTestAccounts();
  }, []);

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error("Acesso restrito", {
        description: 'Você precisa estar logado para acessar esta página'
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
      toast.error("Acesso restrito", {
        description: 'Você não tem permissão para acessar esta área'
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
