import { useEffect, useState, useCallback, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Ambulance,
    Truck,
    Shield,
    Siren,
    CheckCircle,
    Clock,
    MapPin,
    AlertTriangle,
    X,
} from 'lucide-react';

interface EmergencyAlertProps {
    isOpen: boolean;
    onClose: () => void;
    vehicleType: 'ambulance' | 'fire' | 'police';
    approach: string;
    junction: string;
}

const EmergencyAlert = ({
                            isOpen,
                            onClose,
                            vehicleType,
                            approach,
                            junction,
                        }: EmergencyAlertProps) => {
    const [countdown, setCountdown] = useState(30);
    const [protocolActive, setProtocolActive] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const autoCloseRef = useRef<NodeJS.Timeout | null>(null);

    const handleClose = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        setCountdown(30);
        setProtocolActive(false);

        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setProtocolActive(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        autoCloseRef.current = setTimeout(() => {
            handleClose();
        }, 30000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
        };
    }, [isOpen, handleClose]);

    const getVehicleIcon = () => {
        switch (vehicleType) {
            case 'ambulance':
                return <Ambulance className="h-12 w-12 text-white" />;
            case 'fire':
                return <Truck className="h-12 w-12 text-white" />;
            case 'police':
                return <Shield className="h-12 w-12 text-white" />;
            default:
                return <Ambulance className="h-12 w-12 text-white" />;
        }
    };

    const getVehicleLabel = () => {
        switch (vehicleType) {
            case 'ambulance':
                return 'AMBULANCE';
            case 'fire':
                return 'FIRE TRUCK';
            case 'police':
                return 'POLICE VEHICLE';
            default:
                return 'EMERGENCY VEHICLE';
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                className="w-screen h-screen max-w-none max-h-none overflow-hidden bg-card border-4 border-status-critical p-0 m-0 rounded-none"
            >
                <div className="h-full overflow-y-auto custom-scrollbar">
                    <DialogHeader className="text-center space-y-4 bg-card z-10 p-6 border-b border-status-critical/20 relative">
                        <Button
                            onClick={handleClose}
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-4 text-status-critical hover:bg-status-critical/20 hover:text-status-critical z-20 transition-colors duration-200"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                        <div className="mx-auto w-24 h-24 rounded-full bg-status-critical flex items-center justify-center">
                            {getVehicleIcon()}
                        </div>
                        <DialogTitle className="text-2xl md:text-3xl font-bold text-status-critical flex items-center justify-center space-x-3 flex-wrap">
                            <Siren className="h-6 w-6 md:h-8 md:w-8" />
                            <span className="text-center">EMERGENCY VEHICLE DETECTED</span>
                            <Siren className="h-6 w-6 md:h-8 md:w-8" />
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-6">
                        <div className="text-center space-y-2">
                            <Badge className="bg-status-critical/20 text-status-critical border-status-critical text-base md:text-lg px-4 py-2">
                                {getVehicleLabel()}
                            </Badge>
                            <div className="text-base md:text-lg text-foreground">
                                <strong>Approaching:</strong> {junction}
                            </div>
                            <div className="text-base md:text-lg text-foreground">
                                <strong>Direction:</strong> {approach}
                            </div>
                        </div>
                        <Separator className="bg-border" />
                        <div className="space-y-4">
                            <div className="text-center">
                                {!protocolActive ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center space-x-2 flex-wrap">
                                            <Clock className="h-5 w-5 text-status-warning" />
                                            <span className="text-base md:text-lg text-status-warning text-center">
                        Activating Green Corridor Protocol in
                      </span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold text-status-warning glow-primary">
                                            {countdown}s
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Modal will auto-close in {countdown} seconds
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center space-x-2 flex-wrap">
                                            <CheckCircle className="h-6 w-6 text-status-online" />
                                            <span className="text-base md:text-lg text-status-online font-semibold text-center">
                        GREEN CORRIDOR PROTOCOL ACTIVE
                      </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            All lights along the emergency route have been coordinated
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>Emergency Route Status</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span>Current Junction</span>
                                            <Badge className="status-green text-xs">Clear</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Next Junction</span>
                                            <Badge className="status-yellow text-xs">Clearing</Badge>
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
                            <div className="bg-status-warning/10 border border-status-warning/30 rounded-lg p-4">
                                <div className="flex items-start space-x-2 text-status-warning text-sm">
                                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span className="font-medium">
                    Manual overrides are temporarily disabled during emergency
                    protocol
                  </span>
                                </div>
                            </div>
                            <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                                <h4 className="font-semibold text-sm text-foreground">
                                    Emergency Protocol Steps:
                                </h4>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${ protocolActive ? 'bg-status-online' : 'bg-status-warning'}`} />
                                        <span>Traffic lights clearing emergency route</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${ protocolActive ? 'bg-status-online' : 'bg-muted'}`} />
                                        <span>Pedestrian signals secured</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${ protocolActive ? 'bg-status-online' : 'bg-muted'}`} />
                                        <span>Cross-traffic held</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${ protocolActive ? 'bg-status-online' : 'bg-muted'}`} />
                                        <span>Emergency vehicle path optimized</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4 pb-6">
                            <Button
                                onClick={handleClose}
                                className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 md:px-8 py-2 md:py-3 text-base md:text-lg"
                            >
                                {protocolActive ? 'Acknowledge' : 'Close'}
                            </Button>
                            {!protocolActive && (
                                <Button
                                    onClick={handleClose}
                                    variant="outline"
                                    className="px-6 md:px-8 py-2 md:py-3 text-base md:text-lg border-status-critical text-status-critical hover:bg-status-critical/10"
                                >
                                    Cancel Protocol
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #ef4444, #dc2626);
            border-radius: 6px;
            border: 2px solid rgba(255, 255, 255, 0.1);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #dc2626, #b91c1c);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ef4444 rgba(255, 255, 255, 0.1);
          }
        `}</style>
            </DialogContent>
        </Dialog>
    );
};

export default EmergencyAlert;