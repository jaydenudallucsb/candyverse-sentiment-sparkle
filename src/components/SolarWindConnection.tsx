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
      
      // Pulse effect based on overlap percentage
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      material.opacity = (overlapPercentage / 100) * pulse * 0.5;
      
      // Color blend animation
      const blendFactor = (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 2;
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
      lineWidth={2}
      transparent
      opacity={0.4}
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
