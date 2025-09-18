import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation } from 'lucide-react';

// Defines the structure for each junction's data
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
    // State to keep track of the currently hovered junction
    const [hoveredJunction, setHoveredJunction] = useState<Junction | null>(null);

    // Static data for the junctions on the map
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

    // Helper function to get the dot color based on traffic density
    const getDensityColor = (density: string) => {
        switch (density) {
            case 'light': return 'bg-status-online';
            case 'moderate': return 'bg-status-warning';
            case 'heavy': return 'bg-status-critical';
            default: return 'bg-muted-foreground';
        }
    };

    // Helper function to get the dot size based on traffic density
    const getDensitySize = (density: string) => {
        switch (density) {
            case 'light': return 'h-3 w-3';
            case 'moderate': return 'h-4 w-4';
            case 'heavy': return 'h-5 w-5';
            default: return 'h-3 w-3';
        }
    };

    return (
        <div className="space-y-4">
            {/* Map Container */}
            <div className="relative h-64 rounded-lg border border-border/50 overflow-hidden">
                {/* Background Map Image */}
                <img
                    src="../../public/map.png"
                    alt="City Map"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Street Lines connecting points */}
                <svg className="absolute inset-0 w-full h-full" style={{zIndex: 1}}>
                    <line x1="20%" y1="20%" x2="45%" y2="35%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                    <line x1="20%" y1="20%" x2="25%" y2="60%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                    <line x1="45%" y1="35%" x2="65%" y2="25%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                    <line x1="45%" y1="35%" x2="55%" y2="55%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                    <line x1="25%" y1="60%" x2="35%" y2="80%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                    <line x1="55%" y1="55%" x2="75%" y2="70%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                    <line x1="65%" y1="25%" x2="80%" y2="45%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                    <line x1="80%" y1="45%" x2="75%" y2="70%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
                </svg>

                {/* Junction Points */}
                {junctions.map((junction) => (
                    <div
                        key={junction.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${junction.x}%`, top: `${junction.y}%`, zIndex: 10 }}
                        onMouseEnter={() => setHoveredJunction(junction)}
                        onMouseLeave={() => setHoveredJunction(null)}
                    >
                        {/* The visible dot */}
                        <div
                            className={`rounded-full cursor-pointer
                ${getDensityColor(junction.density)} ${getDensitySize(junction.density)}
                transition-all duration-200 border-2 border-background
                ${hoveredJunction?.id === junction.id ? 'scale-150 ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
              `}
                            title={junction.name}
                        />
                        {/* Tooltip that appears on hover */}
                        {hoveredJunction?.id === junction.id && (
                            <div
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border/50 shadow-lg"
                                style={{zIndex: 30}}
                            >
                                <div className="text-xs font-medium text-foreground">{junction.name}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    Vehicles: <span className="font-mono text-foreground font-medium ml-1">{junction.vehicles}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Efficiency: <span className="font-mono text-foreground font-medium ml-1">{junction.efficiency}%</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border/50" style={{zIndex: 20}}>
                    <div className="text-xs text-muted-foreground mb-2">Traffic Density</div>
                    <div className="flex space-x-4 text-xs">
                        <div className="flex items-center space-x-1"><div className="h-2 w-2 rounded-full bg-status-online" /><span>Light</span></div>
                        <div className="flex items-center space-x-1"><div className="h-2 w-2 rounded-full bg-status-warning" /><span>Moderate</span></div>
                        <div className="flex items-center space-x-1"><div className="h-2 w-2 rounded-full bg-status-critical" /><span>Heavy</span></div>
                    </div>
                </div>

                {/* Map Compass */}
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border/50" style={{zIndex: 20}}>
                    <Navigation className="h-4 w-4 text-primary" />
                </div>
            </div>

            {/* Overall Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Light Traffic</div>
                    <div className="text-lg font-bold text-status-online">{junctions.filter(j => j.density === 'light').length}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Moderate Traffic</div>
                    <div className="text-lg font-bold text-status-warning">{junctions.filter(j => j.density === 'moderate').length}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Heavy Traffic</div>
                    <div className="text-lg font-bold text-status-critical">{junctions.filter(j => j.density === 'heavy').length}</div>
                </div>
            </div>
        </div>
    );
};

export default JunctionHeatmap;