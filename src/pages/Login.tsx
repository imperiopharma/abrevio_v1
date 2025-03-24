
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { Transition } from '@/components/animations/Transition';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    if (!email) {
      newErrors.email = 'Por favor, informe seu email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Informe um email válido';
    }
    
    if (!password) {
      newErrors.password = 'Por favor, informe sua senha';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Implement Supabase login
      // For now, simulate a login success
      setTimeout(() => {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o Dashboard...",
        });
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setErrors({
        general: 'Email ou senha incorretos. Tente novamente.'
      });
      
      toast({
        title: "Erro ao fazer login",
        description: 'Email ou senha incorretos. Tente novamente.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-abrev-dark relative">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-abrev-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-abrev-purple/10 rounded-full blur-3xl"></div>
      </div>
      
      <Transition type="slide-up" className="w-full max-w-md">
        <Link to="/" className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors duration-300">
          <ArrowLeft size={16} className="mr-2" />
          <span>Voltar para Home</span>
        </Link>
        
        <GlassCard className="w-full" glowColor="blue">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient-blue">Bem-vindo</span> de volta
            </h1>
            <p className="text-gray-400 mt-2">Entre com sua conta para continuar</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-gray-200 inline-block transition-all duration-200"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className={`bg-white/5 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-blue transition-all duration-300`}
              />
              {errors.email && (
                <span className="text-red-400 text-sm">{errors.email}</span>
              )}
            </div>
            
            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-gray-200 inline-block transition-all duration-200"
              >
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className={`bg-white/5 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-blue transition-all duration-300 pr-10`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-sm">{errors.password}</span>
              )}
            </div>
            
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-abrev-blue hover:underline transition-colors duration-300"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
            
            <div className="text-center text-sm text-gray-400">
              <span>Não tem uma conta?</span>{' '}
              <Link 
                to="/register" 
                className="text-abrev-blue hover:underline transition-colors duration-300"
              >
                Criar conta
              </Link>
            </div>
          </form>
        </GlassCard>
      </Transition>
    </div>
  );
};

export default Login;
