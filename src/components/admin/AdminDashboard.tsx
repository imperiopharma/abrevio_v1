
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Link, ExternalLink } from 'lucide-react';
import { Transition } from '@/components/animations/Transition';

// Dados mockados para o dashboard
const statsData = [
  { 
    title: "Links Criados", 
    value: "2,587", 
    change: "+12.5%", 
    trend: "up",
    description: "Último mês", 
    icon: <Link className="h-4 w-4" />
  },
  { 
    title: "Cliques Totais", 
    value: "42,893", 
    change: "+25.8%", 
    trend: "up",
    description: "Último mês", 
    icon: <ExternalLink className="h-4 w-4" />
  },
  { 
    title: "Usuários Ativos", 
    value: "1,248", 
    change: "+18.2%", 
    trend: "up",
    description: "Último mês", 
    icon: <Users className="h-4 w-4" />
  },
  { 
    title: "Taxa de Conversão", 
    value: "3.6%", 
    change: "+2.1%", 
    trend: "up",
    description: "Último mês", 
    icon: <TrendingUp className="h-4 w-4" />
  }
];

const AdminDashboardContent = () => {
  return (
    <div className="space-y-6">
      <Transition type="fade">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400">Visão geral da plataforma e métricas principais</p>
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                  <div 
                    className={`p-2 rounded-full ${
                      stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="flex items-center">
                  <span 
                    className={`text-xs font-medium mr-1 ${
                      stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-400">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-abrev-dark-accent/40 border-gray-800">
            <CardHeader>
              <CardTitle>Atividade de Cliques</CardTitle>
              <CardDescription>Tendência de cliques nos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />
                  <p>Gráfico de atividades será implementado aqui</p>
                  <p className="text-sm mt-2">
                    Conecte-se à API de estatísticas para visualização de dados em tempo real
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-abrev-dark-accent/40 border-gray-800">
            <CardHeader>
              <CardTitle>Principais Links</CardTitle>
              <CardDescription>Links mais acessados este mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-abrev-blue/20 text-abrev-blue rounded-full h-8 w-8 flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        abrev.io/{index === 0 ? 'promo' : index === 1 ? 'launch' : index === 2 ? 'sale' : index === 3 ? 'blackfriday' : 'newproduct'}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {(4582 - index * 756).toLocaleString()} cliques
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Transition>
    </div>
  );
};

export default AdminDashboardContent;
