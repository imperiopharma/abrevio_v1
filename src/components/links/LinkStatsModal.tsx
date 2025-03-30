
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fetchLinkStats } from '@/services/api';
import { Button } from '@/components/ui/button';
import { X, Calendar, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface LinkStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkId: string;
}

const COLORS = ['#3A86FF', '#8338EC', '#FF006E', '#FB5607', '#FFBE0B', '#3A5A40', '#006466'];

const LinkStatsModal: React.FC<LinkStatsModalProps> = ({
  isOpen,
  onClose,
  linkId
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalClicks: number;
    clicksByDay: any[];
    clicksByBrowser: any[];
    clicksByDevice: any[];
    clicksByCountry: any[];
  }>({
    totalClicks: 0,
    clicksByDay: [],
    clicksByBrowser: [],
    clicksByDevice: [],
    clicksByCountry: []
  });
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (isOpen && linkId) {
      loadStats();
    }
  }, [isOpen, linkId]);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const linkStats = await fetchLinkStats(linkId);
      setStats(linkStats);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      toast({
        title: "Erro ao carregar estatísticas",
        description: "Não foi possível carregar as estatísticas do link. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = () => {
    // Combine all data for CSV export
    const csvRows = [
      ['Data', 'Total de Cliques'],
      ...stats.clicksByDay.map(item => [item.date, item.count])
    ];
    
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `link-stats-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-abrev-dark-accent border-gray-800 text-white sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            Estatísticas de Cliques
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full absolute right-4 top-4 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Últimos 30 dias</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 hover:bg-gray-800"
            onClick={downloadCSV}
          >
            <Download className="mr-2 h-3 w-3" />
            Exportar CSV
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-abrev-dark/50 mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="browsers">Navegadores</TabsTrigger>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="countries">Países</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className="p-4 bg-abrev-dark-accent/40 border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Total de Cliques</h3>
                  <div className="text-2xl font-bold text-abrev-blue">{stats.totalClicks}</div>
                </div>
                
                <div className="h-64">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-abrev-blue"></div>
                    </div>
                  ) : stats.clicksByDay.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-400">Sem dados disponíveis</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={stats.clicksByDay}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getDate()}/${date.getMonth() + 1}`;
                          }}
                          stroke="#999"
                        />
                        <YAxis stroke="#999" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#2A2D3E', borderColor: '#444', color: '#fff' }}
                          formatter={(value) => [`${value} cliques`, 'Cliques']}
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          name="Cliques" 
                          stroke="#3A86FF" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="browsers" className="space-y-4">
            <Card className="p-4 bg-abrev-dark-accent/40 border-gray-800">
              <h3 className="text-lg font-medium mb-4">Cliques por Navegador</h3>
              
              <div className="h-64">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-abrev-blue"></div>
                  </div>
                ) : stats.clicksByBrowser.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Sem dados disponíveis</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.clicksByBrowser}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {stats.clicksByBrowser.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#2A2D3E', borderColor: '#444', color: '#fff' }}
                        formatter={(value) => [`${value} cliques`, 'Cliques']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices" className="space-y-4">
            <Card className="p-4 bg-abrev-dark-accent/40 border-gray-800">
              <h3 className="text-lg font-medium mb-4">Cliques por Dispositivo</h3>
              
              <div className="h-64">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-abrev-blue"></div>
                  </div>
                ) : stats.clicksByDevice.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Sem dados disponíveis</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.clicksByDevice}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {stats.clicksByDevice.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#2A2D3E', borderColor: '#444', color: '#fff' }}
                        formatter={(value) => [`${value} cliques`, 'Cliques']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="countries" className="space-y-4">
            <Card className="p-4 bg-abrev-dark-accent/40 border-gray-800">
              <h3 className="text-lg font-medium mb-4">Cliques por País</h3>
              
              <div className="h-64">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-abrev-blue"></div>
                  </div>
                ) : stats.clicksByCountry.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Sem dados disponíveis</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.clicksByCountry}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" stroke="#999" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#999"
                        width={50}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#2A2D3E', borderColor: '#444', color: '#fff' }}
                        formatter={(value) => [`${value} cliques`, 'Cliques']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Cliques" 
                        fill="#3A86FF" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LinkStatsModal;
