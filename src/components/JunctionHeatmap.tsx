import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Zap } from 'lucide-react';

interface Junction {
  id: string;
  name: string;
  x: number; // percentage from left
  y: number; // percentage from top
  density: 'light' | 'moderate' | 'heavy';
  vehicles: number;
  efficiency: number;
}

const JunctionHeatmap = () => {
  const [selectedJunction, setSelectedJunction] = useState<string | null>(null);
  
  const junctions: Junction[] = [
    { id: 'main-park', name: 'Main St. & Park Ave.', x: 45, y: 35, density: 'light', vehicles: 8, efficiency: 96 },
    { id: 'first-broadway', name: '1st Ave. & Broadway', x: 25, y: 60, density: 'moderate', vehicles: 15, efficiency: 88 },
    { id: 'second-elm', name: '2nd St. & Elm Ave.', x: 65, y: 25, density: 'light', vehicles: 6, efficiency: 94 },
    { id: 'third-oak', name: '3rd St. & Oak Ave.', x: 75, y: 70, density: 'heavy', vehicles: 22, efficiency: 76 },
    { id: 'fourth-pine', name: '4th St. & Pine Ave.', x: 20, y: 20, density: 'moderate', vehicles: 12, efficiency: 82 },
    { id: 'fifth-maple', name: '5th St. & Maple Ave.', x: 80, y: 45, density: 'light', vehicles: 5, efficiency: 98 },
    { id: 'sixth-cedar', name: '6th St. & Cedar Ave.', x: 35, y: 80, density: 'moderate', vehicles: 18, efficiency: 85 },
    { id: 'seventh-birch', name: '7th St. & Birch Ave.', x: 55, y: 55, density: 'heavy', vehicles: 25, efficiency: 72 },
  ];

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'light': return 'bg-status-online';
      case 'moderate': return 'bg-status-warning';
      case 'heavy': return 'bg-status-critical';
      default: return 'bg-muted-foreground';
    }
  };

  const getDensitySize = (density: string) => {
    switch (density) {
      case 'light': return 'h-3 w-3';
      case 'moderate': return 'h-4 w-4';
      case 'heavy': return 'h-5 w-5';
      default: return 'h-3 w-3';
    }
  };

  const handleJunctionClick = (junctionId: string) => {
    setSelectedJunction(junctionId === selectedJunction ? null : junctionId);
  };

  const selectedJunctionData = selectedJunction 
    ? junctions.find(j => j.id === selectedJunction)
    : null;

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative h-64 bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg border border-border/50 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Street Lines (simplified) */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="0" y1="35%" x2="100%" y2="35%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.3" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.3" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.3" />
          <line x1="45%" y1="0" x2="45%" y2="100%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.3" />
          <line x1="65%" y1="0" x2="65%" y2="100%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.3" />
        </svg>

        {/* Junction Points */}
        {junctions.map((junction) => (
          <button
            key={junction.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full 
              ${getDensityColor(junction.density)} ${getDensitySize(junction.density)}
              transition-all duration-200 hover:scale-150 border-2 border-background
              ${selectedJunction === junction.id ? 'scale-150 ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
            `}
            style={{ left: `${junction.x}%`, top: `${junction.y}%` }}
            onClick={() => handleJunctionClick(junction.id)}
            title={junction.name}
          />
        ))}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border/50">
          <div className="text-xs text-muted-foreground mb-2">Traffic Density</div>
          <div className="flex space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-status-online" />
              <span>Light</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-status-warning" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-status-critical" />
              <span>Heavy</span>
            </div>
          </div>
        </div>

        {/* Compass */}
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border/50">
          <Navigation className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Junction Details */}
      {selectedJunctionData && (
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">{selectedJunctionData.name}</h4>
            <Badge className={
              selectedJunctionData.density === 'light' ? 'status-green' :
              selectedJunctionData.density === 'moderate' ? 'status-yellow' : 'status-red'
            }>
              {selectedJunctionData.density} traffic
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Current Vehicles</div>
              <div className="text-lg font-mono-data text-foreground">{selectedJunctionData.vehicles}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Efficiency</div>
              <div className="text-lg font-mono-data text-foreground">{selectedJunctionData.efficiency}%</div>
            </div>
            <div className="text-center">
              <Button size="sm" className="h-8">
                <MapPin className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Light Traffic</div>
          <div className="text-lg font-bold text-status-online">
            {junctions.filter(j => j.density === 'light').length}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Moderate Traffic</div>
          <div className="text-lg font-bold text-status-warning">
            {junctions.filter(j => j.density === 'moderate').length}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Heavy Traffic</div>
          <div className="text-lg font-bold text-status-critical">
            {junctions.filter(j => j.density === 'heavy').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JunctionHeatmap;