
import React from 'react';
import { Link, QrCode, Database, Globe, Tag } from 'lucide-react';
import { Plan } from './types';

// Ícones para os recursos
export const getFeatureIcon = (featureId: string) => {
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

// Dados mockados para os planos
export const initialPlans: Plan[] = [
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
