import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  timeRange: string;
}

const PerformanceChart = ({ timeRange }: PerformanceChartProps) => {
  // Mock data generator based on time range
  const generateData = () => {
    const points = timeRange === '1h' ? 12 : timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
    const data = [];

    for (let i = 0; i < points; i++) {
      const baseCommute = 22;
      const smartReduction = 3 + Math.random() * 4; // 3-7 minutes improvement
      
      data.push({
        time: timeRange === '1h' 
          ? `${String(i * 5).padStart(2, '0')}:00`
          : timeRange === '24h'
          ? `${String(i).padStart(2, '0')}:00`
          : timeRange === '7d'
          ? `Day ${i + 1}`
          : `Week ${i + 1}`,
        smartSystem: baseCommute - smartReduction + (Math.random() - 0.5) * 2,
        fixedTimer: baseCommute + (Math.random() - 0.5) * 3,
      });
    }

    return data;
  };

  const data = generateData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-mono-data text-foreground">
                {entry.value.toFixed(1)} min
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            label={{ 
              value: 'Commute Time (minutes)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="smartSystem"
            stroke="hsl(var(--chart-primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--chart-primary))', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--chart-primary))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
            name="Smart System"
          />
          <Line
            type="monotone"
            dataKey="fixedTimer"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
            name="Fixed Timer"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;