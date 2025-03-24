
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { Transition } from '@/components/animations/Transition';
import { useToast } from '@/hooks/use-toast';
import QRCodeModal from '@/components/QRCodeModal';
import { Copy, QrCode, BarChart3, ExternalLink, Trash, Check, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Temporary sample data for demonstration
const demoLinks = [
  {
    id: '1',
    shortUrl: 'abrev.io/blog',
    originalUrl: 'https://exemplo.com/blog/como-usar-encurtador-de-urls-para-melhorar-suas-campanhas',
    clicks: 245,
    dateCreated: '2023-10-15'
  },
  {
    id: '2',
    shortUrl: 'abrev.io/promo',
    originalUrl: 'https://exemplo.com/promocao/desconto-especial-para-novos-clientes',
    clicks: 897,
    dateCreated: '2023-10-12'
  },
  {
    id: '3',
    shortUrl: 'abrev.io/ebook',
    originalUrl: 'https://exemplo.com/downloads/ebook-estrategias-marketing-digital-2023',
    clicks: 136,
    dateCreated: '2023-10-05'
  },
  {
    id: '4',
    shortUrl: 'abrev.io/evento',
    originalUrl: 'https://exemplo.com/eventos/conferencia-tecnologia-2023-inscricao',
    clicks: 412,
    dateCreated: '2023-09-28'
  },
  {
    id: '5',
    shortUrl: 'abrev.io/contato',
    originalUrl: 'https://exemplo.com/sobre/fale-conosco',
    clicks: 89,
    dateCreated: '2023-09-15'
  }
];

type LinkType = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  dateCreated: string;
};

const MyLinks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrCodeLink, setQrCodeLink] = useState<string | null>(null);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Filter links based on search term
  const filteredLinks = demoLinks.filter(
    link => 
      link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(`https://${text}`);
    setCopiedId(id);
    
    toast({
      title: "Link copiado para a área de transferência",
      description: "Agora você pode compartilhá-lo!",
    });
    
    setTimeout(() => setCopiedId(null), 2000);
  };

  const showQRCode = (url: string) => {
    setQrCodeLink(`https://${url}`);
    setQrCodeModalOpen(true);
  };

  const deleteLink = (id: string) => {
    // TODO: Implement deletion with Supabase
    toast({
      title: "Link excluído com sucesso",
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <Transition type="slide-up">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-gradient-blue">Meus</span> Links
          </h2>
          
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 pl-10 pr-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white focus:border-abrev-blue focus:ring-0 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {filteredLinks.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-gray-400">Nenhum link encontrado com o termo pesquisado.</p>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {filteredLinks.map((link, index) => (
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
                        <div className="bg-abrev-purple/20 text-abrev-purple px-2 py-0.5 rounded-full text-xs">
                          {link.clicks} clicks
                        </div>
                      </div>
                      <p className="text-gray-400 mt-1 text-sm truncate max-w-full">
                        <ExternalLink className="w-3 h-3 inline mr-1" />
                        <a 
                          href={link.originalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors duration-300"
                        >
                          {link.originalUrl}
                        </a>
                      </p>
                    </div>
                    
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
                        onClick={() => showQRCode(link.shortUrl)}
                        className="border-gray-700 text-gray-300 hover:border-abrev-purple hover:text-white transition-all duration-300"
                      >
                        <QrCode className="mr-1 h-3 w-3" />
                        QR Code
                      </Button>
                      
                      {!isMobile && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white transition-all duration-300"
                        >
                          <BarChart3 className="mr-1 h-3 w-3" />
                          Estatísticas
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteLink(link.id)}
                        className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 transition-all duration-300"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </Transition>
            ))}
          </div>
        )}
      </Transition>
      
      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={qrCodeModalOpen}
        onClose={() => setQrCodeModalOpen(false)}
        url={qrCodeLink || ''}
      />
    </div>
  );
};

export default MyLinks;
