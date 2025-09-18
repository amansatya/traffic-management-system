import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ApproachLane from './ApproachLane';

interface JunctionControlProps {
  junctionId: string;
  onEmergencyTrigger: () => void;
}

const JunctionControl = ({ junctionId, onEmergencyTrigger }: JunctionControlProps) => {
  const [expandedLane, setExpandedLane] = useState<string | null>(null);
  const [autoApply, setAutoApply] = useState(true);
  const [approachData, setApproachData] = useState({
    north: {
      direction: 'North',
      lightStatus: 'green' as 'red' | 'yellow' | 'green',
      vehicles: { total: 8, cars: 6, trucks: 1, buses: 1, motorcycles: 0 },
      aiRecommendation: 28,
      manualOverride: false
    },
    south: {
      direction: 'South',
      lightStatus: 'red' as 'red' | 'yellow' | 'green',
      vehicles: { total: 15, cars: 11, trucks: 2, buses: 1, motorcycles: 1 },
      aiRecommendation: 45,
      manualOverride: false
    },
    east: {
      direction: 'East',
      lightStatus: 'red' as 'red' | 'yellow' | 'green',
      vehicles: { total: 4, cars: 3, trucks: 0, buses: 0, motorcycles: 1 },
      aiRecommendation: 18,
      manualOverride: false
    },
    west: {
      direction: 'West',
      lightStatus: 'red' as 'red' | 'yellow' | 'green',
      vehicles: { total: 12, cars: 9, trucks: 2, buses: 0, motorcycles: 1 },
      aiRecommendation: 38,
      manualOverride: false
    }
  });

  // Simulate real-time data updates every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setApproachData(prev => ({
        ...prev,
        north: {
          ...prev.north,
          vehicles: {
            total: Math.floor(Math.random() * 20) + 5,
            cars: Math.floor(Math.random() * 15) + 3,
            trucks: Math.floor(Math.random() * 3),
            buses: Math.floor(Math.random() * 2),
            motorcycles: Math.floor(Math.random() * 3)
          },
          aiRecommendation: Math.floor(Math.random() * 40) + 15
        },
        south: {
          ...prev.south,
          vehicles: {
            total: Math.floor(Math.random() * 25) + 8,
            cars: Math.floor(Math.random() * 18) + 5,
            trucks: Math.floor(Math.random() * 4),
            buses: Math.floor(Math.random() * 2),
            motorcycles: Math.floor(Math.random() * 3)
          },
          aiRecommendation: Math.floor(Math.random() * 50) + 20
        },
        east: {
          ...prev.east,
          vehicles: {
            total: Math.floor(Math.random() * 15) + 2,
            cars: Math.floor(Math.random() * 12) + 1,
            trucks: Math.floor(Math.random() * 2),
            buses: Math.floor(Math.random()),
            motorcycles: Math.floor(Math.random() * 2)
          },
          aiRecommendation: Math.floor(Math.random() * 30) + 10
        },
        west: {
          ...prev.west,
          vehicles: {
            total: Math.floor(Math.random() * 20) + 6,
            cars: Math.floor(Math.random() * 15) + 4,
            trucks: Math.floor(Math.random() * 3),
            buses: Math.floor(Math.random()),
            motorcycles: Math.floor(Math.random() * 2)
          },
          aiRecommendation: Math.floor(Math.random() * 45) + 15
        }
      }));
    }, 60000); // Changed to 1 minute (60000ms)

    return () => clearInterval(interval);
  }, []);

  const handleManualOverride = (direction: string, override: boolean) => {
    setApproachData(prev => ({
      ...prev,
      [direction.toLowerCase()]: {
        ...prev[direction.toLowerCase() as keyof typeof prev],
        manualOverride: override
      }
    }));
  };

  const handleForceLight = (direction: string, status: 'red' | 'green') => {
    setApproachData(prev => ({
      ...prev,
      [direction.toLowerCase()]: {
        ...prev[direction.toLowerCase() as keyof typeof prev],
        lightStatus: status
      }
    }));
  };

  const applyTimings = () => {
    // Logic to apply AI recommendations to actual traffic lights
    console.log('Applying AI recommendations to traffic lights');
  };

  if (expandedLane) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {expandedLane.charAt(0).toUpperCase() + expandedLane.slice(1)}bound Approach - Detailed View
          </h2>
          <Button onClick={() => setExpandedLane(null)} variant="outline" size="sm">
            <span className="mr-2">✕</span>
            Close
          </Button>
        </div>
        <div className="max-w-2xl mx-auto">
          <ApproachLane
            {...approachData[expandedLane as keyof typeof approachData]}
            onManualOverride={(override) => handleManualOverride(expandedLane, override)}
            onForceLight={(status) => handleForceLight(expandedLane, status)}
            expanded={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Junction Info */}
      <Card className="bg-gradient-surface">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Junction Control - {junctionId.replace('-', ' & ').toUpperCase()}</span>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-status-online animate-pulse" />
              <span>Live Monitoring Active</span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Northwest - North Approach */}
        <div onClick={() => setExpandedLane('north')} className="cursor-pointer">
          <ApproachLane
            {...approachData.north}
            onManualOverride={(override) => handleManualOverride('north', override)}
            onForceLight={(status) => handleForceLight('north', status)}
            onExpand={() => setExpandedLane('north')}
          />
        </div>

        {/* Northeast - East Approach */}
        <div onClick={() => setExpandedLane('east')} className="cursor-pointer">
          <ApproachLane
            {...approachData.east}
            onManualOverride={(override) => handleManualOverride('east', override)}
            onForceLight={(status) => handleForceLight('east', status)}
            onExpand={() => setExpandedLane('east')}
          />
        </div>

        {/* Southwest - South Approach */}
        <div onClick={() => setExpandedLane('south')} className="cursor-pointer">
          <ApproachLane
            {...approachData.south}
            onManualOverride={(override) => handleManualOverride('south', override)}
            onForceLight={(status) => handleForceLight('south', status)}
            onExpand={() => setExpandedLane('south')}
          />
        </div>

        {/* Southeast - West Approach */}
        <div onClick={() => setExpandedLane('west')} className="cursor-pointer">
          <ApproachLane
            {...approachData.west}
            onManualOverride={(override) => handleManualOverride('west', override)}
            onForceLight={(status) => handleForceLight('west', status)}
            onExpand={() => setExpandedLane('west')}
          />
        </div>
      </div>

      {/* Auto Apply Controls */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoApply"
            checked={autoApply}
            onChange={(e) => setAutoApply(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="autoApply" className="text-sm font-medium">
            Auto Apply AI Recommendations
          </label>
        </div>
        {!autoApply && (
          <Button onClick={applyTimings} className="bg-primary hover:bg-primary/80">
            Apply Timings
          </Button>
        )}
      </div>
    </div>
  );
};

export default JunctionControl;