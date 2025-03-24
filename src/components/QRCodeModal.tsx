
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, X } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, url }) => {
  const { toast } = useToast();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen && url) {
      setIsAnimating(true);
      
      // Generate QR code
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#ffffff',
          light: '#00000000'
        }
      })
        .then(dataUrl => {
          setQrCodeDataUrl(dataUrl);
          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
        })
        .catch(err => {
          console.error('Error generating QR code:', err);
          toast({
            title: "Erro ao gerar QR code",
            description: "Tente novamente mais tarde.",
            variant: "destructive",
          });
          onClose();
        });
    }
  }, [isOpen, url, toast, onClose]);

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = 'abrevio-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code baixado com sucesso!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-abrev-dark-accent border-gray-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            QR Code
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full absolute right-4 top-4 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Escaneie este código QR com a câmera do seu celular para acessar o link.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center p-2">
          {qrCodeDataUrl && (
            <div className={`bg-gradient-to-r from-abrev-blue to-abrev-purple p-1 rounded-xl ${isAnimating ? 'animate-rotate-scale' : ''}`}>
              <div className="bg-abrev-dark-accent p-5 rounded-lg flex items-center justify-center">
                <img 
                  src={qrCodeDataUrl} 
                  alt="QR Code" 
                  className="w-64 h-64 max-w-full"
                />
              </div>
            </div>
          )}
          
          <div className="mt-6 w-full">
            <div className="text-gray-300 mb-2 break-all text-sm text-center">
              <span className="font-medium">URL:</span> {url}
            </div>
            
            <Button
              onClick={downloadQRCode}
              className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300 mt-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar QR Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
