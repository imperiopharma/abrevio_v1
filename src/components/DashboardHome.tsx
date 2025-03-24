
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
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardHome = () => {
  const isMobile = useIsMobile();
  
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
    <div className="space-y-4 md:space-y-8 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-3xl font-bold tracking-tight text-white">Visão Geral</h2>
        {!isMobile && (
          <Button className="bg-abrev-blue hover:bg-abrev-blue/90 text-xs md:text-sm">
            Baixar Relatório
            <ArrowUpRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
          </Button>
        )}
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <DailyClicksChart data={linkClickData} chartConfig={chartConfig} />
        <DeviceDistributionChart data={deviceData} chartConfig={chartConfig} />
      </div>

      {/* Recent Links Table Section */}
      <RecentLinksTable links={recentLinks} />
      
      {/* Mobile-only download report button */}
      {isMobile && (
        <div className="flex justify-center mt-4">
          <Button className="bg-abrev-blue hover:bg-abrev-blue/90 text-xs w-full">
            Baixar Relatório
            <ArrowUpRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
