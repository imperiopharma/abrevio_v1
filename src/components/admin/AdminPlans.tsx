
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transition } from '@/components/animations/Transition';
import { useToast } from '@/hooks/use-toast';
import { Plan } from './plans/types';
import { initialPlans } from './plans/utils';
import PlansTable from './plans/PlansTable';
import PlanFormModal from './plans/PlanFormModal';
import DeletePlanModal from './plans/DeletePlanModal';

const AdminPlans = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeletingPlan, setIsDeletingPlan] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan);
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
    }
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (planId: string) => {
    setIsDeletingPlan(planId);
    setIsDeleteModalOpen(true);
  };

  const handleSavePlan = (data: Plan) => {
    if (plans.find(p => p.id === data.id)) {
      // Atualizando plano existente
      setPlans(plans.map(p => (p.id === data.id ? data : p)));
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
            <PlansTable 
              plans={plans} 
              onEdit={openEditModal} 
              onDelete={openDeleteModal} 
            />
          </CardContent>
        </Card>
      </Transition>

      {/* Modal de Edição/Criação de Plano */}
      <PlanFormModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleSavePlan} 
        editingPlan={editingPlan} 
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeletePlanModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDeletePlan} 
      />
    </div>
  );
};

export default AdminPlans;
