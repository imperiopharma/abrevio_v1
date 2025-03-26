
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  ChevronDown,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Transition } from '@/components/animations/Transition';

// Componente simulado de gráficos
const ChartPlaceholder = ({ type, height = 'h-80' }: { type: string; height?: string }) => {
  const getIcon = () => {
    switch (type) {
      case 'area':
        return <AreaChart className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />;
      case 'pie':
        return <PieChart className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />;
      default:
        return <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />;
    }
  };

  return (
    <div className={`${height} flex items-center justify-center`}>
      <div className="text-center text-gray-400">
        {getIcon()}
        <p>Gráfico {type} será implementado aqui</p>
        <p className="text-sm mt-2">
          Conecte-se à API de estatísticas para visualização de dados em tempo real
        </p>
      </div>
    </div>
  );
};

const AdminStats = () => {
  const [dateRange, setDateRange] = useState('last-30-days');

  const dateRangeLabel = {
    'today': 'Hoje',
    'yesterday': 'Ontem',
    'last-7-days': 'Últimos 7 dias',
    'last-30-days': 'Últimos 30 dias',
    'this-month': 'Este mês',
    'last-month': 'Mês passado',
    'this-year': 'Este ano',
  }[dateRange];

  return (
    <div className="space-y-6">
      <Transition type="fade">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Estatísticas</h2>
            <p className="text-gray-400">Análise de desempenho e métricas da plataforma</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRangeLabel}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-abrev-dark-accent border-gray-700">
                <DropdownMenuItem 
                  onClick={() => setDateRange('today')}
                  className="focus:bg-abrev-dark/50"
                >
                  Hoje
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateRange('yesterday')}
                  className="focus:bg-abrev-dark/50"
                >
                  Ontem
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateRange('last-7-days')}
                  className="focus:bg-abrev-dark/50"
                >
                  Últimos 7 dias
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateRange('last-30-days')}
                  className="focus:bg-abrev-dark/50"
                >
                  Últimos 30 dias
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateRange('this-month')}
                  className="focus:bg-abrev-dark/50"
                >
                  Este mês
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateRange('last-month')}
                  className="focus:bg-abrev-dark/50"
                >
                  Mês passado
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateRange('this-year')}
                  className="focus:bg-abrev-dark/50"
                >
                  Este ano
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800">
              <RefreshCw className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total de Cliques", value: "156,842", change: "+12.5%", trend: "up" },
            { label: "Links Ativos", value: "2,587", change: "+3.7%", trend: "up" },
            { label: "Taxa de Conversão", value: "4.8%", change: "+1.2%", trend: "up" },
            { label: "Tempo Médio", value: "2m 34s", change: "-5.1%", trend: "down" }
          ].map((stat, index) => (
            <Card key={index} className="bg-abrev-dark-accent/40 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.label}</CardTitle>
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
                  <span className="text-xs text-gray-400">vs. período anterior</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-abrev-dark-accent/40 border-gray-800">
            <CardHeader>
              <CardTitle>Tendência de Cliques</CardTitle>
              <CardDescription>Evolução de cliques por dia</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder type="area" />
            </CardContent>
          </Card>
          
          <Card className="bg-abrev-dark-accent/40 border-gray-800">
            <CardHeader>
              <CardTitle>Cliques por Hora</CardTitle>
              <CardDescription>Distribuição de cliques ao longo do dia</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder type="bar" />
            </CardContent>
          </Card>
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-abrev-dark-accent/40 border-gray-800">
            <CardHeader>
              <CardTitle>Dispositivos</CardTitle>
              <CardDescription>Distribuição por tipo de dispositivo</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder type="pie" height="h-60" />
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-abrev-blue/20 text-abrev-blue p-2 rounded-full mb-2">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-white">68%</div>
                  <div className="text-xs text-gray-400">Mobile</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-abrev-purple/20 text-abrev-purple p-2 rounded-full mb-2">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-white">29%</div>
                  <div className="text-xs text-gray-400">Desktop</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-emerald-500/20 text-emerald-500 p-2 rounded-full mb-2">
                    <Tablet className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-white">3%</div>
                  <div className="text-xs text-gray-400">Tablet</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-abrev-dark-accent/40 border-gray-800">
            <CardHeader>
              <CardTitle>Localização</CardTitle>
              <CardDescription>Top 5 países por cliques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-60">
                <div className="text-center text-gray-400">
                  <Globe className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />
                  <p>Mapa de localizações será implementado aqui</p>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {[
                  { country: "Brasil", percentage: 72, value: 112560 },
                  { country: "Estados Unidos", percentage: 14, value: 21984 },
                  { country: "Portugal", percentage: 5, value: 7842 },
                  { country: "Espanha", percentage: 3, value: 4705 },
                  { country: "Outros", percentage: 6, value: 9401 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-3 text-sm font-medium text-white w-32 truncate">{item.country}</div>
                    <div className="flex-1">
                      <div className="bg-gray-700 h-2 rounded overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-abrev-blue to-abrev-purple h-2 rounded"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-3 text-sm text-gray-300 w-24 text-right">{item.value.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-abrev-dark-accent/40 border-gray-800">
            <CardHeader>
              <CardTitle>Referências</CardTitle>
              <CardDescription>Principais fontes de tráfego</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder type="pie" height="h-60" />
              <div className="space-y-3 mt-4">
                {[
                  { source: "Direto", percentage: 45, value: 70579 },
                  { source: "Redes Sociais", percentage: 32, value: 50189 },
                  { source: "Email", percentage: 13, value: 20389 },
                  { source: "Outros Sites", percentage: 10, value: 15685 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-3 text-sm font-medium text-white w-32 truncate">{item.source}</div>
                    <div className="flex-1">
                      <div className="bg-gray-700 h-2 rounded overflow-hidden">
                        <div 
                          className={`h-2 rounded ${
                            index === 0 ? "bg-abrev-blue" :
                            index === 1 ? "bg-abrev-purple" :
                            index === 2 ? "bg-emerald-500" :
                            "bg-amber-500"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-3 text-sm text-gray-300 w-24 text-right">{item.value.toLocaleString()}</div>
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

export default AdminStats;
