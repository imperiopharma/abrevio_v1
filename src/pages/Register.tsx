
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { Transition } from '@/components/animations/Transition';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validateStep1 = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Por favor, informe seu nome';
    }
    
    if (!email) {
      newErrors.email = 'Por favor, informe seu email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Informe um email válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    
    if (!password) {
      newErrors.password = 'Por favor, crie uma senha';
    } else if (password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Por favor, confirme sua senha';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Implement Supabase registration
      // For now, simulate a registration success
      setTimeout(() => {
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao Abrev.io.",
        });
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setErrors({
        general: 'Erro ao criar conta. Tente novamente.'
      });
      
      toast({
        title: "Erro ao criar conta",
        description: 'Tente novamente mais tarde.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const labels = ['Fraca', 'Média', 'Boa', 'Forte'];
    return { strength, label: labels[strength - 1] || '' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-abrev-dark relative">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-abrev-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-abrev-blue/10 rounded-full blur-3xl"></div>
      </div>
      
      <Transition type="slide-up" className="w-full max-w-md">
        <Link to="/" className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors duration-300">
          <ArrowLeft size={16} className="mr-2" />
          <span>Voltar para Home</span>
        </Link>
        
        <GlassCard className="w-full" glowColor="purple">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient-purple">Crie</span> sua conta
            </h1>
            <p className="text-gray-400 mt-2">Comece a encurtar URLs em segundos</p>
          </div>
          
          {/* Step indicator */}
          <div className="w-full flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-abrev-purple text-white' : 'bg-gray-700 text-gray-400'} transition-colors duration-300`}>
                {currentStep > 1 ? <CheckCircle size={16} /> : 1}
              </div>
              <div className={`w-16 h-1 rounded ${currentStep > 1 ? 'bg-abrev-purple' : 'bg-gray-700'} transition-colors duration-300`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-abrev-purple text-white' : 'bg-gray-700 text-gray-400'} transition-colors duration-300`}>
                2
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            
            {currentStep === 1 && (
              <Transition key="step1" type="fade" className="space-y-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="name" 
                    className="text-gray-200 inline-block transition-all duration-200"
                  >
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className={`bg-white/5 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-purple transition-all duration-300`}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-sm">{errors.name}</span>
                  )}
                </div>
                
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
                    className={`bg-white/5 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-purple transition-all duration-300`}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-sm">{errors.email}</span>
                  )}
                </div>
                
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-purple/20 transition-all duration-300"
                >
                  Continuar
                </Button>
              </Transition>
            )}
            
            {currentStep === 2 && (
              <Transition key="step2" type="fade" className="space-y-6">
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
                      placeholder="Crie uma senha forte"
                      className={`bg-white/5 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-purple transition-all duration-300 pr-10`}
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
                  
                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Força da senha: {passwordStrength.label}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            passwordStrength.strength === 1 ? 'bg-red-500' : 
                            passwordStrength.strength === 2 ? 'bg-yellow-500' : 
                            passwordStrength.strength === 3 ? 'bg-green-500' : 
                            'bg-abrev-purple'
                          } transition-all duration-300`}
                          style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="confirmPassword" 
                    className="text-gray-200 inline-block transition-all duration-200"
                  >
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme sua senha"
                      className={`bg-white/5 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-purple transition-all duration-300 pr-10`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-400 text-sm">{errors.confirmPassword}</span>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1 border-gray-700 hover:border-abrev-purple hover:bg-abrev-purple/10 transition-all duration-300"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-purple/20 transition-all duration-300"
                  >
                    {isLoading ? 'Criando...' : 'Criar Conta'}
                  </Button>
                </div>
              </Transition>
            )}
            
            <div className="text-center text-sm text-gray-400">
              <span>Já tem uma conta?</span>{' '}
              <Link 
                to="/login" 
                className="text-abrev-purple hover:underline transition-colors duration-300"
              >
                Entrar
              </Link>
            </div>
          </form>
        </GlassCard>
      </Transition>
    </div>
  );
};

export default Register;
