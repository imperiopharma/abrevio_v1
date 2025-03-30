import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Transition } from '@/components/animations/Transition';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await signIn(email, password);
      toast({
        title: 'Login realizado com sucesso',
        description: 'Você será redirecionado para o dashboard',
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast({
        title: 'Erro no login',
        description: error.message || 'Verifique suas credenciais e tente novamente',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
                    />
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
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
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
