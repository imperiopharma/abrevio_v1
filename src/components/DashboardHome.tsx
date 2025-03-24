
import React from 'react';
import { ArrowUpRight, Link, Users, MousePointerClick, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/dashboard/StatsCard';
import DailyClicksChart from '@/components/dashboard/DailyClicksChart';
import DeviceDistributionChart from '@/components/dashboard/DeviceDistributionChart';
import RecentLinksTable from '@/components/dashboard/RecentLinksTable';
import { 
  linkClickData, 
  deviceData, 
  recentLinks, 
  chartConfig 
} from '@/components/dashboard/dashboardData';

const DashboardHome = () => {
  const statsCards = [
    { 
      title: 'Total de Links', 
      value: '342', 
      description: '+7% em relação ao último mês', 
      icon: Link, 
      iconColor: 'text-abrev-blue' 
    },
    { 
      title: 'Total de Cliques', 
      value: '12,856', 
      description: '+14.2% em relação ao último mês', 
      icon: MousePointerClick, 
      iconColor: 'text-abrev-purple' 
    },
    { 
      title: 'QR Codes Gerados', 
      value: '87', 
      description: '+3.2% em relação ao último mês', 
      icon: Globe, 
      iconColor: 'text-green-500' 
    },
    { 
      title: 'Países Alcançados', 
      value: '28', 
      description: '+2 novos países este mês', 
      icon: Users, 
      iconColor: 'text-yellow-500' 
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Visão Geral</h2>
        <Button className="bg-abrev-blue hover:bg-abrev-blue/90">
          Baixar Relatório
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyClicksChart data={linkClickData} chartConfig={chartConfig} />
        <DeviceDistributionChart data={deviceData} chartConfig={chartConfig} />
      </div>

      {/* Recent Links Table Section */}
      <RecentLinksTable links={recentLinks} />
    </div>
  );
};

export default DashboardHome;
