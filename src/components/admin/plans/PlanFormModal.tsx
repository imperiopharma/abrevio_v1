
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PlanForm from './PlanForm';
import { Plan } from './types';

interface PlanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Plan) => void;
  editingPlan: Plan | null;
}

const PlanFormModal: React.FC<PlanFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingPlan 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-abrev-dark-accent border-gray-800">
        <DialogHeader>
          <DialogTitle>{editingPlan?.id ? 'Editar' : 'Criar'} Plano</DialogTitle>
          <DialogDescription>
            Configure os detalhes e recursos do plano abaixo.
          </DialogDescription>
        </DialogHeader>
        
        {editingPlan && (
          <PlanForm 
            initialData={editingPlan} 
            onSubmit={onSave} 
          />
        )}
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="border-gray-700 hover:bg-gray-800"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanFormModal;
