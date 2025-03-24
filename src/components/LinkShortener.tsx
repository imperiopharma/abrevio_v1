
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { Transition } from '@/components/animations/Transition';
import { Copy, Check, Link2 } from 'lucide-react';

const LinkShortener = () => {
  const { toast } = useToast();
  const [originalUrl, setOriginalUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shortenedLink, setShortenedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{
    originalUrl?: string;
    slug?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { originalUrl?: string; slug?: string } = {};
    
    // Validate URL
    if (!originalUrl) {
      newErrors.originalUrl = 'Por favor, informe a URL original';
    } else {
      try {
        new URL(originalUrl);
      } catch (e) {
        newErrors.originalUrl = 'Por favor, informe uma URL válida';
      }
    }
    
    // Optional slug validation
    if (slug && !/^[a-zA-Z0-9-_]+$/.test(slug)) {
      newErrors.slug = 'Apelido deve conter apenas letras, números, hífens e sublinhados';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // TODO: Implement the actual link shortening logic with Supabase
      // For now, simulate a success response
      setTimeout(() => {
        const generatedSlug = slug || Math.random().toString(36).substring(2, 8);
        const shortenedUrl = `https://abrev.io/${generatedSlug}`;
        setShortenedLink(shortenedUrl);
        
        toast({
          title: "Link encurtado com sucesso!",
          description: "Seu link está pronto para compartilhar.",
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro ao encurtar link",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (shortenedLink) {
      navigator.clipboard.writeText(shortenedLink);
      setCopied(true);
      
      toast({
        title: "Link copiado para a área de transferência",
        description: "Agora você pode compartilhá-lo!",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Transition type="slide-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
          <span className="text-gradient-blue">Encurtar</span> um novo link
        </h2>

        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="originalUrl" className="text-gray-200">URL Original</Label>
              <Input
                id="originalUrl"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://exemplo.com/minha-pagina-com-url-muito-longa-que-precisa-ser-encurtada"
                className={`bg-white/5 border ${errors.originalUrl ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-blue transition-all duration-300`}
              />
              {errors.originalUrl && (
                <span className="text-red-400 text-sm">{errors.originalUrl}</span>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-gray-200">
                Apelido (opcional)
              </Label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">abrev.io/</span>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="meu-link"
                  className={`bg-white/5 border ${errors.slug ? 'border-red-500' : 'border-gray-700'} text-white focus:border-abrev-blue transition-all duration-300`}
                />
              </div>
              {errors.slug && (
                <span className="text-red-400 text-sm">{errors.slug}</span>
              )}
              <p className="text-gray-400 text-sm">
                Deixe em branco para gerar um apelido aleatório.
              </p>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20 transition-all duration-300"
            >
              {isSubmitting ? (
                'Encurtando...'
              ) : (
                <>
                  <Link2 className="mr-2 h-4 w-4" />
                  Encurtar URL
                </>
              )}
            </Button>
          </form>
        </GlassCard>
      </Transition>
      
      {/* Result card */}
      {shortenedLink && (
        <Transition type="slide-up" delay={0.2} className="mt-8">
          <GlassCard className="bg-gradient-to-r from-abrev-blue/10 to-abrev-purple/10" glowColor="blue">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Seu link encurtado:</h3>
                <a 
                  href={shortenedLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-abrev-blue hover:underline text-lg md:text-xl break-all"
                >
                  {shortenedLink}
                </a>
              </div>
              
              <Button
                onClick={copyToClipboard}
                className={`min-w-[120px] ${
                  copied 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gradient-to-r from-abrev-blue to-abrev-purple hover:shadow-lg hover:shadow-abrev-blue/20'
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
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </GlassCard>
        </Transition>
      )}
    </div>
  );
};

export default LinkShortener;
