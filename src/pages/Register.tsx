
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Transition } from '@/components/animations/Transition';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirecionar se já estiver autenticado
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'Senhas não conferem',
        description: 'A senha e a confirmação de senha devem ser iguais',
        variant: 'destructive',
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: 'Senha muito curta',
        description: 'A senha deve ter pelo menos 6 caracteres',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await signUp(email, password);
      toast({
        title: 'Conta criada com sucesso',
        description: 'Verifique seu email para confirmar sua conta',
      });
      navigate('/login');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast({
        title: 'Erro no cadastro',
        description: error.message || 'Não foi possível criar sua conta',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-abrev-dark">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-abrev-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-abrev-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <Transition type="scale-up">
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
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>
                  Registre-se para começar a usar a plataforma Abrev.io
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
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-abrev-dark/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Criando conta...
                      </>
                    ) : (
                      'Criar Conta'
                    )}
                  </Button>
                  <p className="text-center text-sm text-gray-400">
                    Já tem uma conta?{" "}
                    <Link 
                      to="/login" 
                      className="text-abrev-blue hover:underline"
                    >
                      Fazer login
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

export default Register;
