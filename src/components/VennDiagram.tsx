import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface VennData {
  all3: { size: number; sentiment: { slack: number; discord: number; teams: number }; label: string };
  discordOnly: { size: number; sentiment: number; label: string };
  teamsOnly: { size: number; sentiment: number; label: string };
  slackOnly: { size: number; sentiment: number; label: string };
}

interface VennDiagramProps {
  data: VennData;
}

export const VennDiagram = ({ data }: VennDiagramProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const getPercentage = (size: number) => ((size / 4662) * 100).toFixed(1);

  return (
    <div className="w-full h-[600px] relative flex items-center justify-center">
      {/* SVG Venn Diagram */}
      <svg viewBox="0 0 800 600" className="w-full h-full">
        <defs>
          {/* Gradients */}
          <radialGradient id="slackGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--slack))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--slack))" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="discordGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="teamsGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--slack))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Slack Circle (Left) */}
        <motion.circle
          cx="280"
          cy="300"
          r="180"
          fill="url(#slackGradient)"
          stroke="hsl(var(--slack))"
          strokeWidth="3"
          opacity={hoveredSection === null || hoveredSection === 'slack' ? 1 : 0.3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setHoveredSection('slack')}
          onMouseLeave={() => setHoveredSection(null)}
          className="cursor-pointer"
        />

        {/* Discord Circle (Right) */}
        <motion.circle
          cx="520"
          cy="300"
          r="180"
          fill="url(#discordGradient)"
          stroke="hsl(var(--accent))"
          strokeWidth="3"
          opacity={hoveredSection === null || hoveredSection === 'discord' ? 1 : 0.3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onMouseEnter={() => setHoveredSection('discord')}
          onMouseLeave={() => setHoveredSection(null)}
          className="cursor-pointer"
        />

        {/* Teams Circle (Bottom) */}
        <motion.circle
          cx="400"
          cy="420"
          r="180"
          fill="url(#teamsGradient)"
          stroke="hsl(var(--secondary))"
          strokeWidth="3"
          opacity={hoveredSection === null || hoveredSection === 'teams' ? 1 : 0.3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onMouseEnter={() => setHoveredSection('teams')}
          onMouseLeave={() => setHoveredSection(null)}
          className="cursor-pointer"
        />

        {/* Center Intersection (All 3) - The Mega Cluster */}
        <motion.circle
          cx="400"
          cy="340"
          r="90"
          fill="url(#centerGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          opacity={hoveredSection === null || hoveredSection === 'all3' ? 1 : 0.3}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          onMouseEnter={() => setHoveredSection('all3')}
          onMouseLeave={() => setHoveredSection(null)}
          className="cursor-pointer"
        />

        {/* Labels */}
        <text
          x="200"
          y="200"
          fontSize="22"
          fontWeight="300"
          fill="hsl(var(--slack))"
          textAnchor="middle"
        >
          Slack
        </text>
        <text
          x="600"
          y="200"
          fontSize="22"
          fontWeight="300"
          fill="hsl(var(--accent))"
          textAnchor="middle"
        >
          Discord
        </text>
        <text
          x="400"
          y="540"
          fontSize="22"
          fontWeight="300"
          fill="hsl(var(--secondary))"
          textAnchor="middle"
        >
          Teams
        </text>

        {/* Center Label */}
        <text
          x="400"
          y="330"
          fontSize="32"
          fontWeight="300"
          fill="white"
          textAnchor="middle"
        >
          84%
        </text>
        <text
          x="400"
          y="355"
          fontSize="16"
          fontWeight="300"
          fill="white"
          textAnchor="middle"
          opacity="0.9"
        >
          Universal
        </text>
      </svg>

      {/* Info Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {hoveredSection === 'all3' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="glass p-6 rounded-xl border-2 border-primary/50 min-w-[350px]">
              <h3 className="text-3xl font-light text-primary mb-3">{data.all3.label}</h3>
              <p className="text-sm text-foreground/70 mb-4">
                <span className="font-light text-2xl text-primary tabular-nums">{data.all3.size.toLocaleString()}</span> comments ({getPercentage(data.all3.size)}%)
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Slack sentiment:</span>
                  <Badge variant={data.all3.sentiment.slack > 0 ? 'default' : 'destructive'}>
                    {data.all3.sentiment.slack.toFixed(3)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Discord sentiment:</span>
                  <Badge variant={data.all3.sentiment.discord > 0 ? 'default' : 'destructive'}>
                    {data.all3.sentiment.discord.toFixed(3)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Teams sentiment:</span>
                  <Badge variant={data.all3.sentiment.teams > 0 ? 'default' : 'destructive'}>
                    {data.all3.sentiment.teams.toFixed(3)}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-foreground/60 mt-4 italic">
                🎯 Slack leads with +0.236 sentiment in universal features
              </p>
            </div>
          </motion.div>
        )}

        {hoveredSection === 'discord' && data.discordOnly.size > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-1/4 right-8 pointer-events-auto"
          >
            <div className="glass p-5 rounded-xl border-2 border-accent/50 min-w-[280px]">
              <h3 className="text-2xl font-light text-accent mb-2">{data.discordOnly.label}</h3>
              <p className="text-sm text-foreground/70 mb-3">
                <span className="font-light text-xl text-accent tabular-nums">{data.discordOnly.size}</span> comments ({getPercentage(data.discordOnly.size)}%)
              </p>
              <Badge variant="secondary">Sentiment: {data.discordOnly.sentiment.toFixed(3)}</Badge>
              <p className="text-xs text-foreground/60 mt-3 italic">
                Discord-exclusive discussions
              </p>
            </div>
          </motion.div>
        )}

        {hoveredSection === 'teams' && data.teamsOnly.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
          >
            <div className="glass p-5 rounded-xl border-2 border-secondary/50 min-w-[280px]">
              <h3 className="text-2xl font-light text-secondary mb-2">{data.teamsOnly.label}</h3>
              <p className="text-sm text-foreground/70 mb-3">
                <span className="font-light text-xl text-secondary tabular-nums">{data.teamsOnly.size}</span> comments ({getPercentage(data.teamsOnly.size)}%)
              </p>
              <Badge variant="secondary">Sentiment: {data.teamsOnly.sentiment.toFixed(3)}</Badge>
              <p className="text-xs text-foreground/60 mt-3 italic">
                Teams-specific feedback
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
