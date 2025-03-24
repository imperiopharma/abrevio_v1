
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface DailyClicksChartProps {
  data: Array<{ name: string; clicks: number }>;
  chartConfig: Record<string, any>;
}

const DailyClicksChart = ({ data, chartConfig }: DailyClicksChartProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Cliques por Dia</CardTitle>
        <CardDescription className="text-slate-400">Últimos 7 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[4/3]">
          <LineChart data={data}>
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
  );
};

export default DailyClicksChart;
