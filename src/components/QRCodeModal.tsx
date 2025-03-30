
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, X, QrCode, Check, RefreshCw } from 'lucide-react';
import { QRCodeConfig, saveQRCodeConfig, fetchQRCodeConfig } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  linkId?: string;
  title?: string;
  description?: string;
  downloadFilename?: string;
  downloadSuccessMessage?: string;
  errorMessage?: string;
  animationDuration?: number;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  isOpen, 
  onClose, 
  url,
  linkId,
  title = "QR Code",
  description = "Escaneie este código QR com a câmera do seu celular para acessar o link.",
  downloadFilename = "abrevio-qrcode.png",
  downloadSuccessMessage = "QR Code baixado com sucesso!",
  errorMessage = "Erro ao gerar QR code. Tente novamente mais tarde.",
  animationDuration = 500
}) => {
  const { toast } = useToast();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  
  // QR Code customization options
  const [color, setColor] = useState('#ffffff');
  const [background, setBackground] = useState('#00000000');
  const [margin, setMargin] = useState(2);
  const [size, setSize] = useState(320);
  const [showColorPicker, setShowColorPicker] = useState<'color' | 'background' | null>(null);

  // Default QR Code options
  const getQRCodeOptions = () => ({
    width: size,
    margin: margin,
    color: {
      dark: color,
      light: background
    }
  });

  useEffect(() => {
    if (isOpen && url) {
      setIsAnimating(true);
      
      // Load saved QR Code configuration if linkId is provided
      if (linkId) {
        loadQRCodeConfig(linkId);
      }
      
      // Generate QR code
      generateQRCode();
    }
  }, [isOpen, url, linkId, color, background, margin, size]);

  const loadQRCodeConfig = async (linkId: string) => {
    try {
      setIsLoading(true);
      const config = await fetchQRCodeConfig(linkId);
      
      if (config) {
        setColor(config.color || '#ffffff');
        setBackground(config.background || '#00000000');
        setMargin(config.margin || 2);
        setSize(config.size || 320);
      }
    } catch (error) {
      console.error("Erro ao carregar configuração do QR Code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateQRCode = () => {
    QRCode.toDataURL(url, getQRCodeOptions())
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
  };

  const saveQRCodeSettings = async () => {
    if (!linkId) return;
    
    try {
      setIsSaving(true);
      
      const config: QRCodeConfig = {
        link_id: linkId,
        color,
        background,
        margin,
        size
      };
      
      const result = await saveQRCodeConfig(config);
      
      if (result) {
        toast({
          title: "Configurações salvas",
          description: "Suas configurações de QR Code foram salvas com sucesso.",
        });
      } else {
        toast({
          title: "Erro ao salvar configurações",
          description: "Não foi possível salvar suas configurações.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast({
        title: "Erro ao salvar configurações",
        description: "Ocorreu um erro ao salvar suas configurações.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
      <DialogContent className="bg-abrev-dark-accent border-gray-800 text-white sm:max-w-md max-w-[90%] w-[400px] mx-auto">
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
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 bg-abrev-dark/50 mb-4">
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
            <TabsTrigger value="customize" disabled={!linkId}>Personalizar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-0">
            <QRCodeDisplay 
              qrCodeDataUrl={qrCodeDataUrl} 
              isAnimating={isAnimating} 
              url={url}
              isLoading={isLoading}
            />
            
            <div className="mt-4 w-full">
              <div className="text-gray-300 mb-2 break-all text-xs sm:text-sm text-center px-2">
                <span className="font-medium">URL:</span> {url}
              </div>
            </div>
            
            <div className="mt-4">
              <Button
                onClick={downloadQRCode}
                className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar QR Code
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="customize" className="mt-0 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                {qrCodeDataUrl && (
                  <img 
                    src={qrCodeDataUrl} 
                    alt="QR Code" 
                    className="w-[150px] h-[150px]"
                  />
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Cor do QR Code</Label>
                <div className="flex gap-2">
                  <Popover 
                    open={showColorPicker === 'color'} 
                    onOpenChange={(open) => setShowColorPicker(open ? 'color' : null)}
                  >
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 w-10 p-0 border-gray-700"
                        style={{ background: color }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3 bg-abrev-dark-accent border-gray-700">
                      <HexColorPicker color={color} onChange={setColor} />
                    </PopoverContent>
                  </Popover>
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="bg-white/5 border border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Cor de fundo</Label>
                <div className="flex gap-2">
                  <Popover 
                    open={showColorPicker === 'background'} 
                    onOpenChange={(open) => setShowColorPicker(open ? 'background' : null)}
                  >
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 w-10 p-0 border-gray-700"
                        style={{ 
                          background: background === '#00000000' ? 'transparent' : background,
                          backgroundImage: background === '#00000000' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                          backgroundSize: '8px 8px',
                          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                        }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3 bg-abrev-dark-accent border-gray-700">
                      <HexColorPicker color={background === '#00000000' ? '#ffffff' : background} onChange={setBackground} />
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 border-gray-700 text-xs"
                        onClick={() => setBackground('#00000000')}
                      >
                        Transparente
                      </Button>
                    </PopoverContent>
                  </Popover>
                  <Input
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="bg-white/5 border border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Margem</Label>
                  <span className="text-sm text-gray-400">{margin}</span>
                </div>
                <Slider
                  value={[margin]}
                  min={0}
                  max={10}
                  step={1}
                  onValueChange={(values) => setMargin(values[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Tamanho</Label>
                  <span className="text-sm text-gray-400">{size}px</span>
                </div>
                <Slider
                  value={[size]}
                  min={200}
                  max={1000}
                  step={10}
                  onValueChange={(values) => setSize(values[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700"
                  onClick={generateQRCode}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </Button>
                
                <Button
                  className="flex-1 bg-gradient-to-r from-abrev-blue to-abrev-purple"
                  onClick={saveQRCodeSettings}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    'Salvando...'
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Salvar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

interface QRCodeDisplayProps {
  qrCodeDataUrl: string;
  isAnimating: boolean;
  url: string;
  isLoading: boolean;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  qrCodeDataUrl, 
  isAnimating,
  url,
  isLoading
}) => {
  if (!qrCodeDataUrl && isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-abrev-blue border-gray-800"></div>
      </div>
    );
  }
  
  if (!qrCodeDataUrl) return null;
  
  return (
    <div className="flex flex-col items-center p-2">
      <div className={`bg-gradient-to-r from-abrev-blue to-abrev-purple p-1 rounded-xl ${isAnimating ? 'animate-rotate-scale' : ''}`}>
        <div className="bg-abrev-dark-accent p-3 sm:p-5 rounded-lg flex items-center justify-center">
          <img 
            src={qrCodeDataUrl} 
            alt="QR Code" 
            className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
