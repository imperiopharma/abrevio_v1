
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Globe, 
  Mail, 
  BellRing, 
  Database, 
  Shield, 
  Palette,
  Smartphone,
  Upload
} from 'lucide-react';
import { Transition } from '@/components/animations/Transition';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

interface GeneralFormValues {
  siteTitle: string;
  siteDescription: string;
  defaultDomain: string;
  contactEmail: string;
  logo: string;
  favicon: string;
  enableNewSignups: boolean;
  requireEmailVerification: boolean;
}

interface BrandingFormValues {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkModeColor: string;
  customCss: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  const generalForm = useForm<GeneralFormValues>({
    defaultValues: {
      siteTitle: "Abrev.io",
      siteDescription: "Plataforma de encurtamento de links e gestão de QR codes",
      defaultDomain: "abrev.io",
      contactEmail: "contato@abrev.io",
      logo: "",
      favicon: "",
      enableNewSignups: true,
      requireEmailVerification: true
    }
  });

  const brandingForm = useForm<BrandingFormValues>({
    defaultValues: {
      primaryColor: "#3A86FF",
      secondaryColor: "#8338EC",
      accentColor: "#FF006E",
      darkModeColor: "#0F172A",
      customCss: "/* Adicione CSS personalizado aqui */\n\n/* Exemplo:\n.custom-button {\n  background: linear-gradient(to right, #3A86FF, #8338EC);\n}\n*/"
    }
  });

  const onGeneralSubmit = (data: GeneralFormValues) => {
    console.log(data);
    toast({
      title: "Configurações salvas",
      description: "As configurações gerais foram atualizadas com sucesso."
    });
  };

  const onBrandingSubmit = (data: BrandingFormValues) => {
    console.log(data);
    toast({
      title: "Branding atualizado",
      description: "As configurações de marca foram atualizadas com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <Transition type="fade">
        <div>
          <h2 className="text-2xl font-bold text-white">Configurações</h2>
          <p className="text-gray-400">Gerencie as configurações e personalizações da plataforma</p>
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.1}>
        <Tabs 
          defaultValue="general" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 bg-abrev-dark-accent/40 border border-gray-800 rounded-lg mb-6">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-abrev-dark data-[state=active]:text-white"
            >
              <Globe className="h-4 w-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger
              value="branding"
              className="data-[state=active]:bg-abrev-dark data-[state=active]:text-white"
            >
              <Palette className="h-4 w-4 mr-2" />
              Marca
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-abrev-dark data-[state=active]:text-white"
            >
              <BellRing className="h-4 w-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="data-[state=active]:bg-abrev-dark data-[state=active]:text-white"
            >
              <Database className="h-4 w-4 mr-2" />
              Integrações
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-abrev-dark data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Segurança
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Gerencie as configurações básicas da sua plataforma de encurtamento de links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <FormField
                          control={generalForm.control}
                          name="siteTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Título do Site</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                              </FormControl>
                              <FormDescription>
                                Nome principal da plataforma
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="siteDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição do Site</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  className="bg-abrev-dark/50 border-gray-700 resize-none"
                                  rows={3}
                                />
                              </FormControl>
                              <FormDescription>
                                Breve descrição da sua plataforma
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="defaultDomain"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Domínio Padrão</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <span className="text-gray-400 mr-2">https://</span>
                                  <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Domínio principal para links encurtados
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email de Contato</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                  <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Email principal para contato e notificações
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-6">
                        <FormField
                          control={generalForm.control}
                          name="logo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Logo</FormLabel>
                              <FormControl>
                                <div className="border border-dashed border-gray-700 rounded-lg p-4 text-center">
                                  <div className="mb-4 mx-auto w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                  </div>
                                  <div className="text-sm text-gray-400 mb-2">
                                    Arraste e solte um arquivo ou
                                  </div>
                                  <Button 
                                    type="button"
                                    variant="outline"
                                    className="border-gray-700 hover:bg-gray-800"
                                  >
                                    Selecionar Arquivo
                                  </Button>
                                </div>
                              </FormControl>
                              <FormDescription>
                                Logo principal da plataforma (SVG ou PNG)
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="enableNewSignups"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Novos cadastros</FormLabel>
                                <FormDescription>
                                  Permitir que novos usuários se cadastrem na plataforma
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="requireEmailVerification"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Verificação de email</FormLabel>
                                <FormDescription>
                                  Exigir verificação de email antes de permitir o acesso
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-abrev-blue hover:bg-abrev-blue/80">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Configurações
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branding">
            <Card className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader>
                <CardTitle>Personalização de Marca</CardTitle>
                <CardDescription>
                  Personalize cores, temas e aparência da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...brandingForm}>
                  <form onSubmit={brandingForm.handleSubmit(onBrandingSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Cores Principais</h3>
                        <div className="space-y-4">
                          <FormField
                            control={brandingForm.control}
                            name="primaryColor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cor Primária</FormLabel>
                                <FormControl>
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-10 h-10 rounded-md border border-gray-700"
                                      style={{ backgroundColor: field.value }}
                                    />
                                    <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Cor principal da interface (botões, links)
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={brandingForm.control}
                            name="secondaryColor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cor Secundária</FormLabel>
                                <FormControl>
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-10 h-10 rounded-md border border-gray-700"
                                      style={{ backgroundColor: field.value }}
                                    />
                                    <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Cor complementar para gradientes e elementos
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={brandingForm.control}
                            name="accentColor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cor de Destaque</FormLabel>
                                <FormControl>
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-10 h-10 rounded-md border border-gray-700"
                                      style={{ backgroundColor: field.value }}
                                    />
                                    <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Cor para elementos de destaque e call-to-actions
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={brandingForm.control}
                            name="darkModeColor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cor de Fundo (Modo Escuro)</FormLabel>
                                <FormControl>
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-10 h-10 rounded-md border border-gray-700"
                                      style={{ backgroundColor: field.value }}
                                    />
                                    <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Cor de fundo para o modo escuro
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personalização Avançada</h3>
                        <div className="space-y-4">
                          <FormField
                            control={brandingForm.control}
                            name="customCss"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CSS Personalizado</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    className="font-mono bg-abrev-dark/50 border-gray-700 min-h-[200px]"
                                    rows={8}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Adicione CSS personalizado para estilizar a plataforma
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <div className="border border-gray-800 rounded-lg p-4">
                            <h4 className="text-sm font-medium mb-2">Visualização</h4>
                            <div className="flex space-x-3 mb-6">
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: brandingForm.watch('primaryColor') }}
                              ></div>
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: brandingForm.watch('secondaryColor') }}
                              ></div>
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: brandingForm.watch('accentColor') }}
                              ></div>
                            </div>
                            <div className="flex space-x-2 mb-4">
                              <Button className="bg-gradient-to-r from-abrev-blue to-abrev-purple">
                                Botão Primário
                              </Button>
                              <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                                Botão Secundário
                              </Button>
                            </div>
                            <div className="flex items-center bg-abrev-dark p-3 rounded-lg">
                              <Smartphone className="h-5 w-5 mr-3 text-abrev-blue" />
                              <span>Visualização em dispositivos móveis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6 bg-gray-800" />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-abrev-blue hover:bg-abrev-blue/80">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Personalização
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Gerencie como e quando as notificações são enviadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <BellRing className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />
                    <h3 className="text-xl font-medium text-white mb-2">Configurações de Notificações</h3>
                    <p className="text-gray-400">
                      Esta seção permitirá configurar emails, notificações push e alertas do sistema.<br />
                      Será implementada em breve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>
                  Conecte sua plataforma com serviços externos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <Database className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />
                    <h3 className="text-xl font-medium text-white mb-2">Configurações de Integrações</h3>
                    <p className="text-gray-400">
                      Esta seção permitirá configurar integrações com Google Analytics, Facebook Pixel,<br />
                      APIs externas e webhooks. Será implementada em breve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Configure opções de segurança e privacidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <Shield className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />
                    <h3 className="text-xl font-medium text-white mb-2">Configurações de Segurança</h3>
                    <p className="text-gray-400">
                      Esta seção permitirá configurar autenticação de dois fatores, políticas de senha,<br />
                      verificação de links maliciosos e outras opções de segurança. Será implementada em breve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Transition>
    </div>
  );
};

export default AdminSettings;
