
import React from 'react';
import { Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plan, PlanFeature } from './types';
import { getFeatureIcon } from './utils';

interface FeatureItemProps {
  feature: PlanFeature;
  index: number;
  form: UseFormReturn<Plan>;
  onRemove: (featureId: string) => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ feature, index, form, onRemove }) => {
  return (
    <div 
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
          onClick={() => onRemove(feature.id)}
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
  );
};

export default FeatureItem;
