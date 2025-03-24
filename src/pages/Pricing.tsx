
import React from 'react';
import { Button } from '@/components/ui/button';
import { Transition } from '@/components/animations/Transition';
import Navbar from '@/components/Navbar';
import { Check } from 'lucide-react';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  recommended = false,
  delay = 0
}) => {
  return (
    <Transition type="slide-up" delay={delay}>
      <div className={`rounded-xl backdrop-blur-lg ${
        recommended 
          ? 'border-2 border-abrev-blue/50 bg-abrev-dark-accent/60' 
          : 'border border-gray-800 bg-abrev-dark-accent/30'
      } p-6 relative`}>
        {recommended && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-abrev-blue to-abrev-purple text-white text-xs font-bold py-1 px-4 rounded-full">
            Recomendado
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
          {price !== 'Grátis' && <span className="text-gray-400 ml-1">/mês</span>}
        </div>
        <p className="text-gray-400 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} className="text-abrev-blue mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${
            recommended 
              ? 'bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          } transition-all duration-300`}
        >
          {buttonText}
        </Button>
      </div>
    </Transition>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen bg-abrev-dark">
      <Navbar />
      
      <div className="relative">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-abrev-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-abrev-purple/10 rounded-full blur-3xl"></div>
          
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="container mx-auto px-4 py-32">
          <Transition type="fade">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient-blue">Preços</span> simples e transparentes
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Escolha o plano que melhor se adapta às suas necessidades. Todos os planos incluem recursos avançados para encurtar links, criar QR codes e muito mais.
              </p>
            </div>
          </Transition>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingTier
              title="Básico"
              price="Grátis"
              description="Perfeito para usuários individuais e necessidades básicas."
              features={[
                "Até 50 links encurtados",
                "Estatísticas básicas",
                "QR codes simples",
                "1 página de bio",
                "Sem marca d'água",
              ]}
              buttonText="Começar Grátis"
              delay={0.1}
            />
            
            <PricingTier
              title="Pro"
              price="R$29"
              description="Ideal para criadores de conteúdo e pequenas empresas."
              features={[
                "Links ilimitados",
                "Estatísticas avançadas",
                "QR codes personalizados",
                "5 páginas de bio",
                "Domínio personalizado",
                "Suporte prioritário",
              ]}
              buttonText="Assinar Pro"
              recommended={true}
              delay={0.2}
            />
            
            <PricingTier
              title="Empresas"
              price="R$89"
              description="Para equipes e empresas com necessidades avançadas."
              features={[
                "Links ilimitados",
                "Estatísticas completas",
                "QR codes de marca",
                "Bio pages ilimitadas",
                "Múltiplos domínios",
                "Suporte VIP",
                "API acesso",
                "Usuários ilimitados",
              ]}
              buttonText="Contatar Vendas"
              delay={0.3}
            />
          </div>
          
          <Transition type="fade" delay={0.4}>
            <div className="mt-16 text-center bg-gradient-to-r from-abrev-blue/10 to-abrev-purple/10 p-8 rounded-xl backdrop-blur-lg border border-white/10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">Precisa de um plano personalizado?</h2>
              <p className="text-gray-400 mb-6">
                Entre em contato com nossa equipe para criarmos um plano que atenda perfeitamente às necessidades do seu negócio.
              </p>
              <Button className="bg-white text-abrev-dark hover:bg-gray-200 transition-all duration-300">
                Falar com Equipe de Vendas
              </Button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
