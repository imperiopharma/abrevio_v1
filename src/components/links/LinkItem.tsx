
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { Transition } from '@/components/animations/Transition';
import { Copy, QrCode, BarChart3, ExternalLink, Trash, Check, Calendar, Toggle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { LinkType } from '@/components/links/types';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchLinkStats, deleteLink } from '@/services/api';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LinkItemProps {
  link: LinkType;
  index: number;
  onShowQRCode: (url: string, linkId: string) => void;
  onDelete: (id: string) => void;
  onViewStats: (id: string) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ 
  link, 
  index, 
  onShowQRCode, 
  onDelete,
  onViewStats
}) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isDeleting, setIsDeleting] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(`https://${text}`);
    setCopiedId(id);
    
    toast({
      title: "Link copiado para a área de transferência",
      description: "Agora você pode compartilhá-lo!",
    });
    
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const success = await deleteLink(id);
      
      if (success) {
        onDelete(id);
        toast({
          title: "Link excluído com sucesso",
        });
      } else {
        toast({
          title: "Erro ao excluir link",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao excluir link:", error);
      toast({
        title: "Erro ao excluir link",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Verifica se o link está expirado
  const isExpired = link.expires_at && new Date(link.expires_at) < new Date();

  // Formatar a data de expiração
  const formatExpireDate = () => {
    if (!link.expires_at) return null;
    
    const expireDate = new Date(link.expires_at);
    return format(expireDate, "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <Transition key={link.id} delay={index * 0.05} type="fade">
      <GlassCard 
        className={`border ${isExpired ? 'border-amber-600/30 bg-amber-900/10' : 'border-gray-800'} transition-all duration-300 hover:border-gray-700 overflow-hidden`} 
        hover={true}
      >
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="font-medium text-abrev-blue break-all">
                {link.short_url}
              </h3>
              <div className="bg-abrev-purple/20 text-abrev-purple px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                {link.clicks} clicks
              </div>
              
              {link.is_active ? (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                  Ativo
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/30">
                  Inativo
                </Badge>
              )}
              
              {isExpired && (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">
                  Expirado
                </Badge>
              )}
            </div>
            
            {link.title && (
              <div className="text-white font-medium mb-1">{link.title}</div>
            )}
            
            <div className="text-gray-400 mt-1 text-sm w-full overflow-hidden">
              <div className="flex items-start">
                <ExternalLink className="w-3 h-3 inline mr-1 shrink-0 mt-1" />
                <a 
                  href={link.original_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300 break-all line-clamp-2"
                  title={link.original_url}
                >
                  {link.original_url}
                </a>
              </div>
            </div>
            
            {link.expires_at && (
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <Calendar className="w-3 h-3 mr-1" />
                Expira em: {formatExpireDate()}
              </div>
            )}
          </div>
          
          {isMobile ? (
            // Mobile Action Buttons - More compact layout
            <div className="flex gap-2 items-center flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(link.short_url, link.id)}
                className={`${
                  copiedId === link.id 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : 'border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white'
                } transition-all duration-300 min-w-0 px-3`}
              >
                {copiedId === link.id ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onShowQRCode(link.short_url, link.id)}
                className="border-gray-700 text-gray-300 hover:border-abrev-purple hover:text-white transition-all duration-300 min-w-0 px-3"
              >
                <QrCode className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewStats(link.id)}
                className="border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white transition-all duration-300 min-w-0 px-3"
              >
                <BarChart3 className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(link.id)}
                disabled={isDeleting}
                className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 transition-all duration-300 min-w-0 px-3"
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            // Desktop Action Buttons
            <div className="flex flex-wrap gap-2 items-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(link.short_url, link.id)}
                className={`${
                  copiedId === link.id 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : 'border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white'
                } transition-all duration-300`}
              >
                {copiedId === link.id ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    Copiar
                  </>
                )}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onShowQRCode(link.short_url, link.id)}
                className="border-gray-700 text-gray-300 hover:border-abrev-purple hover:text-white transition-all duration-300"
              >
                <QrCode className="mr-1 h-3 w-3" />
                QR Code
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewStats(link.id)}
                className="border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white transition-all duration-300"
              >
                <BarChart3 className="mr-1 h-3 w-3" />
                Estatísticas
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(link.id)}
                disabled={isDeleting}
                className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 transition-all duration-300"
              >
                {isDeleting ? 'Excluindo...' : (
                  <>
                    <Trash className="mr-1 h-3 w-3" />
                    Excluir
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </GlassCard>
    </Transition>
  );
};

export default LinkItem;
