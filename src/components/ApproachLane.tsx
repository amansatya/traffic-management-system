import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Car, Truck, Bus, Bike, Circle, Square, Play, Pause } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import TrafficLight3D from './TrafficLight3D';

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
  onExpand?: () => void;
  expanded?: boolean;
}

const ApproachLane = ({
  direction,
  lightStatus,
  vehicles,
  aiRecommendation,
  manualOverride,
  onManualOverride,
  onForceLight,
  onExpand,
  expanded = false
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
    <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow">
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
        {/* 3D Traffic Light */}
        {expanded && (
          <div className="mb-4">
            <TrafficLight3D status={lightStatus} />
          </div>
        )}
        
        {/* Video Feed */}
        <div className="relative">
          <VideoPlayer
            direction={direction}
            isPlaying={isPlaying}
            onPlayToggle={() => setIsPlaying(!isPlaying)}
          />
        </div>

        {/* Video Placeholder */}
        <div className="space-y-2 p-4 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/30">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">Video Feed Placeholder</h4>
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div className="space-y-1">
            <div className="h-2 bg-muted-foreground/20 rounded-full"></div>
            <div className="h-2 bg-muted-foreground/15 rounded-full w-3/4"></div>
            <div className="h-2 bg-muted-foreground/20 rounded-full w-1/2"></div>
            <div className="h-2 bg-muted-foreground/15 rounded-full w-2/3"></div>
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