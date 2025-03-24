
import React, { useState } from 'react';
import { Transition } from '@/components/animations/Transition';
import { useToast } from '@/hooks/use-toast';
import QRCodeModal from '@/components/QRCodeModal';
import { demoLinks } from '@/components/links/linksData';
import SearchBar from '@/components/links/SearchBar';
import LinkItem from '@/components/links/LinkItem';
import EmptyState from '@/components/links/EmptyState';

const MyLinks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [qrCodeLink, setQrCodeLink] = useState<string | null>(null);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);

  // Filter links based on search term
  const filteredLinks = demoLinks.filter(
    link => 
      link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {filteredLinks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {filteredLinks.map((link, index) => (
              <LinkItem
                key={link.id}
                link={link}
                index={index}
                onShowQRCode={showQRCode}
                onDelete={deleteLink}
              />
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
