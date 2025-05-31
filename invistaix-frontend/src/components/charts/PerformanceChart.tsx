
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface PerformanceChartProps {
  title: string;
  description?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
  className?: string;
}

const chartConfig = {
  value: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
}

const PerformanceChart = ({
  title,
  description,
  data,
  color = "#22c55e",
  className,
}: PerformanceChartProps) => {
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="50%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                strokeOpacity={0.3}
                vertical={false}
              />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <ChartTooltip
                content={<ChartTooltipContent className="bg-background border border-border shadow-lg rounded-lg" />}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                fill={`url(#${gradientId})`}
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
