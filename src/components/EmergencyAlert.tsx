import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Ambulance, Truck, Shield, Siren, CheckCircle, Clock, MapPin, AlertTriangle } from 'lucide-react';

interface EmergencyAlertProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleType: 'ambulance' | 'fire' | 'police';
  approach: string;
  junction: string;
}

const EmergencyAlert = ({ isOpen, onClose, vehicleType, approach, junction }: EmergencyAlertProps) => {
  const [countdown, setCountdown] = useState(15);
  const [protocolActive, setProtocolActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountdown(15);
      setProtocolActive(false);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setProtocolActive(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const getVehicleIcon = () => {
    switch (vehicleType) {
      case 'ambulance': return <Ambulance className="h-12 w-12 text-white" />;
      case 'fire': return <Truck className="h-12 w-12 text-white" />;
      case 'police': return <Shield className="h-12 w-12 text-white" />;
      default: return <Ambulance className="h-12 w-12 text-white" />;
    }
  };

  const getVehicleLabel = () => {
    switch (vehicleType) {
      case 'ambulance': return 'AMBULANCE';
      case 'fire': return 'FIRE TRUCK';
      case 'police': return 'POLICE VEHICLE';
      default: return 'EMERGENCY VEHICLE';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-2xl bg-card border-4 border-status-critical pulse-critical"
      >
        <DialogHeader className="text-center space-y-4">
          {/* Emergency Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-status-critical flex items-center justify-center animate-pulse">
            {getVehicleIcon()}
          </div>

          {/* Alert Title */}
          <DialogTitle className="text-3xl font-bold text-status-critical flex items-center justify-center space-x-3">
            <Siren className="h-8 w-8 animate-pulse" />
            <span>EMERGENCY VEHICLE DETECTED</span>
            <Siren className="h-8 w-8 animate-pulse" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Information */}
          <div className="text-center space-y-2">
            <Badge className="bg-status-critical/20 text-status-critical border-status-critical text-lg px-4 py-2">
              {getVehicleLabel()}
            </Badge>
            <div className="text-lg text-foreground">
              <strong>Approaching:</strong> {junction}
            </div>
            <div className="text-lg text-foreground">
              <strong>Direction:</strong> {approach}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Protocol Status */}
          <div className="space-y-4">
            <div className="text-center">
              {!protocolActive ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5 text-status-warning animate-pulse" />
                    <span className="text-lg text-status-warning">
                      Activating Green Corridor Protocol in
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-status-warning glow-primary">
                    {countdown}s
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-status-online animate-pulse" />
                    <span className="text-lg text-status-online font-semibold">
                      GREEN CORRIDOR PROTOCOL ACTIVE
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    All lights along the emergency route have been coordinated
                  </div>
                </div>
              )}
            </div>

            {/* Route Information */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Emergency Route Status</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Current Junction</span>
                    <Badge className="status-green">Clear</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next Junction</span>
                    <Badge className="status-yellow">Clearing</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>ETA to Clear</span>
                    <span className="font-mono-data">45s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Route Length</span>
                    <span className="font-mono-data">1.2km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="bg-status-warning/10 border border-status-warning/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-status-warning text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">
                  Manual overrides are temporarily disabled during emergency protocol
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onClose}
              className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 text-lg"
              disabled={!protocolActive}
            >
              {protocolActive ? 'Acknowledge' : `Activating... ${countdown}s`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyAlert;