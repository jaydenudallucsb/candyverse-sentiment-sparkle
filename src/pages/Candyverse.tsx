import { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, Quote, Globe, Layers, Eye, EyeOff, BarChart3, Award } from "lucide-react";
import { CandyPlanet } from "@/components/CandyPlanet";
import { CompetitiveMoon } from "@/components/CompetitiveMoon";
import { CandyCluster } from "@/components/CandyCluster";
import { ComparisonRing } from "@/components/ComparisonRing";
import { TimeSlider } from "@/components/TimeSlider";
import { sentimentData, Platform } from "@/data/sentimentData";
import { getClusterInsights, getComparisonMetrics, ComparisonInsight } from "@/utils/clusteringUtils";

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

  const slackData = sentimentData.find((d) => d.platform === "slack")!;
  const competitorData = sentimentData.filter((d) => d.platform !== "slack");

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
            Slack sits at the center at{" "}
            <span className="text-slack font-bold text-3xl animate-pulse-glow">{slackData.overallSentiment}%</span>{" "}
            sentiment. Orbiting competitors reveal market trends, threats, and opportunities.
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
                <OrbitControls enablePan={false} minDistance={6} maxDistance={18} maxPolarAngle={Math.PI / 2} />

                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <pointLight position={[-10, -10, -10]} intensity={0.6} />

                <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

                {/* Central Slack Planet */}
                <CandyPlanet
                  platform="slack"
                  position={[0, 0, 0]}
                  sentiment={slackData.overallSentiment}
                  onClick={() => handlePlanetClick("slack")}
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
                      position={[Math.cos(angle) * radius, Math.sin(index) * 0.5, Math.sin(angle) * radius]}
                      sentiment={topic.sentiment}
                      size={clusterSize}
                      engagement={topic.engagement}
                    />
                  );
                })}

                {/* Competitor Moons */}
                {competitorData.map((data, index) => {
                  // Calculate similarity based on sentiment proximity to Slack
                  const similarityScore = 1 - Math.abs(data.overallSentiment - slackData.overallSentiment) / 100;
                  const angle = index * Math.PI * 1.5; // Increased spacing for better separation
                  const orbitRadius = 5;

                  return (
                    <CompetitiveMoon
                      key={data.platform}
                      platform={data.platform}
                      orbitRadius={orbitRadius}
                      orbitSpeed={0.3}
                      sentiment={data.overallSentiment}
                      onClick={() => handlePlanetClick(data.platform)}
                      isSelected={selectedCompetitor === data.platform}
                      timeOffset={angle}
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
                {comparisonMode ? "Hide" : "Compare All"}
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
                    {sentimentData.find((d) => d.platform === selectedCompetitor)?.name} Moon Preview
                  </h2>
                  <button
                    onClick={() => handlePlanetClick(selectedCompetitor)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300"
                  >
                    View Full Details →
                  </button>
                </div>

                <div className="space-y-4">
                  {sentimentData
                    .find((d) => d.platform === selectedCompetitor)
                    ?.topics.map((topic) => (
                      <div key={topic.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{topic.topic}</span>
                          <Badge
                            variant={
                              topic.sentiment === "positive"
                                ? "default"
                                : topic.sentiment === "negative"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {topic.sentiment}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/60">{topic.mentions.toLocaleString()} mentions</p>
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

      {/* Cross-Platform Intelligence Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-light text-foreground">
            Sentiment Percentages
            <br />
            <span className="text-foreground/60">by Platform</span>
          </h2>
        </div>

        {/* Platform Sentiment Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Slack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-slack/20 hover:border-slack/40 transition-all h-full">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slack/40 to-slack/10 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-slack" />
                </div>
                <CardTitle className="text-center text-2xl font-light text-slack">Slack</CardTitle>
                <CardDescription className="text-center">1,376 total comments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground/80">Positive</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-success">56.5%</p>
                      <p className="text-xs text-foreground/50">778 comments</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-foreground/30" />
                      <span className="text-sm text-foreground/80">Neutral</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-foreground/60">23.0%</p>
                      <p className="text-xs text-foreground/50">316 comments</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-foreground/80">Negative</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-destructive">20.5%</p>
                      <p className="text-xs text-foreground/50">282 comments</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-center text-foreground/60">Average Score</p>
                  <p className="text-3xl font-light text-center text-success">+0.218</p>
                  <p className="text-xs text-center text-foreground/50 mt-1">Slightly positive overall</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Discord */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-accent/20 hover:border-accent/40 transition-all h-full">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-accent" />
                </div>
                <CardTitle className="text-center text-2xl font-light text-accent">Discord</CardTitle>
                <CardDescription className="text-center">1,684 total comments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground/80">Positive</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-success">38.1%</p>
                      <p className="text-xs text-foreground/50">641 comments</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-foreground/30" />
                      <span className="text-sm text-foreground/80">Neutral</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-foreground/60">27.7%</p>
                      <p className="text-xs text-foreground/50">466 comments</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-foreground/80">Negative</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-destructive">34.3%</p>
                      <p className="text-xs text-foreground/50">577 comments</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-center text-foreground/60">Average Score</p>
                  <p className="text-3xl font-light text-center text-foreground/70">+0.011</p>
                  <p className="text-xs text-center text-foreground/50 mt-1">Barely positive/neutral</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Microsoft Teams */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-secondary/20 hover:border-secondary/40 transition-all h-full">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/40 to-secondary/10 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-secondary" />
                </div>
                <CardTitle className="text-center text-2xl font-light text-secondary">Microsoft Teams</CardTitle>
                <CardDescription className="text-center">1,602 total comments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground/80">Positive</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-success">52.5%</p>
                      <p className="text-xs text-foreground/50">841 comments</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-foreground/30" />
                      <span className="text-sm text-foreground/80">Neutral</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-foreground/60">26.5%</p>
                      <p className="text-xs text-foreground/50">424 comments</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-foreground/80">Negative</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-destructive">21.0%</p>
                      <p className="text-xs text-foreground/50">337 comments</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-center text-foreground/60">Average Score</p>
                  <p className="text-3xl font-light text-center text-success">+0.193</p>
                  <p className="text-xs text-center text-foreground/50 mt-1">Slightly positive</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Key Takeaways
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Positive Rankings */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <CardTitle className="text-xl font-light">Positive Sentiment</CardTitle>
                </div>
                <CardDescription className="text-center">Ranking by % Positive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-success" />
                    <span className="font-light">Slack</span>
                  </div>
                  <span className="text-xl font-light text-success">56.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/60">2.</span>
                    <span className="font-light">Teams</span>
                  </div>
                  <span className="text-xl font-light">52.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/60">3.</span>
                    <span className="font-light">Discord</span>
                  </div>
                  <span className="text-xl font-light">38.1%</span>
                </div>
              </CardContent>
            </Card>

            {/* Negative Rankings */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  <CardTitle className="text-xl font-light">Negative Sentiment</CardTitle>
                </div>
                <CardDescription className="text-center">Ranking by % Negative</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-destructive rotate-180" />
                    <span className="font-light">Discord</span>
                  </div>
                  <span className="text-xl font-light text-destructive">34.3%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/60">2.</span>
                    <span className="font-light">Teams</span>
                  </div>
                  <span className="text-xl font-light">21.0%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/60">3.</span>
                    <span className="font-light">Slack</span>
                  </div>
                  <span className="text-xl font-light">20.5%</span>
                </div>
              </CardContent>
            </Card>

            {/* Average Score Rankings */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl font-light">Overall Score</CardTitle>
                </div>
                <CardDescription className="text-center">Average Sentiment Score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-light">Slack</span>
                  </div>
                  <span className="text-xl font-light text-primary">+0.218</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/60">2.</span>
                    <span className="font-light">Teams</span>
                  </div>
                  <span className="text-xl font-light">+0.193</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/60">3.</span>
                    <span className="font-light">Discord</span>
                  </div>
                  <span className="text-xl font-light">+0.011</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default Candyverse;
