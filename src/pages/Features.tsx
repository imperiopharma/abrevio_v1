
import React from 'react';
import { Button } from '@/components/ui/button';
import { Transition } from '@/components/animations/Transition';
import Navbar from '@/components/Navbar';
import { Link2, Smartphone, QrCode, BarChart3, Share2, Globe } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <Transition type="fade" delay={delay}>
    <div className="bg-abrev-dark-accent/30 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-abrev-blue/50 transition-all duration-300">
      <div className="bg-gradient-to-br from-abrev-blue to-abrev-purple p-3 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </Transition>
);

const Features = () => {
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
                <span className="text-gradient-blue">Recursos</span> poderosos para seu conteúdo digital
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                O Abrev.io oferece uma suíte completa de ferramentas para gerenciar, encurtar e compartilhar seus links de forma eficiente.
              </p>
            </div>
          </Transition>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Link2 size={24} className="text-white" />}
              title="Encurtador de Links"
              description="Transforme URLs longos em links curtos e fáceis de compartilhar, ideal para redes sociais e marketing digital."
              delay={0.1}
            />
            
            <FeatureCard
              icon={<QrCode size={24} className="text-white" />}
              title="QR Codes Dinâmicos"
              description="Crie QR codes profissionais que direcionam para seus links, com personalização de cores e logos."
              delay={0.2}
            />
            
            <FeatureCard
              icon={<Smartphone size={24} className="text-white" />}
              title="Bio Page"
              description="Crie uma página com múltiplos links para compartilhar em perfis de redes sociais como Instagram e TikTok."
              delay={0.3}
            />
            
            <FeatureCard
              icon={<BarChart3 size={24} className="text-white" />}
              title="Estatísticas Detalhadas"
              description="Acompanhe cliques, localização geográfica, dispositivos e fontes de tráfego para cada link compartilhado."
              delay={0.4}
            />
            
            <FeatureCard
              icon={<Globe size={24} className="text-white" />}
              title="Domínio Personalizado"
              description="Use seu próprio domínio para seus links encurtados, reforçando sua marca e identidade."
              delay={0.5}
            />
            
            <FeatureCard
              icon={<Share2 size={24} className="text-white" />}
              title="Compartilhamento Fácil"
              description="Compartilhe seus links diretamente nas principais redes sociais com apenas um clique."
              delay={0.6}
            />
          </div>
          
          <Transition type="slide-up" delay={0.7}>
            <div className="mt-16 text-center">
              <Button 
                className="bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300 text-lg px-8 py-6"
                onClick={() => window.location.href = '/register'}
              >
                Começar a Usar Gratuitamente
              </Button>
              <p className="text-gray-400 mt-4">
                Não precisa de cartão de crédito. Comece grátis e faça upgrade quando precisar.
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default Features;
