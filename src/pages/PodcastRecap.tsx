import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipBack, SkipForward, MessageSquare, Sparkles, Radio, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { sentimentData } from '@/data/sentimentData';
import weeklyRecapAudio from '@/assets/weekly-recap.mp3';

const PodcastRecap = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

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
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      toast.info('🎧 Playing Weekly Recap', {
        description: 'This week in sentiment analysis...'
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleSkipBack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  };

  const handleSkipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 15);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <div className="relative">
      {/* Intro Section */}
      <section className="container mx-auto px-6 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-light text-foreground">
            This Week in Sentiment
          </h1>
          <p className="text-lg text-foreground/60 font-light">
            Key insights and trends across Slack, Discord, and Teams
          </p>
        </motion.div>
      </section>

      {/* Audio Player Section */}
      <section className="full-section bg-gradient-to-b from-background via-muted/20 to-background pt-48">
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
            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={weeklyRecapAudio} />

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
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-muted/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="flex justify-between text-sm text-foreground/50 font-light">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSkipBack}
                className="h-14 w-14 hover:bg-primary/10"
              >
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
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSkipForward}
                className="h-14 w-14 hover:bg-primary/10"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
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
