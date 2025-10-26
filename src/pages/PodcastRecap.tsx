import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipBack, SkipForward, MessageSquare, Sparkles, Radio, TrendingUp, TrendingDown } from 'lucide-react';
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
    
    toast.success('Insights sent to your phone!', {
      description: 'Check your messages for this week\'s sentiment summary.'
    });
    setPhoneNumber('');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.info('🎧 Playing Weekly Recap', {
        description: 'This week in sentiment analysis...'
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="full-section">
        <motion.div
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center max-w-6xl space-y-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-accent/10 mx-auto flex items-center justify-center relative"
          >
            <Radio className="w-16 h-16 text-primary" />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Title */}
          <div className="space-y-6">
            <Badge className="px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Weekly Intelligence Brief
            </Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl md:text-8xl font-light text-foreground leading-tight tracking-tight"
            >
              This Week
              <br />
              <span className="text-foreground/60">in Sentiment</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl text-foreground/60 font-light max-w-2xl mx-auto"
            >
              Key insights and trends across Slack, Discord, and Teams
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Audio Player Section */}
      <section className="full-section bg-gradient-to-b from-background via-muted/20 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Listen to the recap
            </h2>
          </div>

          <div className="glass p-12 rounded-3xl space-y-8">
            {/* Waveform Visualization */}
            <div className="relative h-40 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center gap-1 px-6">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary via-accent to-secondary rounded-full"
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
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-2 bg-muted/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="flex justify-between text-sm text-foreground/50 font-light">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <Button variant="ghost" size="icon" className="h-14 w-14 hover:bg-primary/10">
                <SkipBack className="w-6 h-6" />
              </Button>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="icon"
                  onClick={togglePlayPause}
                  className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
              </motion.div>
              
              <Button variant="ghost" size="icon" className="h-14 w-14 hover:bg-primary/10">
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Episode Highlights Section */}
      <section className="full-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Episode Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sentimentData.map((platform, index) => (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-2xl space-y-6 relative overflow-hidden group cursor-pointer"
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 ${
                    platform.platform === 'slack'
                      ? 'bg-gradient-to-br from-slack/10'
                      : platform.platform === 'discord'
                      ? 'bg-gradient-to-br from-accent/10'
                      : 'bg-gradient-to-br from-secondary/10'
                  } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 space-y-6">
                  {/* Platform Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                      platform.platform === 'slack'
                        ? 'from-slack/40 to-slack/10'
                        : platform.platform === 'discord'
                        ? 'from-accent/40 to-accent/10'
                        : 'from-secondary/40 to-secondary/10'
                    } mx-auto flex items-center justify-center`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${
                        platform.platform === 'slack'
                          ? 'bg-slack'
                          : platform.platform === 'discord'
                          ? 'bg-accent'
                          : 'bg-secondary'
                      }`}
                    />
                  </motion.div>

                  {/* Platform Name */}
                  <h3 className="text-2xl font-light text-foreground text-center">
                    {platform.name}
                  </h3>

                  {/* Sentiment Score */}
                  <div className="text-center space-y-2">
                    <motion.p
                      className="text-5xl font-light tabular-nums bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      {platform.overallSentiment}
                      <span className="text-3xl">%</span>
                    </motion.p>
                    <div className="flex items-center justify-center gap-2">
                      {platform.sentimentChange >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-success" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      )}
                      <span
                        className={`text-sm font-light ${
                          platform.sentimentChange >= 0 ? 'text-success' : 'text-destructive'
                        }`}
                      >
                        {platform.sentimentChange > 0 ? '+' : ''}
                        {platform.sentimentChange}%
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-foreground/60 leading-relaxed font-light text-center">
                    {platform.sentimentChange >= 0 ? (
                      <>
                        Trending positive. Users responding well to recent{' '}
                        {platform.topics[0].topic.toLowerCase()} improvements.
                      </>
                    ) : (
                      <>
                        Sentiment declining. User concerns around{' '}
                        {platform.topics.find((t) => t.sentiment === 'negative')?.topic.toLowerCase()}{' '}
                        impacting perception.
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Subscribe Section */}
      <section className="full-section bg-gradient-to-b from-background via-muted/20 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
              Never miss
              <br />
              <span className="text-primary">an insight</span>
            </h2>
            <p className="text-xl text-foreground/60 font-light">
              Get weekly SMS updates with key sentiment trends
            </p>
          </div>

          <div className="glass p-10 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
              <p className="text-sm text-foreground/60 uppercase tracking-widest">
                SMS Subscription
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="tel"
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 h-14 text-lg bg-background/50 border-2 focus:border-primary"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSendSMS}
                  className="h-14 px-8 bg-gradient-to-r from-primary to-accent hover:shadow-lg w-full sm:w-auto"
                >
                  Subscribe
                </Button>
              </motion.div>
            </div>

            <p className="text-xs text-foreground/50 text-center font-light">
              Weekly updates • Cancel anytime • Standard message rates apply
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PodcastRecap;
