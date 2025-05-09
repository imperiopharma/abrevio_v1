import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Transition } from '@/components/animations/Transition';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email) {
      setError('Por favor, informe seu email');
      return;
    }
    
    setLoading(true);
    
    try {
      await resetPassword(email);
      setSuccess(true);
      toast.success('Email enviado', {
        description: 'Verifique sua caixa de entrada para redefinir sua senha'
      });
    } catch (error: any) {
      console.error('Erro ao enviar email de redefinição:', error);
      setError(error.message || 'Não foi possível enviar o email de redefinição');
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
                <CardTitle>Redefinir Senha</CardTitle>
                <CardDescription>
                  Informe seu email para receber instruções de redefinição de senha
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
              
              {success ? (
                <CardContent className="space-y-4">
                  <Alert className="bg-green-900/20 border-green-800">
                    <AlertDescription className="text-center py-2">
                      Enviamos um email com instruções para redefinir sua senha.
                      Por favor, verifique sua caixa de entrada.
                    </AlertDescription>
                  </Alert>
                  <div className="text-center mt-4">
                    <Link to="/login">
                      <Button className="bg-abrev-blue hover:bg-abrev-blue/80">
                        Voltar para o login
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              ) : (
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
                          Enviando...
                        </>
                      ) : (
                        'Enviar instruções'
                      )}
                    </Button>
                    <p className="text-center text-sm text-gray-400">
                      <Link 
                        to="/login" 
                        className="text-abrev-blue hover:underline"
                      >
                        Voltar para o login
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              )}
            </Card>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default ResetPassword;
