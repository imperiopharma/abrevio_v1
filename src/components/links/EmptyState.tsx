
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "Nenhum link encontrado com o termo pesquisado." 
}) => {
  return (
    <GlassCard className="text-center py-12">
      <p className="text-gray-400">{message}</p>
    </GlassCard>
  );
};

export default EmptyState;
