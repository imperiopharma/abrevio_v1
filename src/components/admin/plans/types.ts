
// Definição dos tipos para os planos
export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  limit?: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  isRecommended: boolean;
  isPopular: boolean;
  features: PlanFeature[];
  color: string;
}
