import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from '@/data/sentimentData';

interface PlanetAtmosphereProps {
  platform: Platform;
  sentiment: number;
  radius?: number;
}

export const PlanetAtmosphere = ({ 
  platform, 
  sentiment,
  radius = 1.5
}: PlanetAtmosphereProps) => {
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Sentiment-based atmosphere properties
  const getAtmosphereColor = () => {
    const colors = {
      slack: new THREE.Color('#6366f1'), // Deep purple
      discord: new THREE.Color('#5865F2'), // Soft blue
      teams: new THREE.Color('#6264A7'), // Pale blue
    };
    return colors[platform];
  };

  const getTurbulenceIntensity = () => {
    // More negative sentiment = more turbulence
    const baseIntensity = Math.abs(sentiment) / 100;
    return {
      slack: baseIntensity * 1.2, // -0.086, mild turbulence
      discord: baseIntensity * 0.3, // -0.012, steady waves
      teams: baseIntensity * 0.6, // -0.041, faint static
    }[platform];
  };

  useFrame((state) => {
    if (atmosphereRef.current) {
      const time = state.clock.elapsedTime;
      const turbulence = getTurbulenceIntensity();
      
      // Gentle pulsing with turbulence
      const pulse = Math.sin(time * 2) * 0.05 * turbulence + 0.95;
      atmosphereRef.current.scale.setScalar(pulse);
      
      // Subtle rotation
      atmosphereRef.current.rotation.y += 0.001;
      
      // Opacity variation based on turbulence
      if (atmosphereRef.current.material) {
        const material = atmosphereRef.current.material as THREE.MeshBasicMaterial;
        const opacity = 0.15 + Math.sin(time * 3) * 0.05 * turbulence;
        material.opacity = opacity;
      }
    }
  });

  return (
    <Sphere ref={atmosphereRef} args={[radius, 32, 32]}>
      <meshBasicMaterial
        color={getAtmosphereColor()}
        transparent
        opacity={0.2}
        side={THREE.BackSide}
      />
    </Sphere>
  );
};
