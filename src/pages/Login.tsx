
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Transition } from '@/components/animations/Transition';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createTestAccounts } from '@/services/auth/testAccounts';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testAccountsCreated, setTestAccountsCreated] = useState(false);

  useEffect(() => {
    // Setup test accounts if they haven't been created yet
    if (!testAccountsCreated) {
      const setupTestAccounts = async () => {
        try {
          console.log("Iniciando criação de contas de teste...");
          const result = await createTestAccounts();
          console.log("Resultado da criação de contas de teste:", result);
          
          if (result.success) {
            console.log("Contas de teste criadas com sucesso");
            setTestAccountsCreated(true);
          }
        } catch (error) {
          console.error('Erro ao criar contas de teste:', error);
        }
      };
      
      setupTestAccounts();
    }
  }, [testAccountsCreated]);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      console.log("Login result:", result);
      
      // The redirect will happen via the useEffect hook when isAuthenticated changes
      toast.success('Login bem-sucedido', {
        description: 'Bem-vindo de volta!'
      });
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Falha ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsUser = () => {
    setEmail("usuario@teste.com");
    setPassword("123456");
  };

  const loginAsAdmin = () => {
    setEmail("admin@teste.com");
    setPassword("123456");
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-abrev-dark">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-abrev-blue" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-abrev-dark">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-abrev-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-abrev-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <Transition type="fade">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-abrev-blue to-abrev-purple bg-clip-text text-transparent">
                  Abrev.io
                </h1>
              </Link>
              <p className="text-gray-400 mt-2">Encurte links, amplie alcance</p>
            </div>
            
            <Card className="border-gray-800 bg-abrev-dark-accent/40">
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>
                  Acesse sua conta para gerenciar seus links encurtados
                </CardDescription>
              </CardHeader>
              
              {error && (
                <div className="px-6 mb-4">
                  <Alert variant="destructive" className="bg-red-900/20 border-red-800">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="ml-2">{error}</AlertDescription>
                  </Alert>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-abrev-dark/50 border-gray-700"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <Link 
                        to="/reset-password" 
                        className="text-xs text-abrev-blue hover:underline"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-abrev-dark/50 border-gray-700"
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-gray-400 mb-2">Contas para teste:</p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={loginAsUser}
                        className="text-xs flex-1 bg-abrev-dark/50 border-gray-700 hover:bg-gray-800"
                        disabled={loading}
                      >
                        Usuário
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={loginAsAdmin}
                        className="text-xs flex-1 bg-abrev-dark/50 border-gray-700 hover:bg-gray-800"
                        disabled={loading}
                      >
                        Admin
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      (Clique para preencher as credenciais)
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-abrev-blue hover:bg-abrev-blue/80"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                  <p className="text-center text-sm text-gray-400">
                    Ainda não tem uma conta?{" "}
                    <Link 
                      to="/register" 
                      className="text-abrev-blue hover:underline"
                    >
                      Criar conta
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Login;
