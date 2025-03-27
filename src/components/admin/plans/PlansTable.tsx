
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plan } from './types';

interface PlansTableProps {
  plans: Plan[];
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}

const PlansTable: React.FC<PlansTableProps> = ({ plans, onEdit, onDelete }) => {
  return (
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
                  onClick={() => onEdit(plan)}
                  className="h-8 border-gray-700 hover:bg-gray-800"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(plan.id)}
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
  );
};

export default PlansTable;
