import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ComparisonInsight } from '@/utils/clusteringUtils';

interface ComparisonRingProps {
  insights: ComparisonInsight[];
  isActive: boolean;
  onSegmentHover?: (insight: ComparisonInsight | null) => void;
}

export const ComparisonRing = ({ insights, isActive, onSegmentHover }: ComparisonRingProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.z += 0.001;
      
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  if (!isActive) return null;

  const ringRadius = 2;
  const segmentWidth = (Math.PI * 2) / insights.length;

  return (
    <group ref={groupRef}>
      {/* Main ring structure */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ringRadius - 0.15, ringRadius + 0.15, 64]} />
        <meshBasicMaterial
          color="hsl(var(--slack))"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Segmented insights */}
      {insights.map((insight, index) => {
        const startAngle = index * segmentWidth;
        const endAngle = (index + 1) * segmentWidth;
        const midAngle = (startAngle + endAngle) / 2;
        
        const isHovered = hoveredIndex === index;
        const scale = isHovered ? 1.15 : 1;
        const opacity = isHovered ? 0.8 : 0.4;

        return (
          <group key={index} rotation={[0, 0, midAngle]}>
            {/* Segment arc */}
            <mesh
              position={[ringRadius, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[scale, scale, 1]}
              onPointerOver={() => {
                setHoveredIndex(index);
                onSegmentHover?.(insight);
              }}
              onPointerOut={() => {
                setHoveredIndex(null);
                onSegmentHover?.(null);
              }}
            >
              <ringGeometry args={[0.1, 0.25, 32, 1, startAngle - midAngle, segmentWidth]} />
              <meshBasicMaterial
                color={insight.color}
                transparent
                opacity={opacity}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Category indicator dot */}
            <mesh position={[ringRadius, 0, 0.1]}>
              <sphereGeometry args={[isHovered ? 0.08 : 0.05, 16, 16]} />
              <meshBasicMaterial
                color={insight.color}
                transparent
                opacity={isHovered ? 1 : 0.7}
              />
            </mesh>

            {/* Label on hover */}
            {isHovered && (
              <Html
                position={[ringRadius + 0.8, 0, 0]}
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                <div className="glass p-3 rounded-lg border border-primary/30 min-w-[250px] backdrop-blur-md">
                  <p className="font-bold text-sm mb-1 text-foreground">{insight.label}</p>
                  <p className="text-xs text-foreground/80 mb-2">{insight.summary}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-slack/20 text-slack">
                      S: {insight.slackSentiment.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 rounded bg-accent/20 text-accent">
                      D: {insight.discordSentiment.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 rounded bg-secondary/20 text-secondary">
                      T: {insight.teamsSentiment.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Pulsing center glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ringRadius - 0.3, ringRadius + 0.3, 64]} />
        <meshBasicMaterial
          color="hsl(var(--slack))"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
