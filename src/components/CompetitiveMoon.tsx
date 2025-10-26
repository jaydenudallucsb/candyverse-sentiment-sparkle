import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from '@/data/sentimentData';

interface CompetitiveMoonProps {
  platform: Platform;
  orbitRadius: number;
  orbitSpeed: number;
  sentiment: number;
  onClick?: () => void;
  isSelected?: boolean;
  timeOffset?: number;
  similarityScore?: number; // 0-1, affects orbit distance and speed
}

export const CompetitiveMoon = ({ 
  platform, 
  orbitRadius, 
  orbitSpeed, 
  sentiment, 
  onClick, 
  isSelected,
  timeOffset = 0,
  similarityScore = 0.5
}: CompetitiveMoonProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Orbital rotation around Slack (center)
      // Adjust orbit based on similarity (closer = more similar)
      const adjustedRadius = orbitRadius * (1 - similarityScore * 0.2);
      const adjustedSpeed = orbitSpeed * (1 + similarityScore * 0.3);
      const time = state.clock.elapsedTime * adjustedSpeed + timeOffset;
      groupRef.current.position.x = Math.cos(time) * adjustedRadius;
      groupRef.current.position.z = Math.sin(time) * adjustedRadius;
    }

    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += 0.003;
      
      if (isSelected) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.08;
      }
    }
    
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8;
      glowRef.current.scale.setScalar(1 + pulse * 0.15);
    }
  });

  const getColor = () => {
    const colors = {
      slack: new THREE.Color('#0891b2'), // Should not be used (Slack is center)
      discord: new THREE.Color('#a855f7'), // Purple
      teams: new THREE.Color('#64748b'), // Slate
    };
    
    const baseColor = colors[platform];
    const brightness = 0.5 + (sentiment / 100) * 0.5;
    return baseColor.multiplyScalar(brightness);
  };

  // Platform logo symbol
  const getLogo = () => {
    switch(platform) {
      case 'slack':
        return '#';
      case 'discord':
        return '🎮';
      case 'teams':
        return 'T';
    }
  };

  const moonSize = 0.5; // Smaller than the main Slack planet

  return (
    <group ref={groupRef}>
      {/* Orbit path indicator */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 64]} />
        <meshBasicMaterial color={getColor()} transparent opacity={0.15} />
      </mesh>

      {/* Moon glow */}
      <Sphere ref={glowRef} args={[moonSize * 1.3, 32, 32]}>
        <meshBasicMaterial
          color={getColor()}
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Moon body */}
      <Sphere
        ref={meshRef}
        args={[moonSize, 48, 48]}
        onClick={onClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={0.4}
          roughness={0.5}
          metalness={0.5}
        />
      </Sphere>

      {/* Platform Logo on moon surface */}
      <Billboard position={[0, 0, moonSize + 0.35]}>
        <Text
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
          fontWeight="bold"
        >
          {getLogo()}
        </Text>
      </Billboard>

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[moonSize * 1.2, moonSize * 1.4, 64]} />
          <meshBasicMaterial color={getColor()} transparent opacity={0.7} />
        </mesh>
      )}

      {/* Platform Label */}
      <Text
        position={[0, moonSize + 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {platform.toUpperCase()}
      </Text>
    </group>
  );
};
