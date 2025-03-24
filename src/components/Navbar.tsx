
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Transition } from '@/components/animations/Transition';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 backdrop-blur-xl bg-abrev-dark/80 shadow-lg' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center"
        >
          <span className="text-gradient-blue">Abrev</span>
          <span className="text-white">.io</span>
        </Link>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            className="text-white hover:text-abrev-blue transition-colors duration-300 link-hover"
          >
            Início
          </Link>
          <Link 
            to="/features"
            className="text-white hover:text-abrev-blue transition-colors duration-300 link-hover"
          >
            Recursos
          </Link>
          <Link 
            to="/pricing"
            className="text-white hover:text-abrev-blue transition-colors duration-300 link-hover"
          >
            Preços
          </Link>
          <Link 
            to="/login"
            className="text-white hover:text-abrev-blue transition-colors duration-300 link-hover"
          >
            Entrar
          </Link>
          <Button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
          >
            Criar Conta
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <Transition
          type="slide-down"
          className="md:hidden bg-abrev-dark-accent/95 backdrop-blur-lg shadow-xl"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/"
              className="text-white hover:text-abrev-blue transition-colors duration-300 py-2"
            >
              Início
            </Link>
            <Link 
              to="/features"
              className="text-white hover:text-abrev-blue transition-colors duration-300 py-2"
            >
              Recursos
            </Link>
            <Link 
              to="/pricing"
              className="text-white hover:text-abrev-blue transition-colors duration-300 py-2"
            >
              Preços
            </Link>
            <Link 
              to="/login"
              className="text-white hover:text-abrev-blue transition-colors duration-300 py-2"
            >
              Entrar
            </Link>
            <Button
              onClick={() => navigate('/register')}
              className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple"
            >
              Criar Conta
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </Transition>
      )}
    </header>
  );
};

export default Navbar;
