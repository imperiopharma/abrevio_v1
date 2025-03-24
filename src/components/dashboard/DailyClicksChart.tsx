
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
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 w-full">
      <CardHeader>
        <CardTitle className="text-white text-lg md:text-xl">Cliques por Dia</CardTitle>
        <CardDescription className="text-slate-400 text-xs md:text-sm">Últimos 7 dias</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                tick={{ fontSize: 10 }} 
                tickMargin={10}
                axisLine={{ stroke: '#2d3748' }}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fontSize: 10 }} 
                tickMargin={10}
                axisLine={{ stroke: '#2d3748' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-md border border-slate-700 bg-slate-800 p-2 shadow-md">
                        <div className="text-xs font-semibold text-white">{label}</div>
                        <div className="text-xs text-abrev-blue">
                          {`${payload[0].value} cliques`}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                name="clicks"
                stroke="var(--color-clicks, #60a5fa)" 
                strokeWidth={2}
                dot={{ stroke: "var(--color-clicks, #60a5fa)", strokeWidth: 2, r: 4, fill: "#1e293b" }}
                activeDot={{ r: 6, fill: "var(--color-clicks, #60a5fa)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyClicksChart;
