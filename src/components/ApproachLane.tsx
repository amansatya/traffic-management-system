import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Car, Truck, Bus, Bike, Circle, Square, Play, Pause } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface ApproachLaneProps {
  direction: string;
  lightStatus: 'red' | 'yellow' | 'green';
  vehicles: {
    total: number;
    cars: number;
    trucks: number;
    buses: number;
    motorcycles: number;
  };
  aiRecommendation: number;
  manualOverride: boolean;
  onManualOverride: (override: boolean) => void;
  onForceLight: (status: 'red' | 'green') => void;
}

const ApproachLane = ({
  direction,
  lightStatus,
  vehicles,
  aiRecommendation,
  manualOverride,
  onManualOverride,
  onForceLight
}: ApproachLaneProps) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'status-green';
      case 'yellow': return 'status-yellow';
      case 'red': return 'status-red';
      default: return 'status-red';
    }
  };

  const getStatusIcon = (status: string) => {
    return <Circle className={`h-4 w-4 fill-current ${status === 'green' ? 'text-traffic-green' : status === 'yellow' ? 'text-traffic-yellow' : 'text-traffic-red'}`} />;
  };

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg">
      {/* Header */}
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center space-x-2">
            <span>{direction}bound Approach</span>
          </span>
          <Badge className={`${getStatusColor(lightStatus)} border-2`}>
            {getStatusIcon(lightStatus)}
            <span className="ml-2 capitalize">{lightStatus}</span>
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video Feed */}
        <div className="relative">
          <VideoPlayer
            direction={direction}
            isPlaying={isPlaying}
            onPlayToggle={() => setIsPlaying(!isPlaying)}
          />
        </div>

        {/* Vehicle Count Data */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">Real-time Metrics</h4>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Circle className="h-3 w-3 fill-current text-primary" />
                  <span className="text-xs text-muted-foreground">Total</span>
                </div>
                <span className="font-mono-data text-sm text-foreground">{vehicles.total}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Car className="h-3 w-3 text-chart-primary" />
                  <span className="text-xs text-muted-foreground">Cars</span>
                </div>
                <span className="font-mono-data text-sm text-foreground">{vehicles.cars}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bike className="h-3 w-3 text-chart-tertiary" />
                  <span className="text-xs text-muted-foreground">Motorcycles</span>
                </div>
                <span className="font-mono-data text-sm text-foreground">{vehicles.motorcycles}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Truck className="h-3 w-3 text-chart-secondary" />
                  <span className="text-xs text-muted-foreground">Trucks</span>
                </div>
                <span className="font-mono-data text-sm text-foreground">{vehicles.trucks}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bus className="h-3 w-3 text-status-warning" />
                  <span className="text-xs text-muted-foreground">Buses</span>
                </div>
                <span className="font-mono-data text-sm text-foreground">{vehicles.buses}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* AI Recommendation */}
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">AI Recommended Green Time</div>
            <div className="text-2xl font-bold text-primary glow-primary">
              {aiRecommendation}s
            </div>
          </div>

          {/* Manual Override Controls */}
          <div className="space-y-3 p-3 rounded-lg bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Manual Override</span>
              <Switch
                checked={manualOverride}
                onCheckedChange={onManualOverride}
              />
            </div>

            {manualOverride && (
              <div className="flex space-x-2">
                <Button
                  onClick={() => onForceLight('green')}
                  size="sm"
                  className="flex-1 bg-traffic-green hover:bg-traffic-green/80 text-white"
                >
                  Force Green
                </Button>
                <Button
                  onClick={() => onForceLight('red')}
                  size="sm"
                  className="flex-1 bg-traffic-red hover:bg-traffic-red/80 text-white"
                >
                  Force Red
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApproachLane;