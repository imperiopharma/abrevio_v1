
import React, { useState } from 'react';
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Tag, 
  Link, 
  QrCode, 
  Database, 
  Globe
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Transition } from '@/components/animations/Transition';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

// Tipo para os planos
interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  limit?: number;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  isRecommended: boolean;
  isPopular: boolean;
  features: PlanFeature[];
  color: string;
}

// Dados mockados para os planos
const initialPlans: Plan[] = [
  {
    id: "basic",
    name: "Básico",
    description: "Ideal para uso pessoal",
    price: 0,
    isRecommended: false,
    isPopular: false,
    color: "#3A86FF",
    features: [
      { id: "links", name: "Links encurtados", description: "Número de links que podem ser criados", included: true, limit: 50 },
      { id: "qrcodes", name: "QR Codes", description: "Geração de QR Codes", included: true, limit: 25 },
      { id: "analytics", name: "Estatísticas básicas", description: "Visualização de cliques", included: true },
      { id: "biopage", name: "Página de bio", description: "Página personalizada", included: true, limit: 1 },
      { id: "custom_domain", name: "Domínio personalizado", description: "Usar seu próprio domínio", included: false },
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "Perfeito para criadores de conteúdo",
    price: 29,
    isRecommended: true,
    isPopular: true,
    color: "#FB5607",
    features: [
      { id: "links", name: "Links encurtados", description: "Número de links que podem ser criados", included: true, limit: 500 },
      { id: "qrcodes", name: "QR Codes", description: "Geração de QR Codes customizados", included: true, limit: 250 },
      { id: "analytics", name: "Estatísticas avançadas", description: "Analytics detalhado", included: true },
      { id: "biopage", name: "Páginas de bio", description: "Páginas personalizadas", included: true, limit: 5 },
      { id: "custom_domain", name: "Domínio personalizado", description: "Usar seu próprio domínio", included: true, limit: 1 },
    ]
  },
  {
    id: "business",
    name: "Empresas",
    description: "Para times e negócios",
    price: 89,
    isRecommended: false,
    isPopular: false,
    color: "#8338EC",
    features: [
      { id: "links", name: "Links encurtados", description: "Número de links que podem ser criados", included: true, limit: -1 },
      { id: "qrcodes", name: "QR Codes", description: "Geração de QR Codes de marca", included: true, limit: -1 },
      { id: "analytics", name: "Estatísticas completas", description: "Analytics detalhado com exportação", included: true },
      { id: "biopage", name: "Páginas de bio", description: "Páginas personalizadas", included: true, limit: -1 },
      { id: "custom_domain", name: "Domínios personalizados", description: "Usar seus próprios domínios", included: true, limit: 5 },
      { id: "team", name: "Usuários da equipe", description: "Número de contas de usuários", included: true, limit: 10 },
    ]
  }
];

// Ícones para os recursos
const getFeatureIcon = (featureId: string) => {
  switch (featureId) {
    case 'links':
      return <Link className="h-4 w-4" />;
    case 'qrcodes':
      return <QrCode className="h-4 w-4" />;
    case 'analytics':
      return <Database className="h-4 w-4" />;
    case 'biopage':
      return <Globe className="h-4 w-4" />;
    case 'custom_domain':
      return <Globe className="h-4 w-4" />;
    case 'team':
      return <Globe className="h-4 w-4" />;
    default:
      return <Tag className="h-4 w-4" />;
  }
};

const AdminPlans = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeletingPlan, setIsDeletingPlan] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const form = useForm<Plan>({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      price: 0,
      isRecommended: false,
      isPopular: false,
      color: "#3A86FF",
      features: []
    }
  });

  const openEditModal = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan);
      form.reset(plan);
    } else {
      // Criando um novo plano
      const newPlan: Plan = {
        id: `plan_${Date.now()}`,
        name: "Novo Plano",
        description: "Descrição do plano",
        price: 0,
        isRecommended: false,
        isPopular: false,
        color: "#3A86FF",
        features: [
          { id: "links", name: "Links encurtados", description: "Número de links que podem ser criados", included: true, limit: 100 },
          { id: "qrcodes", name: "QR Codes", description: "Geração de QR Codes", included: true, limit: 50 },
        ]
      };
      setEditingPlan(newPlan);
      form.reset(newPlan);
    }
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (planId: string) => {
    setIsDeletingPlan(planId);
    setIsDeleteModalOpen(true);
  };

  const handleSavePlan = (data: Plan) => {
    if (editingPlan) {
      if (plans.find(p => p.id === editingPlan.id)) {
        // Atualizando plano existente
        setPlans(plans.map(p => (p.id === editingPlan.id ? data : p)));
        toast({
          title: "Plano atualizado",
          description: `O plano ${data.name} foi atualizado com sucesso.`,
        });
      } else {
        // Adicionando novo plano
        setPlans([...plans, data]);
        toast({
          title: "Plano criado",
          description: `O plano ${data.name} foi criado com sucesso.`,
        });
      }
    }
    setIsEditModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = () => {
    if (isDeletingPlan) {
      const planToDelete = plans.find(p => p.id === isDeletingPlan);
      setPlans(plans.filter(p => p.id !== isDeletingPlan));
      setIsDeleteModalOpen(false);
      setIsDeletingPlan(null);
      
      toast({
        title: "Plano excluído",
        description: `O plano ${planToDelete?.name || ""} foi excluído com sucesso.`,
      });
    }
  };

  const addFeatureToCurrentPlan = () => {
    const newFeature: PlanFeature = {
      id: `feature_${Date.now()}`,
      name: "Novo Recurso",
      description: "Descrição do recurso",
      included: true,
      limit: 1
    };
    
    const updatedFeatures = [...form.getValues().features, newFeature];
    form.setValue('features', updatedFeatures);
  };

  const removeFeatureFromCurrentPlan = (featureId: string) => {
    const updatedFeatures = form.getValues().features.filter(f => f.id !== featureId);
    form.setValue('features', updatedFeatures);
  };

  return (
    <div className="space-y-6">
      <Transition type="fade">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Gestão de Planos</h2>
            <p className="text-gray-400">Gerencie os planos e preços disponíveis na plataforma</p>
          </div>
          <Button 
            onClick={() => openEditModal()} 
            className="bg-abrev-blue hover:bg-abrev-blue/80"
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Plano
          </Button>
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.1}>
        <Card className="bg-abrev-dark-accent/40 border-gray-800">
          <CardHeader>
            <CardTitle>Planos Ativos</CardTitle>
            <CardDescription>Gerencie os planos disponíveis para seus usuários</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-gray-800">
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead>Recursos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id} className="hover:bg-abrev-dark-accent/60 border-gray-800">
                    <TableCell>
                      <div className="font-medium text-white">{plan.name}</div>
                      <div className="text-gray-400 text-xs">{plan.description}</div>
                    </TableCell>
                    <TableCell>
                      {plan.price === 0 ? (
                        <span className="text-green-400">Grátis</span>
                      ) : (
                        <span>R$ {plan.price.toFixed(2)}/mês</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {plan.isRecommended && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-abrev-blue/20 text-abrev-blue">
                            Recomendado
                          </span>
                        )}
                        {plan.isPopular && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-500">
                            Popular
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.filter(f => f.included).length} ativos
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(plan)}
                          className="h-8 border-gray-700 hover:bg-gray-800"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDeleteModal(plan.id)}
                          className="h-8 border-gray-700 hover:bg-red-950 text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Transition>

      {/* Modal de Edição/Criação de Plano */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-abrev-dark-accent border-gray-800">
          <DialogHeader>
            <DialogTitle>{editingPlan && plans.find(p => p.id === editingPlan.id) ? 'Editar' : 'Criar'} Plano</DialogTitle>
            <DialogDescription>
              Configure os detalhes e recursos do plano abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSavePlan)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Plano</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          {...field} 
                          value={field.value}
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          className="bg-abrev-dark/50 border-gray-700" 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor do Plano</FormLabel>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded-md border border-gray-700"
                          style={{ backgroundColor: field.value }}
                        />
                        <FormControl>
                          <Input {...field} className="bg-abrev-dark/50 border-gray-700" />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isRecommended"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Recomendado</FormLabel>
                        <FormDescription className="text-xs">
                          Destaque como plano recomendado
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
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Popular</FormLabel>
                        <FormDescription className="text-xs">
                          Marcar como plano popular
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
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Recursos do Plano</h3>
                  <Button 
                    type="button" 
                    onClick={addFeatureToCurrentPlan}
                    variant="outline"
                    size="sm"
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Adicionar Recurso
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {form.watch('features').map((feature, index) => (
                    <div 
                      key={feature.id}
                      className="grid grid-cols-12 gap-2 p-3 rounded-lg border border-gray-800 bg-abrev-dark/30"
                    >
                      <div className="col-span-5">
                        <FormField
                          control={form.control}
                          name={`features.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Nome</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  {getFeatureIcon(feature.id)}
                                  <Input {...field} className="bg-abrev-dark/50 border-gray-700 h-8" />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name={`features.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Descrição</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-abrev-dark/50 border-gray-700 h-8" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`features.${index}.limit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Limite</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="-1"
                                  step="1"
                                  placeholder="-1 = ilimitado"
                                  {...field}
                                  value={field.value === undefined ? '' : field.value}
                                  onChange={e => {
                                    const value = e.target.value === '' ? undefined : parseInt(e.target.value);
                                    field.onChange(value);
                                  }}
                                  className="bg-abrev-dark/50 border-gray-700 h-8"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-1 flex items-end justify-center pb-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeatureFromCurrentPlan(feature.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="col-span-12 flex items-center gap-2 mt-1">
                        <FormField
                          control={form.control}
                          name={`features.${index}.included`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-xs font-normal">
                                {field.value ? 'Incluído no plano' : 'Não incluído no plano'}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-abrev-blue hover:bg-abrev-blue/80">
                  Salvar Plano
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-abrev-dark-accent border-gray-800">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDeletePlan} 
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPlans;
