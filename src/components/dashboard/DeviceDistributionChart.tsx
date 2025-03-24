
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface DeviceDistributionChartProps {
  data: Array<{ name: string; value: number }>;
  chartConfig: Record<string, any>;
}

const DeviceDistributionChart = ({ data, chartConfig }: DeviceDistributionChartProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Cliques por Dispositivo</CardTitle>
        <CardDescription className="text-slate-400">Distribuição atual</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[4/3]">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
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
  );
};

export default DeviceDistributionChart;
