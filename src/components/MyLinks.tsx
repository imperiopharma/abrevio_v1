import React, { useState, useEffect } from 'react';
import { Transition } from '@/components/animations/Transition';
import { useToast } from '@/hooks/use-toast';
import QRCodeModal from '@/components/QRCodeModal';
import { LinkType } from '@/components/links/types';
import SearchBar from '@/components/links/SearchBar';
import LinkItem from '@/components/links/LinkItem';
import EmptyState from '@/components/links/EmptyState';
import { fetchUserLinks } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import LinkStatsModal from '@/components/links/LinkStatsModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const MyLinks = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [qrCodeLink, setQrCodeLink] = useState<string | null>(null);
  const [qrCodeLinkId, setQrCodeLinkId] = useState<string | null>(null);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserLinks();
    } else {
      setLinks([]);
      setIsLoading(false);
    }
  }, [user]);

  const loadUserLinks = async () => {
    setIsLoading(true);
    try {
      const userLinks = await fetchUserLinks();
      const typedLinks: LinkType[] = userLinks.map(link => ({
        id: link.id || '',
        user_id: link.user_id || '',
        short_url: link.short_url,
        original_url: link.original_url,
        slug: link.slug,
        title: link.title,
        clicks: 0,
        is_active: link.is_active ?? true,
        expires_at: link.expires_at,
        created_at: link.created_at || new Date().toISOString(),
        tags: link.tags
      }));
      setLinks(typedLinks);
    } catch (error) {
      console.error("Erro ao carregar links:", error);
      toast({
        title: "Erro ao carregar links",
        description: "Não foi possível carregar seus links. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLinks = links.filter(
    link => 
      link.short_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.original_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.title && link.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const showQRCode = (url: string, linkId: string) => {
    setQrCodeLink(`https://${url}`);
    setQrCodeLinkId(linkId);
    setQrCodeModalOpen(true);
  };

  const showStats = (id: string) => {
    setSelectedLinkId(id);
    setStatsModalOpen(true);
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  if (!user) {
    return (
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
        <Transition type="slide-up">
          <div className="flex flex-col items-center justify-center py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Faça login para ver seus links
            </h2>
            <p className="text-gray-400 mb-6 text-center">
              Você precisa estar logado para ver e gerenciar seus links encurtados.
            </p>
            <Button asChild className="bg-abrev-blue hover:bg-abrev-blue/80">
              <Link to="/login">Fazer login</Link>
            </Button>
          </div>
        </Transition>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <Transition type="slide-up">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-gradient-blue">Meus</span> Links
          </h2>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Pesquisar links..."
              className="w-full"
            />
            
            <Button asChild className="shrink-0 bg-abrev-blue hover:bg-abrev-blue/80">
              <Link to="/link/new">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Novo Link</span>
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4 pb-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full bg-gray-800/50 rounded-lg" />
            ))}
          </div>
        ) : filteredLinks.length === 0 ? (
          <EmptyState 
            searchTerm={searchTerm}
            onClear={() => setSearchTerm('')}
          />
        ) : (
          <div className="space-y-4 pb-6">
            {filteredLinks.map((link, index) => (
              <LinkItem
                key={link.id}
                link={link}
                index={index}
                onShowQRCode={showQRCode}
                onDelete={deleteLink}
                onViewStats={showStats}
              />
            ))}
          </div>
        )}
      </Transition>
      
      <QRCodeModal
        isOpen={qrCodeModalOpen}
        onClose={() => setQrCodeModalOpen(false)}
        url={qrCodeLink || ''}
        linkId={qrCodeLinkId || undefined}
      />
      
      {selectedLinkId && (
        <LinkStatsModal 
          isOpen={statsModalOpen}
          onClose={() => setStatsModalOpen(false)}
          linkId={selectedLinkId}
        />
      )}
    </div>
  );
};

export default MyLinks;
