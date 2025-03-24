
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import { Transition, TransitionGroup } from '@/components/animations/Transition';
import { Link, ExternalLink, Zap, Link2, QrCode, BarChart3, Smartphone, CheckCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({
    hero: false,
    features: false,
    stats: false,
    cta: false
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: 'Encurtador de URLs',
      description: 'Transforme URLs longas em links curtos e fáceis de compartilhar',
      icon: <Link2 size={32} className="text-abrev-blue" />,
      color: 'blue'
    },
    {
      title: 'QR Codes',
      description: 'Gere QR codes personalizados para seus links encurtados',
      icon: <QrCode size={32} className="text-abrev-purple" />,
      color: 'purple'
    },
    {
      title: 'Link Bio',
      description: 'Crie uma página personalizada com todos os seus links importantes',
      icon: <Link size={32} className="text-abrev-neon-pink" />,
      color: 'pink'
    },
    {
      title: 'QR para WhatsApp',
      description: 'Crie QR codes que abrem conversas no WhatsApp automaticamente',
      icon: <Smartphone size={32} className="text-abrev-neon-green" />,
      color: 'green'
    },
    {
      title: 'Estatísticas Detalhadas',
      description: 'Acompanhe clicks, localizações, dispositivos e muito mais',
      icon: <BarChart3 size={32} className="text-abrev-blue" />,
      color: 'blue'
    },
    {
      title: 'Links Instantâneos',
      description: 'Criação rápida e fácil de links encurtados em segundos',
      icon: <Zap size={32} className="text-abrev-purple" />,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-abrev-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <Transition 
            type="slide-up" 
            className="flex flex-col items-center text-center"
            delay={0.3}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-blue">Encurte</span>{" "}
              <span className="text-white">links e</span>{" "}
              <span className="text-gradient-purple">conecte</span>{" "}
              <span className="text-white">seu mundo</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8">
              Abrev.io é a plataforma completa para criar, gerenciar e compartilhar links curtos, 
              QR codes e páginas personalizadas de bio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                onClick={() => navigate('/register')}
                className="text-lg px-8 py-6 bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
              >
                Começar Grátis
              </Button>
              <Button 
                onClick={scrollToFeatures}
                variant="outline" 
                className="text-lg px-8 py-6 border-gray-700 hover:border-abrev-blue transition-all duration-300"
              >
                Conhecer Recursos
              </Button>
            </div>
          </Transition>
          
          {/* Hero Background Elements */}
          <div className="absolute top-1/4 left-20 w-32 h-32 bg-abrev-blue/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-abrev-purple/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <Transition 
            type="slide-up" 
            className="text-center mb-20"
            delay={0.2}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-blue">Recursos</span>{" "}
              <span className="text-white">Poderosos</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Tudo o que você precisa para gerenciar seus links de forma eficiente e profissional.
            </p>
          </Transition>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {features.map((feature, idx) => (
              <Transition key={idx} delay={0.1 + idx * 0.1} type="slide-up">
                <GlassCard className="h-full" glowColor={feature.color as any} hover={true}>
                  <div className="flex flex-col h-full">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </GlassCard>
              </Transition>
            ))}
          </div>
        </div>
        
        {/* Feature section background elements */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-abrev-blue/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-abrev-purple/5 rounded-full blur-3xl -z-10"></div>
      </section>
      
      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '99.9%', label: 'Disponibilidade' },
              { number: '1B+', label: 'Links Gerados' },
              { number: '5M+', label: 'QR Codes' },
              { number: '2M+', label: 'Usuários Ativos' }
            ].map((stat, idx) => (
              <Transition key={idx} delay={0.1 + idx * 0.1} type="slide-up">
                <GlassCard className="text-center" hover={true}>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-blue">{stat.number}</h3>
                  <p className="text-gray-300 text-lg">{stat.label}</p>
                </GlassCard>
              </Transition>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="cta" className="py-24 px-4 md:px-8 lg:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <Transition type="slide-up" delay={0.2}>
            <GlassCard className="relative overflow-hidden" glowColor="blue">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4 md:p-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    <span className="text-white">Comece a</span>{" "}
                    <span className="text-gradient-blue">encurtar links</span>{" "}
                    <span className="text-white">hoje mesmo</span>
                  </h2>
                  <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                    Junte-se a milhões de usuários que confiam no Abrev.io para gerenciar seus links.
                    Crie uma conta gratuita em segundos.
                  </p>
                  <ul className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
                    {['Sem custo inicial', 'Sem cartão de crédito', 'Cancelamento a qualquer momento'].map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle size={20} className="text-abrev-blue mr-2" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={() => navigate('/register')}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
                >
                  Crie Sua Conta Grátis
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-abrev-blue/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-5 -left-5 w-24 h-24 bg-abrev-purple/10 rounded-full blur-2xl"></div>
            </GlassCard>
          </Transition>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 lg:px-12 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link 
                to="/" 
                className="text-2xl font-bold"
              >
                <span className="text-gradient-blue">Abrev</span>
                <span className="text-white">.io</span>
              </Link>
              <p className="text-gray-400 mt-2">Encurte links e conecte seu mundo</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="text-gray-200 font-semibold mb-3">Produto</h3>
                <ul className="space-y-2">
                  {['Encurtador', 'QR Codes', 'Link Bio', 'WhatsApp Links'].map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-gray-400 hover:text-abrev-blue transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-200 font-semibold mb-3">Empresa</h3>
                <ul className="space-y-2">
                  {['Sobre', 'Contato', 'Blog', 'Carreiras'].map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-gray-400 hover:text-abrev-blue transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-200 font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  {['Termos', 'Privacidade', 'Cookies'].map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-gray-400 hover:text-abrev-blue transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Abrev.io. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
