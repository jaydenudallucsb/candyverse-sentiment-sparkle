import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, Quote, Globe, Layers, Eye, EyeOff } from 'lucide-react';
import { CandyPlanet } from '@/components/CandyPlanet';
import { CompetitiveMoon } from '@/components/CompetitiveMoon';
import { CandyCluster } from '@/components/CandyCluster';
import { ComparisonRing } from '@/components/ComparisonRing';
import { TimeSlider } from '@/components/TimeSlider';
import { CompetitiveInsightsPanel } from '@/components/CompetitiveInsightsPanel';
import { sentimentData, Platform } from '@/data/sentimentData';
import { getClusterInsights, getComparisonMetrics, ComparisonInsight } from '@/utils/clusteringUtils';

const Candyverse = () => {
  const navigate = useNavigate();
  const [selectedCompetitor, setSelectedCompetitor] = useState<Platform | null>(null);
  const [timeIndex, setTimeIndex] = useState(6);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [hoveredInsight, setHoveredInsight] = useState<ComparisonInsight | null>(null);

  const clusterInsights = getClusterInsights();
  const comparisonMetrics = getComparisonMetrics();

  const handlePlanetClick = (platform: Platform) => {
    navigate(`/platform/${platform}`);
  };

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setTimeIndex((prev) => {
        if (prev >= 6) {
          setIsPlaying(false);
          return 6;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const slackData = sentimentData.find(d => d.platform === 'slack')!;
  const competitorData = sentimentData.filter(d => d.platform !== 'slack');

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-light text-foreground tracking-tight animate-fade-in">
            The Sentiment Universe
          </h1>
          <p className="text-2xl text-foreground/70 leading-relaxed">
            Slack sits at the center at <span className="text-slack font-bold text-3xl animate-pulse-glow">{slackData.overallSentiment}%</span> sentiment. 
            Orbiting competitors reveal market trends, threats, and opportunities.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(var(--primary),0.3)]"
        >
          <div className="h-[700px] relative bg-gradient-to-b from-background via-primary/5 to-background">
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 3, 10]} />
                <OrbitControls
                  enablePan={false}
                  minDistance={6}
                  maxDistance={18}
                  maxPolarAngle={Math.PI / 2}
                />
                
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <pointLight position={[-10, -10, -10]} intensity={0.6} />
                    
                    <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
                    
                    {/* Central Slack Planet (larger) */}
                    <CandyPlanet
                      platform="slack"
                      position={[0, 0, 0]}
                      sentiment={slackData.overallSentiment}
                      onClick={() => handlePlanetClick('slack')}
                      isSelected={selectedCompetitor === null}
                      comparisonActive={comparisonMode}
                    />

                    {/* Comparison Ring around Slack */}
                    <ComparisonRing
                      insights={clusterInsights}
                      isActive={comparisonMode}
                      onSegmentHover={setHoveredInsight}
                    />
                    
                    {/* Slack's Topic Clusters */}
                    {slackData.topics.map((topic, index) => {
                      const angle = (index / slackData.topics.length) * Math.PI * 2;
                      const radius = 2.2;
                      const clusterSize = Math.min(0.3, (topic.mentions / 2000) * 0.5);
                      
                      return (
                        <CandyCluster
                          key={topic.id}
                          position={[
                            Math.cos(angle) * radius,
                            Math.sin(index) * 0.5,
                            Math.sin(angle) * radius,
                          ]}
                          sentiment={topic.sentiment}
                          size={clusterSize}
                          engagement={topic.engagement}
                        />
                      );
                    })}
                    
                    {/* Competitor Moons (orbiting) */}
                    {competitorData.map((data, index) => {
                      // Calculate similarity based on sentiment proximity to Slack
                      const similarityScore = 1 - Math.abs(data.overallSentiment - slackData.overallSentiment) / 100;
                      
                      return (
                        <CompetitiveMoon
                          key={data.platform}
                          platform={data.platform}
                          orbitRadius={5}
                          orbitSpeed={0.3}
                          sentiment={data.overallSentiment}
                          onClick={() => handlePlanetClick(data.platform)}
                          isSelected={selectedCompetitor === data.platform}
                          timeOffset={index * Math.PI}
                          similarityScore={similarityScore}
                        />
                      );
                    })}
                  </Suspense>
                </Canvas>
                
                {/* Comparison Toggle & Legend */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                  <Button
                    onClick={() => setComparisonMode(!comparisonMode)}
                    variant={comparisonMode ? "default" : "outline"}
                    className="gap-2 glass hover:scale-105 transition-all duration-300"
                  >
                    {comparisonMode ? <EyeOff className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                    {comparisonMode ? 'Hide' : 'Compare All'}
                  </Button>

                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl glass border border-slack/30 hover:border-slack hover:bg-slack/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="w-5 h-5 rounded-full bg-slack animate-pulse-glow" />
                      <span className="font-semibold">Slack</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl glass border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-accent animate-pulse-glow" />
                      <span className="font-semibold">Discord</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl glass border border-secondary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-secondary animate-pulse-glow" />
                      <span className="font-semibold">Teams</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

        {/* Time Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300"
        >
          <div className="p-8">
            <TimeSlider
              value={timeIndex}
              onChange={setTimeIndex}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
            />
          </div>
        </motion.div>

        {/* Cross-Platform Comparison Metrics */}
        <AnimatePresence>
          {comparisonMode && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="glass rounded-2xl border-2 border-primary/40 overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-light text-foreground">Cross-Platform Intelligence</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-xl bg-slack/10 border border-slack/30">
                    <p className="text-sm text-foreground/70 mb-2">Slack Avg Sentiment</p>
                    <p className="text-4xl font-bold text-slack">{comparisonMetrics.slack.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-accent/10 border border-accent/30">
                    <p className="text-sm text-foreground/70 mb-2">Discord Avg Sentiment</p>
                    <p className="text-4xl font-bold text-accent">{comparisonMetrics.discord.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-secondary/10 border border-secondary/30">
                    <p className="text-sm text-foreground/70 mb-2">Teams Avg Sentiment</p>
                    <p className="text-4xl font-bold text-secondary">{comparisonMetrics.teams.toFixed(2)}</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground/70 mb-2">Dataset Overview</p>
                  <p className="text-lg text-foreground">
                    Analyzed <span className="font-bold text-primary">{comparisonMetrics.totalComments.toLocaleString()}</span> comments 
                    across <span className="font-bold text-primary">{comparisonMetrics.totalClusters}</span> semantic clusters
                  </p>
                </div>

                {hoveredInsight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-primary/40"
                  >
                    <Badge className="mb-3">{hoveredInsight.category.replace('_', ' ')}</Badge>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{hoveredInsight.label}</h3>
                    <p className="text-foreground/80 mb-4">{hoveredInsight.summary}</p>
                    <div className="flex gap-3">
                      <div className="flex-1 text-center p-3 rounded-lg bg-slack/20">
                        <p className="text-xs text-foreground/70">Slack</p>
                        <p className="text-lg font-bold text-slack">{hoveredInsight.slackSentiment.toFixed(2)}</p>
                      </div>
                      <div className="flex-1 text-center p-3 rounded-lg bg-accent/20">
                        <p className="text-xs text-foreground/70">Discord</p>
                        <p className="text-lg font-bold text-accent">{hoveredInsight.discordSentiment.toFixed(2)}</p>
                      </div>
                      <div className="flex-1 text-center p-3 rounded-lg bg-secondary/20">
                        <p className="text-xs text-foreground/70">Teams</p>
                        <p className="text-lg font-bold text-secondary">{hoveredInsight.teamsSentiment.toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slack Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border-2 border-slack/30 hover:border-slack/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--slack),0.2)]"
        >
          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-light text-foreground">Slack Platform Status</h2>
              <Badge
                variant={slackData.sentimentChange >= 0 ? "default" : "destructive"}
                className="gap-1"
              >
                {slackData.sentimentChange > 0 && <TrendingUp className="w-3 h-3" />}
                {slackData.sentimentChange < 0 && <TrendingDown className="w-3 h-3" />}
                {slackData.sentimentChange === 0 && <Minus className="w-3 h-3" />}
                {slackData.sentimentChange > 0 ? '+' : ''}{slackData.sentimentChange}%
              </Badge>
            </div>

            <div className="space-y-4">
              <p className="text-base text-foreground/70 font-medium">Overall Sentiment</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden shadow-inner relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-destructive via-warning to-success rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${slackData.overallSentiment}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
                  />
                </div>
                <motion.span 
                  className="font-bold text-3xl text-slack tabular-nums"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {slackData.overallSentiment}%
                </motion.span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-4">
              {slackData.topics.map((topic, index) => (
                <motion.div 
                  key={topic.id} 
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border-2 border-border/30 hover:border-slack/50 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <p className="text-sm text-foreground/70 mb-2 font-medium">{topic.topic}</p>
                  <p className="font-bold text-2xl text-slack mb-2">{topic.mentions}</p>
                  <Badge
                    variant={
                      topic.sentiment === 'positive'
                        ? 'default'
                        : topic.sentiment === 'negative'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="text-xs"
                  >
                    {topic.sentiment}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Competitive Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CompetitiveInsightsPanel selectedCompetitor={selectedCompetitor} />
        </motion.div>

        {/* Competitor Moon Preview with View Details Button */}
        <AnimatePresence mode="wait">
          {selectedCompetitor && (
            <motion.div
              key={selectedCompetitor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-500"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-light text-foreground">
                    {sentimentData.find(d => d.platform === selectedCompetitor)?.name} Moon Preview
                  </h2>
                  <button
                    onClick={() => handlePlanetClick(selectedCompetitor)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300"
                  >
                    View Full Details →
                  </button>
                </div>

                <div className="space-y-4">
                  {sentimentData.find(d => d.platform === selectedCompetitor)?.topics.map((topic) => (
                    <div key={topic.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{topic.topic}</span>
                        <Badge
                          variant={
                            topic.sentiment === 'positive'
                              ? 'default'
                              : topic.sentiment === 'negative'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {topic.sentiment}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/60">
                        {topic.mentions.toLocaleString()} mentions
                      </p>
                      <div className="p-3 rounded-lg bg-background/30 border border-border/30 border-l-2 border-l-primary">
                        <div className="flex gap-2 items-start">
                          <Quote className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm italic text-foreground/80">{topic.quotes[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Candyverse;
