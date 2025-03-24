
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

const StatsCard = ({ title, value, description, icon: Icon, iconColor }: StatsCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-0 md:pb-2 p-3 md:p-6">
        <CardTitle className="text-white text-xs sm:text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-3 w-3 md:h-4 md:w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-2">
        <div className="text-lg md:text-2xl font-bold text-white">{value}</div>
        <p className="text-[10px] md:text-xs text-slate-400 truncate">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
