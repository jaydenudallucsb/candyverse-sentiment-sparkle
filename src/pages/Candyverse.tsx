import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Quote, Globe } from 'lucide-react';
import { CandyPlanet } from '@/components/CandyPlanet';
import { CompetitiveMoon } from '@/components/CompetitiveMoon';
import { CandyCluster } from '@/components/CandyCluster';
import { TimeSlider } from '@/components/TimeSlider';
import { CompetitiveInsightsPanel } from '@/components/CompetitiveInsightsPanel';
import { sentimentData, Platform } from '@/data/sentimentData';

const Candyverse = () => {
  const navigate = useNavigate();
  const [selectedCompetitor, setSelectedCompetitor] = useState<Platform | null>(null);
  const [timeIndex, setTimeIndex] = useState(6);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-caramel/10 border border-caramel/20">
              <Globe className="w-8 h-8 text-caramel" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-caramel via-primary to-caramel bg-clip-text text-transparent">
                Slack's Candyverse
              </h1>
              <p className="text-muted-foreground">Your sentiment universe with competitive intelligence from Discord and Teams moons</p>
            </div>
          </div>
          
          <Card className="border-caramel/20 bg-caramel/5">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Welcome to Slack's Caramel Core.</strong> At the center of this universe, 
                Slack's sentiment glows at <span className="font-semibold text-caramel">{slackData.overallSentiment}%</span>. 
                Orbiting around are Discord and Teams - competitor moons revealing trends, threats, and opportunities. 
                Click any moon to discover actionable insights for Slack's product strategy.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="h-[600px] bg-gradient-to-b from-background to-muted/20 relative">
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
                    {competitorData.map((data, index) => (
                      <CompetitiveMoon
                        key={data.platform}
                        platform={data.platform}
                        orbitRadius={5}
                        orbitSpeed={0.3}
                        sentiment={data.overallSentiment}
                        onClick={() => {
                          setSelectedCompetitor(data.platform);
                          // Optional: uncomment to navigate immediately on moon click
                          // handlePlanetClick(data.platform);
                        }}
                        isSelected={selectedCompetitor === data.platform}
                        timeOffset={index * Math.PI}
                      />
                    ))}
                  </Suspense>
                </Canvas>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-6 text-xs">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                    <div className="w-4 h-4 rounded-full bg-caramel" />
                    <span className="font-medium">Slack (Center)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="font-medium">Discord Moon</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span className="font-medium">Teams Moon</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <TimeSlider
                value={timeIndex}
                onChange={setTimeIndex}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Slack Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 border-caramel/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Slack's Caramel Core Status</span>
                <Badge
                  variant={slackData.sentimentChange >= 0 ? "default" : "destructive"}
                  className="gap-1"
                >
                  {slackData.sentimentChange > 0 && <TrendingUp className="w-3 h-3" />}
                  {slackData.sentimentChange < 0 && <TrendingDown className="w-3 h-3" />}
                  {slackData.sentimentChange === 0 && <Minus className="w-3 h-3" />}
                  {slackData.sentimentChange > 0 ? '+' : ''}{slackData.sentimentChange}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Overall Sentiment</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-destructive via-warning to-success transition-all duration-500"
                      style={{ width: `${slackData.overallSentiment}%` }}
                    />
                  </div>
                  <span className="font-bold text-xl">{slackData.overallSentiment}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                {slackData.topics.map((topic) => (
                  <div key={topic.id} className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">{topic.topic}</p>
                    <p className="font-semibold text-lg">{topic.mentions}</p>
                    <Badge
                      variant={
                        topic.sentiment === 'positive'
                          ? 'default'
                          : topic.sentiment === 'negative'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="text-xs mt-1"
                    >
                      {topic.sentiment}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
            >
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {sentimentData.find(d => d.platform === selectedCompetitor)?.name} Moon Preview
                    </CardTitle>
                    <button
                      onClick={() => handlePlanetClick(selectedCompetitor)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg transition-all"
                    >
                      View Full Details →
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <p className="text-sm text-muted-foreground">
                        {topic.mentions.toLocaleString()} mentions
                      </p>
                      <div className="p-3 rounded-lg bg-muted/50 border-l-2 border-primary">
                        <div className="flex gap-2 items-start">
                          <Quote className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm italic">{topic.quotes[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Candyverse;
