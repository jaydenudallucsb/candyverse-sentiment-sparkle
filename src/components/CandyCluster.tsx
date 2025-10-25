import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { SentimentType } from '@/data/sentimentData';

interface CandyClusterProps {
  position: [number, number, number];
  sentiment: SentimentType;
  size: number;
  engagement: number;
  onClick?: () => void;
}

export const CandyCluster = ({ position, sentiment, size, engagement, onClick }: CandyClusterProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
      
      // Subtle rotation
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      
      // Pulsing based on engagement
      const pulse = Math.sin(state.clock.elapsedTime * 3) * engagement * 0.1 + 1;
      meshRef.current.scale.setScalar(size * pulse);
    }
  });

  const getColor = () => {
    switch (sentiment) {
      case 'positive':
        return new THREE.Color('#4ade80'); // Mint green
      case 'neutral':
        return new THREE.Color('#facc15'); // Lemon yellow
      case 'negative':
        return new THREE.Color('#ef4444'); // Cherry red
      default:
        return new THREE.Color('#ffffff');
    }
  };

  return (
    <Sphere
      ref={meshRef}
      args={[size, 32, 32]}
      position={position}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <meshStandardMaterial
        color={getColor()}
        emissive={getColor()}
        emissiveIntensity={engagement * 0.5}
        roughness={0.3}
        metalness={0.2}
        transparent
        opacity={0.8 + engagement * 0.2}
      />
    </Sphere>
  );
};
