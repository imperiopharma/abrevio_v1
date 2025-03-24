
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, X, QrCode } from 'lucide-react';

export interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  description?: string;
  downloadFilename?: string;
  downloadSuccessMessage?: string;
  errorMessage?: string;
  qrCodeOptions?: QRCodeOptions;
  animationDuration?: number;
}

interface QRCodeOptions {
  width?: number;
  margin?: number;
  dark?: string;
  light?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  isOpen, 
  onClose, 
  url,
  title = "QR Code",
  description = "Escaneie este código QR com a câmera do seu celular para acessar o link.",
  downloadFilename = "abrevio-qrcode.png",
  downloadSuccessMessage = "QR Code baixado com sucesso!",
  errorMessage = "Erro ao gerar QR code. Tente novamente mais tarde.",
  qrCodeOptions = {},
  animationDuration = 500
}) => {
  const { toast } = useToast();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  const defaultQRCodeOptions = {
    width: 320,
    margin: 2,
    color: {
      dark: '#ffffff',
      light: '#00000000'
    },
    ...qrCodeOptions
  };

  useEffect(() => {
    if (isOpen && url) {
      setIsAnimating(true);
      
      // Generate QR code
      QRCode.toDataURL(url, defaultQRCodeOptions)
        .then(dataUrl => {
          setQrCodeDataUrl(dataUrl);
          setTimeout(() => {
            setIsAnimating(false);
          }, animationDuration);
        })
        .catch(err => {
          console.error('Error generating QR code:', err);
          toast({
            title: errorMessage,
            variant: "destructive",
          });
          onClose();
        });
    }
  }, [isOpen, url, toast, onClose, errorMessage, animationDuration, defaultQRCodeOptions]);

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: downloadSuccessMessage,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-abrev-dark-accent border-gray-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            {title}
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
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <QRCodeDisplay 
          qrCodeDataUrl={qrCodeDataUrl} 
          isAnimating={isAnimating} 
          url={url}
        />
        
        <QRCodeActions 
          url={url} 
          onDownload={downloadQRCode} 
        />
      </DialogContent>
    </Dialog>
  );
};

interface QRCodeDisplayProps {
  qrCodeDataUrl: string;
  isAnimating: boolean;
  url: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  qrCodeDataUrl, 
  isAnimating,
  url
}) => {
  if (!qrCodeDataUrl) return null;
  
  return (
    <div className="flex flex-col items-center p-2">
      <div className={`bg-gradient-to-r from-abrev-blue to-abrev-purple p-1 rounded-xl ${isAnimating ? 'animate-rotate-scale' : ''}`}>
        <div className="bg-abrev-dark-accent p-5 rounded-lg flex items-center justify-center">
          <img 
            src={qrCodeDataUrl} 
            alt="QR Code" 
            className="w-64 h-64 max-w-full"
          />
        </div>
      </div>
      
      <div className="mt-4 w-full">
        <div className="text-gray-300 mb-2 break-all text-sm text-center">
          <span className="font-medium">URL:</span> {url}
        </div>
      </div>
    </div>
  );
};

interface QRCodeActionsProps {
  url: string;
  onDownload: () => void;
}

const QRCodeActions: React.FC<QRCodeActionsProps> = ({ 
  url, 
  onDownload 
}) => {
  return (
    <div className="px-2 pb-2">
      <Button
        onClick={onDownload}
        className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
      >
        <Download className="mr-2 h-4 w-4" />
        Baixar QR Code
      </Button>
    </div>
  );
};

export default QRCodeModal;
