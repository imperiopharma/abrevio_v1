
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Transition } from '@/components/animations/Transition';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-abrev-dark relative">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-abrev-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-abrev-purple/10 rounded-full blur-3xl"></div>
        
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="w-full max-w-lg text-center">
        <Transition type="slide-down" delay={0.2}>
          <div className="mb-4 text-abrev-blue text-9xl font-bold tracking-tighter relative">
            <span className="relative z-10">404</span>
            {/* Shadow effect */}
            <span className="absolute -top-2 -left-2 text-abrev-purple opacity-30 blur-sm z-0">404</span>
          </div>
        </Transition>
        
        <Transition type="slide-up" delay={0.3}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Página não encontrada
          </h1>
        </Transition>
        
        <Transition type="fade" delay={0.4}>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            O link que você acessou pode estar quebrado ou a página pode ter sido removida.
          </p>
        </Transition>
        
        <Transition type="slide-up" delay={0.5}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-gray-700 hover:border-abrev-blue hover:bg-abrev-blue/10 transition-all duration-300"
            >
              Voltar
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
            >
              <Home className="mr-2 h-4 w-4" /> Página Inicial
            </Button>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default NotFound;
