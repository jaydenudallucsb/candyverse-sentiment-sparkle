import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, SkipBack, SkipForward, MessageSquare, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { sentimentData } from '@/data/sentimentData';

const PodcastRecap = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 180; // 3 minutes

  const handleSendSMS = () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    toast.success('🍬 Candy Recap sent to your phone!', {
      description: 'Check your messages for this week\'s sentiment highlights.'
    });
    setPhoneNumber('');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.info('🎧 Playing Candy Recap', {
        description: 'This week in the Candyverse...'
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Weekly Recap</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            This Week in the Candyverse
          </h1>
          <p className="text-lg text-muted-foreground">
            A sweet summary of sentiment trends across Slack, Discord, and Teams
          </p>
        </motion.div>

        {/* Podcast Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden border-2">
            <CardContent className="p-8 space-y-6">
              {/* Waveform Visualization */}
              <div className="relative h-32 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center gap-1 px-4">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary via-secondary to-accent rounded-full"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        opacity: isPlaying ? 0.8 : 0.3,
                      }}
                      animate={{
                        height: isPlaying
                          ? [`${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`]
                          : undefined,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isPlaying ? Infinity : 0,
                        repeatType: 'reverse',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <SkipBack className="w-5 h-5" />
                </Button>
                
                <Button
                  size="icon"
                  onClick={togglePlayPause}
                  className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>
                
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Episode Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Episode Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sentimentData.map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-xl bg-muted/50 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{platform.name}</h3>
                    <span className={`text-sm font-medium ${
                      platform.sentimentChange >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {platform.sentimentChange > 0 ? '+' : ''}{platform.sentimentChange}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {platform.sentimentChange >= 0 ? (
                      <>
                        {platform.name}'s {platform.planetType.toLowerCase()} is glowing bright! 
                        Users are loving the recent {platform.topics[0].topic.toLowerCase()} updates.
                      </>
                    ) : (
                      <>
                        {platform.name}'s {platform.planetType.toLowerCase()} shows some cracks. 
                        Community concerns around {platform.topics.find(t => t.sentiment === 'negative')?.topic.toLowerCase()} 
                        are affecting sentiment.
                      </>
                    )}
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* SMS Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Text Me the Candy Recap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendSMS}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  Send 🍬📱
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Get a weekly SMS with the sweetest sentiment insights. Standard message rates apply.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PodcastRecap;
