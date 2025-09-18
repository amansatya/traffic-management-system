import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface TrafficLight3DProps {
  status: 'red' | 'yellow' | 'green';
}

const TrafficLightModel = ({ status }: { status: 'red' | 'yellow' | 'green' }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getLightColor = (lightType: 'red' | 'yellow' | 'green', active: boolean) => {
    if (!active) return '#333333';
    switch (lightType) {
      case 'red': return '#ff0000';
      case 'yellow': return '#ffff00';
      case 'green': return '#00ff00';
      default: return '#333333';
    }
  };

  return (
    <group ref={groupRef}>
      {/* Traffic Light Pole */}
      <Box position={[0, -2, 0]} args={[0.2, 4, 0.2]}>
        <meshPhongMaterial color="#666666" />
      </Box>
      
      {/* Traffic Light Housing */}
      <Box position={[0, 1, 0]} args={[0.8, 2.4, 0.4]}>
        <meshPhongMaterial color="#333333" />
      </Box>
      
      {/* Red Light */}
      <Sphere position={[0, 1.8, 0.25]} args={[0.25]}>
        <meshPhongMaterial 
          color={getLightColor('red', status === 'red')} 
          emissive={status === 'red' ? '#ff0000' : '#000000'}
          emissiveIntensity={status === 'red' ? 0.3 : 0}
        />
      </Sphere>
      
      {/* Yellow Light */}
      <Sphere position={[0, 1, 0.25]} args={[0.25]}>
        <meshPhongMaterial 
          color={getLightColor('yellow', status === 'yellow')} 
          emissive={status === 'yellow' ? '#ffff00' : '#000000'}
          emissiveIntensity={status === 'yellow' ? 0.3 : 0}
        />
      </Sphere>
      
      {/* Green Light */}
      <Sphere position={[0, 0.2, 0.25]} args={[0.25]}>
        <meshPhongMaterial 
          color={getLightColor('green', status === 'green')} 
          emissive={status === 'green' ? '#00ff00' : '#000000'}
          emissiveIntensity={status === 'green' ? 0.3 : 0}
        />
      </Sphere>
    </group>
  );
};

const TrafficLight3D = ({ status }: TrafficLight3DProps) => {
  return (
    <div className="h-32 w-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <TrafficLightModel status={status} />
      </Canvas>
    </div>
  );
};

export default TrafficLight3D;