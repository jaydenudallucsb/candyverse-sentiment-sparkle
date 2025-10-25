import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from '@/data/sentimentData';

interface CandyPlanetProps {
  platform: Platform;
  position: [number, number, number];
  sentiment: number;
  onClick?: () => void;
  isSelected?: boolean;
}

export const CandyPlanet = ({ platform, position, sentiment, onClick, isSelected }: CandyPlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      
      if (isSelected) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
    
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8;
      glowRef.current.scale.setScalar(1 + pulse * 0.1);
    }
  });

  // Color based on platform and sentiment
  const getColor = () => {
    const colors = {
      slack: new THREE.Color('#0891b2'), // Teal
      discord: new THREE.Color('#a855f7'), // Purple
      teams: new THREE.Color('#64748b'), // Slate
    };
    
    const baseColor = colors[platform];
    
    // Adjust brightness based on sentiment
    const brightness = 0.5 + (sentiment / 100) * 0.5;
    return baseColor.multiplyScalar(brightness);
  };

  const getEmissiveIntensity = () => {
    return sentiment > 70 ? 0.5 : sentiment > 50 ? 0.3 : 0.1;
  };

  return (
    <group position={position}>
      {/* Glow effect */}
      <Sphere ref={glowRef} args={[1.2, 32, 32]}>
        <meshBasicMaterial
          color={getColor()}
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* Main planet */}
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onClick={onClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={getEmissiveIntensity()}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.3, 1.5, 64]} />
          <meshBasicMaterial color={getColor()} transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
};
