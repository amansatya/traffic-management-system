import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Clock, Car, Activity, MapPin, Filter } from 'lucide-react';
import PerformanceChart from './PerformanceChart';
import JunctionHeatmap from './JunctionHeatmap';

const SystemAnalytics = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  // Mock data for global metrics
  const globalMetrics = {
    avgCommute: { value: 18.4, change: -12.3, unit: 'min' },
    throughput: { value: 2847, change: 8.7, unit: 'vehicles/hr' },
    activeIntersections: { value: 24, change: 0, unit: 'online' },
    efficiency: { value: 94.2, change: 5.8, unit: '% optimal' }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-status-online" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-status-critical" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-status-online';
    if (change < 0) return 'text-status-critical';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="bg-gradient-surface">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>System Performance Analytics</span>
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg Commute Time</p>
                <p className="text-2xl font-bold text-foreground">
                  {globalMetrics.avgCommute.value}
                  <span className="text-sm text-muted-foreground ml-1">min</span>
                </p>
              </div>
              <Clock className="h-8 w-8 text-primary/60" />
            </div>
            <div className="flex items-center mt-2 space-x-1">
              {getChangeIcon(globalMetrics.avgCommute.change)}
              <span className={`text-xs ${getChangeColor(globalMetrics.avgCommute.change)}`}>
                {Math.abs(globalMetrics.avgCommute.change)}% vs yesterday
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Vehicle Throughput</p>
                <p className="text-2xl font-bold text-foreground">
                  {globalMetrics.throughput.value.toLocaleString()}
                  <span className="text-sm text-muted-foreground ml-1">/hr</span>
                </p>
              </div>
              <Car className="h-8 w-8 text-primary/60" />
            </div>
            <div className="flex items-center mt-2 space-x-1">
              {getChangeIcon(globalMetrics.throughput.change)}
              <span className={`text-xs ${getChangeColor(globalMetrics.throughput.change)}`}>
                {Math.abs(globalMetrics.throughput.change)}% vs yesterday
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Active Intersections</p>
                <p className="text-2xl font-bold text-foreground">
                  {globalMetrics.activeIntersections.value}
                  <span className="text-sm text-muted-foreground ml-1">online</span>
                </p>
              </div>
              <MapPin className="h-8 w-8 text-primary/60" />
            </div>
            <div className="flex items-center mt-2">
              <Badge className="status-green text-xs">All Systems Online</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">System Efficiency</p>
                <p className="text-2xl font-bold text-foreground">
                  {globalMetrics.efficiency.value}
                  <span className="text-sm text-muted-foreground ml-1">%</span>
                </p>
              </div>
              <Activity className="h-8 w-8 text-primary/60" />
            </div>
            <div className="flex items-center mt-2 space-x-1">
              {getChangeIcon(globalMetrics.efficiency.change)}
              <span className={`text-xs ${getChangeColor(globalMetrics.efficiency.change)}`}>
                {Math.abs(globalMetrics.efficiency.change)}% improvement
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Traffic Flow Optimization</CardTitle>
            <p className="text-sm text-muted-foreground">
              Smart system vs. fixed-timer performance comparison
            </p>
          </CardHeader>
          <CardContent>
            <PerformanceChart timeRange={timeRange} />
          </CardContent>
        </Card>

        {/* Junction Heatmap */}
        <Card className="bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Junction Traffic Density</CardTitle>
            <p className="text-sm text-muted-foreground">
              Real-time congestion levels across the city
            </p>
          </CardHeader>
          <CardContent>
            <JunctionHeatmap />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Table */}
      <Card className="bg-card/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Junction Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">Junction</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Avg Wait Time</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Throughput</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Main St. & Park Ave.', status: 'optimal', wait: '24s', throughput: '342/hr', efficiency: '96%' },
                  { name: '1st Ave. & Broadway', status: 'moderate', wait: '31s', throughput: '289/hr', efficiency: '88%' },
                  { name: '2nd St. & Elm Ave.', status: 'optimal', wait: '19s', throughput: '267/hr', efficiency: '94%' },
                  { name: '3rd St. & Oak Ave.', status: 'heavy', wait: '45s', throughput: '198/hr', efficiency: '76%' },
                ].map((junction, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{junction.name}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        junction.status === 'optimal' ? 'status-green' :
                        junction.status === 'moderate' ? 'status-yellow' : 'status-red'
                      }>
                        {junction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono-data">{junction.wait}</td>
                    <td className="py-3 px-4 font-mono-data">{junction.throughput}</td>
                    <td className="py-3 px-4 font-mono-data">{junction.efficiency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAnalytics;