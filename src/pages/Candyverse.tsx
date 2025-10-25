import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Quote } from 'lucide-react';
import { CandyPlanet } from '@/components/CandyPlanet';
import { CandyCluster } from '@/components/CandyCluster';
import { TimeSlider } from '@/components/TimeSlider';
import { sentimentData, Platform } from '@/data/sentimentData';

const Candyverse = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>('slack');
  const [timeIndex, setTimeIndex] = useState(6);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const selectedData = sentimentData.find(d => d.platform === selectedPlatform);

  const getPlatformPosition = (platform: Platform): [number, number, number] => {
    const positions = {
      slack: [-3, 0, 0] as [number, number, number],
      discord: [3, 0, 0] as [number, number, number],
      teams: [0, 0, -3] as [number, number, number],
    };
    return positions[platform];
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            The Candyverse
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how sentiment evolves across platforms. Each candy planet tells a story of user emotions.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="h-[600px] bg-gradient-to-b from-background to-muted/20">
                <Canvas>
                  <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 2, 8]} />
                    <OrbitControls
                      enablePan={false}
                      minDistance={5}
                      maxDistance={15}
                      maxPolarAngle={Math.PI / 2}
                    />
                    
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    
                    <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
                    
                    {/* Planets */}
                    {sentimentData.map((data) => (
                      <CandyPlanet
                        key={data.platform}
                        platform={data.platform}
                        position={getPlatformPosition(data.platform)}
                        sentiment={data.overallSentiment}
                        onClick={() => setSelectedPlatform(data.platform)}
                        isSelected={selectedPlatform === data.platform}
                      />
                    ))}
                    
                    {/* Topic Clusters */}
                    {selectedData?.topics.map((topic, index) => {
                      const basePos = getPlatformPosition(selectedData.platform);
                      const angle = (index / selectedData.topics.length) * Math.PI * 2;
                      const radius = 2;
                      const clusterSize = Math.min(0.3, (topic.mentions / 2000) * 0.5);
                      
                      return (
                        <CandyCluster
                          key={topic.id}
                          position={[
                            basePos[0] + Math.cos(angle) * radius,
                            basePos[1] + Math.sin(index) * 0.5,
                            basePos[2] + Math.sin(angle) * radius,
                          ]}
                          sentiment={topic.sentiment}
                          size={clusterSize}
                          engagement={topic.engagement}
                          onClick={() => console.log('Cluster clicked:', topic)}
                        />
                      );
                    })}
                  </Suspense>
                </Canvas>
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

        {/* Platform Details */}
        <AnimatePresence mode="wait">
          {selectedData && (
            <motion.div
              key={selectedData.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Overview Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedData.name}</span>
                    <Badge
                      variant={selectedData.sentimentChange >= 0 ? "default" : "destructive"}
                      className="gap-1"
                    >
                      {selectedData.sentimentChange > 0 && <TrendingUp className="w-3 h-3" />}
                      {selectedData.sentimentChange < 0 && <TrendingDown className="w-3 h-3" />}
                      {selectedData.sentimentChange === 0 && <Minus className="w-3 h-3" />}
                      {selectedData.sentimentChange > 0 ? '+' : ''}{selectedData.sentimentChange}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Planet Type</p>
                    <p className="font-semibold text-lg">{selectedData.planetType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Overall Sentiment</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-destructive via-warning to-success transition-all duration-500"
                          style={{ width: `${selectedData.overallSentiment}%` }}
                        />
                      </div>
                      <span className="font-bold text-xl">{selectedData.overallSentiment}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Topics Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedData.topics.map((topic) => (
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
