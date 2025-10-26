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
  
  // Sentiment-based atmosphere properties with FeedMusic color palette
  const getAtmosphereColor = () => {
    const colors = {
      slack: new THREE.Color('hsl(186, 94%, 40%)'), // Teal - matches design system
      discord: new THREE.Color('hsl(217, 91%, 60%)'), // Primary blue
      teams: new THREE.Color('hsl(215, 20%, 65%)'), // Secondary slate
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

  // Musical rhythm parameters
  const getRhythmParams = () => {
    return {
      slack: { bpm: 80, waveFreq: 2.5, amplitude: 0.08 }, // Slow, deep waves
      discord: { bpm: 100, waveFreq: 4.0, amplitude: 0.04 }, // Steady, medium waves
      teams: { bpm: 90, waveFreq: 3.2, amplitude: 0.05 }, // Gentle pulses
    }[platform];
  };

  useFrame((state) => {
    if (atmosphereRef.current) {
      const time = state.clock.elapsedTime;
      const turbulence = getTurbulenceIntensity();
      const rhythm = getRhythmParams();
      
      // Musical rhythm: convert BPM to radians per second
      const beatTime = (rhythm.bpm / 60) * time * Math.PI * 2;
      
      // Rhythmic sound wave pulsing with smooth easing
      const beatPulse = Math.sin(beatTime) * rhythm.amplitude;
      const wavePulse = Math.sin(time * rhythm.waveFreq) * 0.03 * turbulence;
      const scale = 1 + beatPulse + wavePulse;
      
      atmosphereRef.current.scale.setScalar(scale);
      
      // Slow, continuous rotation like a vinyl record
      atmosphereRef.current.rotation.y += 0.0008;
      
      // Rhythmic opacity variation synced to beat
      if (atmosphereRef.current.material) {
        const material = atmosphereRef.current.material as THREE.MeshBasicMaterial;
        const baseOpacity = 0.18;
        const opacityPulse = Math.sin(beatTime * 0.5) * 0.08;
        material.opacity = baseOpacity + opacityPulse;
      }
    }
  });

  return (
    <Sphere ref={atmosphereRef} args={[radius, 32, 32]}>
      <meshBasicMaterial
        color={getAtmosphereColor()}
        transparent
        opacity={0.18}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
};
