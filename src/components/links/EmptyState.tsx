
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Search, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface EmptyStateProps {
  searchTerm?: string;
  onClear?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, onClear }) => {
  if (searchTerm) {
    return (
      <GlassCard className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-abrev-dark-accent flex items-center justify-center mb-4">
          <Search className="text-gray-400 h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Nenhum resultado encontrado</h3>
        <p className="text-gray-400 mb-4 max-w-md">
          Não encontramos nenhum link correspondente a "{searchTerm}".
        </p>
        {onClear && (
          <Button 
            variant="outline" 
            onClick={onClear}
            className="border-gray-700 hover:bg-gray-800"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar busca
          </Button>
        )}
      </GlassCard>
    );
  }

  return (
    <GlassCard className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-abrev-blue to-abrev-purple flex items-center justify-center mb-4">
        <Link2 className="text-white h-8 w-8" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">Você ainda não tem links</h3>
      <p className="text-gray-400 mb-6 max-w-md">
        Comece encurtando seu primeiro link. É rápido, fácil e seguro!
      </p>
      <Button asChild className="bg-abrev-blue hover:bg-abrev-blue/80">
        <Link to="/link/new">
          <Plus className="mr-2 h-4 w-4" />
          Criar meu primeiro link
        </Link>
      </Button>
    </GlassCard>
  );
};

const Link2 = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
};

export default EmptyState;
