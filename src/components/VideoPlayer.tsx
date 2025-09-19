import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Maximize } from 'lucide-react';

interface VideoPlayerProps {
    direction: string;
    isPlaying: boolean;
    onPlayToggle: () => void;
    videoSrc: string; // ✅ added for video file
}

interface DetectionBox {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    confidence: number;
    type: 'car' | 'truck' | 'bus' | 'motorcycle';
}

const VideoPlayer = ({ direction, isPlaying, onPlayToggle, videoSrc }: VideoPlayerProps) => {
    const [detections, setDetections] = useState<DetectionBox[]>([]);
    const [currentFrame, setCurrentFrame] = useState(0);

    // Simulate AI detection updates
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentFrame(prev => prev + 1);

            const newDetections: DetectionBox[] = [];
            const numVehicles = Math.floor(Math.random() * 6) + 2;
            const vehicleTypes = ['car', 'truck', 'bus', 'motorcycle'] as const;

            for (let i = 0; i < numVehicles; i++) {
                const type = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
                newDetections.push({
                    id: `${direction}-${i}-${currentFrame}`,
                    x: Math.random() * 70 + 5, // 5-75% from left
                    y: Math.random() * 60 + 10, // 10-70% from top
                    width: type === 'truck' || type === 'bus' ? Math.random() * 15 + 15 : Math.random() * 10 + 8,
                    height: type === 'truck' || type === 'bus' ? Math.random() * 8 + 12 : Math.random() * 6 + 6,
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                    confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
                    type
                });
            }

            setDetections(newDetections);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying, direction, currentFrame]);

    const getBoxColor = (type: string) => {
        switch (type) {
            case 'car': return 'border-chart-primary bg-chart-primary/10';
            case 'truck': return 'border-chart-secondary bg-chart-secondary/10';
            case 'bus': return 'border-status-warning bg-status-warning/10';
            case 'motorcycle': return 'border-chart-tertiary bg-chart-tertiary/10';
            default: return 'border-primary bg-primary/10';
        }
    };

    return (
        <div className="video-container group relative w-full h-64 rounded-lg overflow-hidden">
            {/* Actual Video */}
            <video
                src={videoSrc}
                autoPlay={isPlaying}
                controls={false}
                muted
                loop
                className="w-full h-full object-cover"
            />

            {/* AI Detection Overlays */}
            {detections.map(detection => (
                <div
                    key={detection.id}
                    className={`absolute border-2 ${getBoxColor(detection.type)} rounded`}
                    style={{
                        left: `${detection.x}%`,
                        top: `${detection.y}%`,
                        width: `${detection.width}%`,
                        height: `${detection.height}%`
                    }}
                >
                    <div className="text-xs text-white bg-black/50 p-0.5 rounded">
                        {detection.label}: {detection.confidence}%
                    </div>
                </div>
            ))}

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 flex items-center justify-center">
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={onPlayToggle}
                        className="bg-black/50 hover:bg-black/70 text-white border-white/20"
                    >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        className="bg-black/50 hover:bg-black/70 text-white border-white/20"
                    >
                        <Maximize className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Live Indicator */}
            {isPlaying && (
                <div className="absolute top-2 left-2 flex items-center space-x-2 bg-black/60 px-2 py-1 rounded text-white text-xs">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span>LIVE</span>
                </div>
            )}

            {/* Detection Count */}
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-xs">
                Vehicles: {detections.length}
            </div>
        </div>
    );
};

export default VideoPlayer;
