import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { Transition } from '@/components/animations/Transition';
import QRCodeModal from '@/components/QRCodeModal';
import { Send, Copy, Check, QrCode, Smartphone } from 'lucide-react';

const WhatsAppQR = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [errors, setErrors] = useState<{
    phoneNumber?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { phoneNumber?: string } = {};
    
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Por favor, informe o número de telefone';
    } else if (!/^\+?[0-9\s]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Por favor, informe um número de telefone válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const formattedPhone = phoneNumber.replace(/\D/g, '');
      
      const whatsappLink = `https://wa.me/${formattedPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
      
      setTimeout(() => {
        setGeneratedLink(whatsappLink);
        
        toast({
          title: "Link do WhatsApp gerado com sucesso!",
          description: "Você já pode visualizar o QR code ou copiar o link.",
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro ao gerar link",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      
      toast({
        title: "Link copiado para a área de transferência",
        description: "Agora você pode compartilhá-lo!",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const showQRCode = () => {
    if (generatedLink) {
      setQrCodeModalOpen(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Transition type="slide-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
          <span className="text-gradient-blue">WhatsApp</span> QR Code
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard className="lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-200">
                  Número de Telefone
                </Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+55 11 99999-8888"
                  className={`bg-white/5 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-blue transition-all duration-300`}
                />
                {errors.phoneNumber && (
                  <span className="text-red-400 text-sm">{errors.phoneNumber}</span>
                )}
                <p className="text-gray-400 text-sm">
                  Inclua o código do país, por exemplo: +55 para Brasil
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-200">
                  Mensagem (opcional)
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Olá, gostaria de mais informações sobre..."
                  className="min-h-[100px] bg-white/5 border border-gray-700 text-white focus:border-abrev-blue transition-all duration-300"
                />
                <p className="text-gray-400 text-sm">
                  Esta mensagem será pré-preenchida no chat do WhatsApp
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
              >
                {isSubmitting ? (
                  'Gerando...'
                ) : (
                  <>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Gerar QR Code
                  </>
                )}
              </Button>
            </form>
          </GlassCard>
          
          {generatedLink ? (
            <Transition type="fade" className="lg:order-2">
              <GlassCard className="h-full flex flex-col justify-center items-center bg-gradient-to-r from-abrev-blue/10 to-abrev-purple/10" glowColor="blue">
                <div className="text-center mb-6">
                  <div className="inline-block p-2 bg-white/10 rounded-full mb-4">
                    <QrCode size={40} className="text-abrev-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    QR Code e Link Prontos!
                  </h3>
                  <p className="text-gray-300">
                    Escaneie o QR code ou compartilhe o link gerado.
                  </p>
                </div>
                
                <div className="w-full flex flex-col gap-4">
                  <Button
                    onClick={showQRCode}
                    className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Ver QR Code
                  </Button>
                  
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className={`w-full ${
                      copied 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : 'border-gray-700 text-gray-300 hover:border-abrev-blue hover:text-white'
                    } transition-all duration-300`}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Link
                      </>
                    )}
                  </Button>
                  
                  <a 
                    href={generatedLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-500 transition-all duration-300"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Abrir no WhatsApp
                    </Button>
                  </a>
                </div>
              </GlassCard>
            </Transition>
          ) : (
            <div className="lg:order-2 hidden lg:flex items-center justify-center">
              <GlassCard className="h-full flex flex-col justify-center items-center text-center">
                <div className="inline-block p-3 bg-white/5 rounded-full mb-4">
                  <Smartphone size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-200 mb-1">
                  Gere QR Codes para WhatsApp
                </h3>
                <p className="text-gray-400 max-w-md">
                  Crie um QR code que abre uma conversa no WhatsApp automaticamente quando escaneado.
                  Ideal para cartões de visita, materiais impressos ou compartilhamento digital.
                </p>
              </GlassCard>
            </div>
          )}
        </div>
      </Transition>
      
      <QRCodeModal
        isOpen={qrCodeModalOpen}
        onClose={() => setQrCodeModalOpen(false)}
        url={generatedLink || ''}
      />
    </div>
  );
};

export default WhatsAppQR;
