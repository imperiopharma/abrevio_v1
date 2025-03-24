
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { Transition } from '@/components/animations/Transition';
import { Copy, QrCode, BarChart3, ExternalLink, Trash, Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { LinkType } from '@/components/links/types';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LinkItemProps {
  link: LinkType;
  index: number;
  onShowQRCode: (url: string) => void;
  onDelete: (id: string) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ link, index, onShowQRCode, onDelete }) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(`https://${text}`);
    setCopiedId(id);
    
    toast({
      title: "Link copiado para a área de transferência",
      description: "Agora você pode compartilhá-lo!",
    });
    
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Transition key={link.id} delay={index * 0.05} type="fade">
      <GlassCard 
        className="border border-gray-800 transition-all duration-300 hover:border-gray-700 overflow-hidden" 
        hover={true}
      >
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium text-abrev-blue break-all">
                {link.shortUrl}
              </h3>
              <div className="bg-abrev-purple/20 text-abrev-purple px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                {link.clicks} clicks
              </div>
            </div>
            <div className="text-gray-400 mt-1 text-sm w-full overflow-hidden">
              <div className="flex items-start">
                <ExternalLink className="w-3 h-3 inline mr-1 shrink-0 mt-1" />
                <a 
                  href={link.originalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300 break-all line-clamp-2"
                  title={link.originalUrl}
                >
                  {link.originalUrl}
                </a>
              </div>
            </div>
          </div>
          
          {isMobile ? (
            // Mobile Action Buttons - More compact layout
            <div className="flex gap-2 items-center flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(link.shortUrl, link.id)}
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
                onClick={() => onShowQRCode(link.shortUrl)}
                className="border-gray-700 text-gray-300 hover:border-abrev-purple hover:text-white transition-all duration-300 min-w-0 px-3"
              >
                <QrCode className="h-3 w-3" />
              </Button>
              
              {/* Stats button within a sheet for mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white transition-all duration-300 min-w-0 px-3"
                  >
                    <BarChart3 className="h-3 w-3" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-abrev-dark-accent border-gray-800 text-white">
                  <div className="py-6">
                    <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
                    <p className="text-gray-400">Estatísticas para: {link.shortUrl}</p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-300">Total de clicks:</span>
                        <span className="font-semibold text-white">{link.clicks}</span>
                      </div>
                      {/* Additional stats would go here in a real implementation */}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(link.id)}
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
                onClick={() => copyToClipboard(link.shortUrl, link.id)}
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
                onClick={() => onShowQRCode(link.shortUrl)}
                className="border-gray-700 text-gray-300 hover:border-abrev-purple hover:text-white transition-all duration-300"
              >
                <QrCode className="mr-1 h-3 w-3" />
                QR Code
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white transition-all duration-300"
              >
                <BarChart3 className="mr-1 h-3 w-3" />
                Estatísticas
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(link.id)}
                className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 transition-all duration-300"
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </GlassCard>
    </Transition>
  );
};

export default LinkItem;
