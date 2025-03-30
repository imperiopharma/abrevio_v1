import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { fetchLinkStats } from '@/services';

interface LinkStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkId: string;
}

const LinkStatsModal: React.FC<LinkStatsModalProps> = ({ isOpen, onClose, linkId }) => {
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && linkId) {
      loadStats();
    }
  }, [isOpen, linkId]);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLinkStats(linkId);
      setStats(data);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      // Lidar com o erro (ex: mostrar mensagem ao usuário)
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Estatísticas do Link</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-32 bg-gray-800/50 rounded-md" />
            <Skeleton className="h-48 w-full bg-gray-800/50 rounded-md" />
            <div className="flex gap-4">
              <Skeleton className="h-32 w-1/2 bg-gray-800/50 rounded-md" />
              <Skeleton className="h-32 w-1/2 bg-gray-800/50 rounded-md" />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="clicks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="clicks">Cliques</TabsTrigger>
              <TabsTrigger value="devices">Dispositivos</TabsTrigger>
              <TabsTrigger value="browsers">Navegadores</TabsTrigger>
              <TabsTrigger value="countries">Países</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clicks" className="space-y-4">
              <div className="text-white font-medium">
                Total de Cliques: {stats.totalClicks}
              </div>
              {stats.clicksByDay.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.clicksByDay} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff', border: 'none' }} />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                    <Line type="monotone" dataKey="count" stroke="#82ca9d" name="Cliques" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400">Sem dados de cliques por dia.</p>
              )}
            </TabsContent>
            
            <TabsContent value="devices" className="space-y-4">
              {stats.clicksByDevice.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={stats.clicksByDevice}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {
                        stats.clicksByDevice.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                      }
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff', border: 'none' }} />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400">Sem dados de cliques por dispositivo.</p>
              )}
            </TabsContent>
            
            <TabsContent value="browsers" className="space-y-4">
              {stats.clicksByBrowser.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.clicksByBrowser} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff', border: 'none' }} />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#8884d8" name="Cliques" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400">Sem dados de cliques por navegador.</p>
              )}
            </TabsContent>
            
            <TabsContent value="countries" className="space-y-4">
              {stats.clicksByCountry.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.clicksByCountry} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff', border: 'none' }} />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#8884d8" name="Cliques" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400">Sem dados de cliques por país.</p>
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LinkStatsModal;
