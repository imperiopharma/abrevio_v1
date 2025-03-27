
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plan, PlanFeature } from './types';
import FeatureItem from './FeatureItem';

interface PlanFormProps {
  initialData: Plan;
  onSubmit: (data: Plan) => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ initialData, onSubmit }) => {
  const form = useForm<Plan>({
    defaultValues: initialData
  });

  const addFeature = () => {
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

  const removeFeature = (featureId: string) => {
    const updatedFeatures = form.getValues().features.filter(f => f.id !== featureId);
    form.setValue('features', updatedFeatures);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              onClick={addFeature}
              variant="outline"
              size="sm"
              className="border-gray-700 hover:bg-gray-800"
            >
              <Plus className="mr-1 h-3.5 w-3.5" /> Adicionar Recurso
            </Button>
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {form.watch('features').map((feature, index) => (
              <FeatureItem 
                key={feature.id} 
                feature={feature} 
                index={index} 
                form={form} 
                onRemove={removeFeature} 
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            type="submit" 
            className="bg-abrev-blue hover:bg-abrev-blue/80"
          >
            Salvar Plano
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PlanForm;
