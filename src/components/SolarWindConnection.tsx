import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface SolarWindConnectionProps {
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  color1: string;
  color2: string;
  overlapPercentage: number;
  onHover?: (isHovered: boolean) => void;
}

export const SolarWindConnection = ({ 
  startPosition, 
  endPosition,
  color1,
  color2,
  overlapPercentage,
  onHover
}: SolarWindConnectionProps) => {
  const lineRef = useRef<any>(null);
  
  // Create curved path between planets
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(...startPosition),
    new THREE.Vector3(startPosition[0] * 0.5, startPosition[1] + 2, startPosition[2] * 0.5),
    new THREE.Vector3(endPosition[0] * 0.5, endPosition[1] + 2, endPosition[2] * 0.5),
    new THREE.Vector3(...endPosition)
  );

  const points = curve.getPoints(50);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      const time = state.clock.elapsedTime;
      
      // Musical tempo: 90 BPM for flowing audio stream effect
      const beatTime = (90 / 60) * time * Math.PI * 2;
      
      // Smooth equalizer-like pulsing with easing
      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const beatPhase = (Math.sin(beatTime) + 1) / 2;
      const pulse = easeInOut(beatPhase);
      
      // Flow opacity like audio levels
      const baseOpacity = (overlapPercentage / 100) * 0.4;
      material.opacity = baseOpacity + pulse * 0.25;
      
      // Gentle color blend synced to rhythm (slower than beat)
      const blendTime = time * 0.3;
      const blendFactor = (Math.sin(blendTime) + 1) / 2;
      const c1 = new THREE.Color(color1);
      const c2 = new THREE.Color(color2);
      material.color.lerpColors(c1, c2, blendFactor);
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color1}
      lineWidth={2.5}
      transparent
      opacity={0.4}
      blending={THREE.AdditiveBlending}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        onHover?.(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover?.(false);
      }}
    />
  );
};
