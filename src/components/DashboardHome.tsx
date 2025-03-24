
import React from 'react';
import { 
  BarChart, 
  LineChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  Link, 
  ArrowUpRight, 
  Users, 
  MousePointerClick, 
  Globe 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Dados de exemplo para as métricas
const linkClickData = [
  { name: 'Dom', clicks: 45 },
  { name: 'Seg', clicks: 52 },
  { name: 'Ter', clicks: 49 },
  { name: 'Qua', clicks: 63 },
  { name: 'Qui', clicks: 58 },
  { name: 'Sex', clicks: 72 },
  { name: 'Sáb', clicks: 80 },
];

const deviceData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 },
];

const recentLinks = [
  { id: 1, original: 'https://example.com/pagina-muito-longa-com-varios-parametros-e-utm-codes', short: 'abrev.io/x7Yt8', clicks: 128, created: '2 horas atrás' },
  { id: 2, original: 'https://another-site.com/products/featured-items', short: 'abrev.io/pR9z2', clicks: 84, created: '8 horas atrás' },
  { id: 3, original: 'https://blog.tech/article/ten-tips-for-productivity', short: 'abrev.io/k4L9m', clicks: 56, created: '1 dia atrás' },
  { id: 4, original: 'https://curso-online.edu/matricula/programacao', short: 'abrev.io/c8D3f', clicks: 32, created: '2 dias atrás' },
];

const chartConfig = {
  clicks: { label: 'Cliques', theme: { light: '#3b82f6', dark: '#60a5fa' } },
  whatsapp: { label: 'QR WhatsApp', theme: { light: '#10b981', dark: '#34d399' } },
  bio: { label: 'Links Bio', theme: { light: '#8b5cf6', dark: '#a78bfa' } },
};

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Visão Geral</h2>
        <Button className="bg-abrev-blue hover:bg-abrev-blue/90">
          Baixar Relatório
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Total de Links</CardTitle>
            <Link className="h-4 w-4 text-abrev-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">342</div>
            <p className="text-xs text-slate-400">+7% em relação ao último mês</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Total de Cliques</CardTitle>
            <MousePointerClick className="h-4 w-4 text-abrev-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12,856</div>
            <p className="text-xs text-slate-400">+14.2% em relação ao último mês</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">QR Codes Gerados</CardTitle>
            <Globe className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87</div>
            <p className="text-xs text-slate-400">+3.2% em relação ao último mês</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Países Alcançados</CardTitle>
            <Users className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28</div>
            <p className="text-xs text-slate-400">+2 novos países este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Cliques por Dia</CardTitle>
            <CardDescription className="text-slate-400">Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-[4/3]">
              <LineChart data={linkClickData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      formatter={(value) => [`${value} cliques`, 'Cliques']}
                    />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  name="clicks"
                  stroke="var(--color-clicks)" 
                  strokeWidth={2}
                  dot={{ stroke: "var(--color-clicks)", strokeWidth: 2, r: 4, fill: "#1e293b" }}
                  activeDot={{ r: 6, fill: "var(--color-clicks)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Cliques por Dispositivo</CardTitle>
            <CardDescription className="text-slate-400">Distribuição atual</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-[4/3]">
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="bar"
                      formatter={(value) => [`${value}%`, 'Porcentagem']}
                    />
                  }
                />
                <Bar 
                  dataKey="value" 
                  name="clicks"
                  fill="var(--color-clicks)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Links recentes */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Links Recentes</CardTitle>
          <CardDescription className="text-slate-400">Links encurtados recentemente</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">Link Original</TableHead>
                <TableHead className="text-slate-400">Link Encurtado</TableHead>
                <TableHead className="text-slate-400">Cliques</TableHead>
                <TableHead className="text-slate-400">Criado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLinks.map((link) => (
                <TableRow key={link.id} className="border-slate-700">
                  <TableCell className="font-medium text-white">
                    <div className="truncate max-w-[180px]" title={link.original}>
                      {link.original}
                    </div>
                  </TableCell>
                  <TableCell className="text-abrev-blue">{link.short}</TableCell>
                  <TableCell className="text-white">{link.clicks}</TableCell>
                  <TableCell className="text-slate-400">{link.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="text-white border-slate-700 hover:bg-slate-700">
              Ver Todos os Links
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
