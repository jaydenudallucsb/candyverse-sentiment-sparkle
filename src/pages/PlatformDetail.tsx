import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Sparkles, MessageSquare, Target, GitCompare, BarChart3, Award } from 'lucide-react';
import { sentimentData, Platform } from '@/data/sentimentData';
import { CommentFeed } from '@/components/CommentFeed';
import { SentimentClusterView } from '@/components/SentimentClusterView';
import { VennDiagram } from '@/components/VennDiagram';
import { ComparisonInsights } from '@/components/ComparisonInsights';
import { useState, useEffect } from 'react';

const PlatformDetail = () => {
  const { platform } = useParams<{ platform: Platform }>();
  const navigate = useNavigate();
  const [animatedSentiment, setAnimatedSentiment] = useState(0);
  const [animatedMentions, setAnimatedMentions] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const platformData = sentimentData.find((d) => d.platform === platform);

  useEffect(() => {
    if (platformData) {
      const sentimentTimer = setInterval(() => {
        setAnimatedSentiment(prev => {
          if (prev >= platformData.overallSentiment) {
            clearInterval(sentimentTimer);
            return platformData.overallSentiment;
          }
          return prev + 1;
        });
      }, 20);

      const totalMentions = platformData.topics.reduce((sum, topic) => sum + topic.mentions, 0);
      const mentionsTimer = setInterval(() => {
        setAnimatedMentions(prev => {
          if (prev >= totalMentions) {
            clearInterval(mentionsTimer);
            return totalMentions;
          }
          return prev + Math.ceil(totalMentions / 50);
        });
      }, 30);

      return () => {
        clearInterval(sentimentTimer);
        clearInterval(mentionsTimer);
      };
    }
  }, [platformData]);

  if (!platformData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light text-foreground">Platform not found</h1>
          <Button onClick={() => navigate('/candyverse')} variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Candyverse
          </Button>
        </div>
      </div>
    );
  }

  const getPlatformGradient = () => {
    switch (platform) {
      case 'slack':
        return 'from-slack/40 to-slack/10';
      case 'discord':
        return 'from-accent/40 to-accent/10';
      case 'teams':
        return 'from-secondary/40 to-secondary/10';
      default:
        return 'from-primary/40 to-primary/10';
    }
  };

  const getPlatformColor = () => {
    switch (platform) {
      case 'slack':
        return 'slack';
      case 'discord':
        return 'accent';
      case 'teams':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <div className="relative">
      {/* Hero Section with Platform Overview */}
      <section className="full-section">
        <Button
          variant="ghost"
          onClick={() => navigate('/candyverse')}
          className="absolute top-8 left-8 gap-2 glass"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <motion.div
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center max-w-6xl space-y-12"
        >
          {/* Platform Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getPlatformGradient()} mx-auto flex items-center justify-center relative`}
          >
            <div className={`w-16 h-16 rounded-full bg-${getPlatformColor()}`} />
            <motion.div
              className={`absolute inset-0 rounded-full bg-${getPlatformColor()}`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Platform Name & Type */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl md:text-8xl font-light text-foreground leading-tight tracking-tight"
            >
              {platformData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-2xl text-foreground/60 font-light"
            >
              {platformData.planetType}
            </motion.p>
          </div>

          {/* Key Metrics - Flowing Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid md:grid-cols-3 gap-12 mt-16"
          >
            {/* Sentiment Score */}
            <div className="glass p-10 rounded-2xl space-y-4 relative overflow-hidden group">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br from-${getPlatformColor()}/20 to-transparent`}
                whileHover={{ scale: 1.1, opacity: 0.8 }}
              />
              <Sparkles className={`w-8 h-8 text-${getPlatformColor()} mx-auto relative z-10`} />
              <p className="text-sm text-foreground/60 uppercase tracking-wider relative z-10">Overall Sentiment</p>
              <motion.p
                className={`text-7xl font-light tabular-nums text-${getPlatformColor()} relative z-10`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", bounce: 0.4 }}
              >
                {animatedSentiment}
                <span className="text-4xl">%</span>
              </motion.p>
            </div>

            {/* Trend */}
            <div className="glass p-10 rounded-2xl space-y-4 relative overflow-hidden group">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${
                  platformData.sentimentChange >= 0 ? 'from-success/20' : 'from-destructive/20'
                } to-transparent`}
                whileHover={{ scale: 1.1, opacity: 0.8 }}
              />
              <Target className="w-8 h-8 text-foreground/60 mx-auto relative z-10" />
              <p className="text-sm text-foreground/60 uppercase tracking-wider relative z-10">Trend Direction</p>
              <div className="flex items-center justify-center gap-2 relative z-10">
                {platformData.sentimentChange > 0 && <TrendingUp className="w-10 h-10 text-success" />}
                {platformData.sentimentChange < 0 && <TrendingDown className="w-10 h-10 text-destructive" />}
                {platformData.sentimentChange === 0 && <Minus className="w-10 h-10 text-muted-foreground" />}
                <span className={`text-5xl font-light ${
                  platformData.sentimentChange >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {platformData.sentimentChange > 0 ? '+' : ''}
                  {platformData.sentimentChange}%
                </span>
              </div>
            </div>

            {/* Total Mentions */}
            <div className="glass p-10 rounded-2xl space-y-4 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"
                whileHover={{ scale: 1.1, opacity: 0.8 }}
              />
              <MessageSquare className="w-8 h-8 text-accent mx-auto relative z-10" />
              <p className="text-sm text-foreground/60 uppercase tracking-wider relative z-10">Total Mentions</p>
              <motion.p
                className="text-6xl font-light tabular-nums text-accent relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", bounce: 0.4 }}
              >
                {animatedMentions.toLocaleString()}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sentiment Clusters Section */}
      <section className="full-section bg-gradient-to-b from-background via-muted/20 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-light text-foreground leading-tight">
              Sentiment Clusters
              <br />
              <span className="text-foreground/60">vs Recent Updates</span>
            </h2>
            <p className="text-xl text-foreground/60 font-light max-w-3xl mx-auto">
              Understanding the emotional landscape of user feedback
            </p>
          </div>
          <SentimentClusterView clusters={platformData.sentimentClusters} />
        </motion.div>
      </section>

      {/* Topic Breakdown Section */}
      <section className="full-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl w-full space-y-16"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              What people are talking about
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {platformData.topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-2xl space-y-6 relative overflow-hidden group cursor-pointer"
              >
                {/* Background Gradient on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    topic.sentiment === 'positive'
                      ? 'from-success/10'
                      : topic.sentiment === 'negative'
                      ? 'from-destructive/10'
                      : 'from-warning/10'
                  } to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-foreground">{topic.topic}</h3>
                    <p className="text-xs text-foreground/50 uppercase tracking-widest">{topic.dateRange}</p>
                  </div>

                  <motion.div
                    className="text-6xl font-light bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tabular-nums"
                    whileHover={{ scale: 1.05 }}
                  >
                    {topic.mentions.toLocaleString()}
                  </motion.div>

                  <Badge
                    variant={
                      topic.sentiment === 'positive'
                        ? 'default'
                        : topic.sentiment === 'negative'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="text-xs px-3 py-1"
                  >
                    {topic.sentiment}
                  </Badge>

                  {/* Engagement Bar */}
                  <div className="space-y-2">
                    <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          topic.sentiment === 'positive'
                            ? 'bg-gradient-to-r from-success to-success/50'
                            : topic.sentiment === 'negative'
                            ? 'bg-gradient-to-r from-destructive to-destructive/50'
                            : 'bg-gradient-to-r from-warning to-warning/50'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${topic.engagement * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p className="text-xs text-foreground/50">
                      {Math.round(topic.engagement * 100)}% engagement
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Sentiment Data Section */}
      <section className="full-section bg-gradient-to-b from-background via-muted/20 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <Badge className="px-4 py-2 text-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Detailed Analysis
            </Badge>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Sentiment Percentages by Platform
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Slack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-slack/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-full bg-slack/20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-slack" />
                    </div>
                    Slack
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Positive</span>
                      <span className="text-xl font-light text-success">56.5%</span>
                    </div>
                    <div className="text-xs text-foreground/50">778 comments</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Neutral</span>
                      <span className="text-xl font-light">23.0%</span>
                    </div>
                    <div className="text-xs text-foreground/50">316 comments</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Negative</span>
                      <span className="text-xl font-light text-destructive">20.5%</span>
                    </div>
                    <div className="text-xs text-foreground/50">282 comments</div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Average Score</span>
                      <span className="text-2xl font-light text-success">+0.218</span>
                    </div>
                    <p className="text-xs text-foreground/50 mt-2">Slightly positive overall</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Discord */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-accent" />
                    </div>
                    Discord
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Positive</span>
                      <span className="text-xl font-light text-success">38.1%</span>
                    </div>
                    <div className="text-xs text-foreground/50">641 comments</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Neutral</span>
                      <span className="text-xl font-light">27.7%</span>
                    </div>
                    <div className="text-xs text-foreground/50">466 comments</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Negative</span>
                      <span className="text-xl font-light text-destructive">34.3%</span>
                    </div>
                    <div className="text-xs text-foreground/50">577 comments</div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Average Score</span>
                      <span className="text-2xl font-light">+0.011</span>
                    </div>
                    <p className="text-xs text-foreground/50 mt-2">Barely positive/neutral</p>
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
              <Card className="glass border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-secondary" />
                    </div>
                    Microsoft Teams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Positive</span>
                      <span className="text-xl font-light text-success">52.5%</span>
                    </div>
                    <div className="text-xs text-foreground/50">841 comments</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Neutral</span>
                      <span className="text-xl font-light">26.5%</span>
                    </div>
                    <div className="text-xs text-foreground/50">424 comments</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Negative</span>
                      <span className="text-xl font-light text-destructive">21.0%</span>
                    </div>
                    <div className="text-xs text-foreground/50">337 comments</div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/60">Average Score</span>
                      <span className="text-2xl font-light text-success">+0.193</span>
                    </div>
                    <p className="text-xs text-foreground/50 mt-2">Slightly positive</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Key Takeaways Section */}
      <section className="full-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <Badge className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              Key Insights
            </Badge>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Platform Rankings
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Positive Ranking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    Most Positive
                  </CardTitle>
                  <CardDescription>Ranking by % Positive Sentiment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slack/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">1</Badge>
                      <span className="font-medium">Slack</span>
                    </div>
                    <span className="text-xl font-light text-success">56.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">2</Badge>
                      <span className="font-medium">Teams</span>
                    </div>
                    <span className="text-xl font-light">52.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">3</Badge>
                      <span className="font-medium">Discord</span>
                    </div>
                    <span className="text-xl font-light">38.1%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Negative Ranking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                    Most Negative
                  </CardTitle>
                  <CardDescription>Ranking by % Negative Sentiment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">1</Badge>
                      <span className="font-medium">Discord</span>
                    </div>
                    <span className="text-xl font-light text-destructive">34.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">2</Badge>
                      <span className="font-medium">Teams</span>
                    </div>
                    <span className="text-xl font-light">21.0%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slack/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">3</Badge>
                      <span className="font-medium">Slack</span>
                    </div>
                    <span className="text-xl font-light">20.5%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Average Score Ranking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Average Score
                  </CardTitle>
                  <CardDescription>Ranking by Overall Sentiment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slack/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">1</Badge>
                      <span className="font-medium">Slack</span>
                    </div>
                    <span className="text-xl font-light text-success">+0.218</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">2</Badge>
                      <span className="font-medium">Teams</span>
                    </div>
                    <span className="text-xl font-light">+0.193</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">3</Badge>
                      <span className="font-medium">Discord</span>
                    </div>
                    <span className="text-xl font-light">+0.011</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Cross-Platform Analysis Section - Only for Slack */}
      {platform === 'slack' && (
        <>
          <section className="full-section bg-gradient-to-b from-background via-primary/5 to-background">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-7xl w-full space-y-16"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  <GitCompare className="w-16 h-16 text-primary mx-auto mb-4" />
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-light text-foreground leading-tight">
                  Cross-Platform Intelligence
                </h2>
                <p className="text-xl text-foreground/60 font-light max-w-3xl mx-auto">
                  Venn diagram analysis of 4,662 comments across Slack, Discord, and Microsoft Teams
                </p>
              </div>

              <VennDiagram
                data={{
                  all3: {
                    size: 3924,
                    sentiment: {
                      slack: 0.236,
                      discord: -0.009,
                      teams: 0.198,
                    },
                    label: "Slack/Just/Teams (Universal)",
                  },
                  discordOnly: {
                    size: 5,
                    sentiment: 0.046,
                    label: "Post/Like/Really",
                  },
                  teamsOnly: {
                    size: 8,
                    sentiment: -0.106,
                    label: "Just/Did/Like",
                  },
                  slackOnly: {
                    size: 0,
                    sentiment: 0,
                    label: "Slack-Only Features",
                  },
                }}
              />
            </motion.div>
          </section>

          <section className="full-section">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-7xl w-full space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-light text-foreground">
                  Competitive Analysis
                </h2>
                <p className="text-xl text-foreground/60 font-light max-w-3xl mx-auto">
                  Data-driven insights from semantic clustering analysis
                </p>
              </div>

              <ComparisonInsights
                data={{
                  universalFeatures: {
                    percentage: 84.1,
                    slackSentiment: 0.236,
                    discordSentiment: -0.009,
                    teamsSentiment: 0.198,
                  },
                  slackAdvantage: 0.245,
                  keyFindings: [
                    "84% of user feedback is universal across all platforms, indicating that most pain points and feature requests are platform-agnostic rather than specific to one tool.",
                    "Slack achieves the highest sentiment score (+0.236) in the universal cluster, outperforming Discord (+0.245 advantage) and Teams (+0.038 advantage) where it matters most.",
                    "Only 3 small clusters (0.4% of data) are platform-specific, suggesting minimal feature differentiation in user perception.",
                    "Low silhouette score (0.032) indicates significant semantic overlap, meaning users discuss similar topics across all platforms with comparable language.",
                    "Discord and Teams show near-zero sentiment (-0.009 and +0.198) in universal features, positioning Slack as the sentiment leader in shared feature discussions.",
                  ],
                  recommendations: [
                    "Focus product development on universal features where Slack already leads. The 84% universal cluster represents the battleground where competition happens.",
                    "Investigate why Slack sentiment (+0.236) significantly exceeds Discord (-0.009) in shared features. This +0.245 advantage is your competitive moat.",
                    "Platform-specific features (Discord-only, Teams-only clusters) represent <1% of discussions. Prioritize differentiation in universal areas rather than unique features.",
                    "Consider sub-clustering the mega-cluster (3,924 comments) with stricter parameters to identify specific feature groups where Slack can further strengthen its lead.",
                    "Use this sentiment advantage in marketing: '84% of platform discussions are universal - and Slack users are 24.5% more positive about them.'",
                  ],
                }}
              />
            </motion.div>
          </section>
        </>
      )}

      {/* User Comments Section */}
      <section className="full-section bg-gradient-to-b from-background via-muted/20 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
              The voice of
              <br />
              <span className={`text-${getPlatformColor()}`}>the community</span>
            </h2>
          </div>
          <CommentFeed topics={platformData.topics} />
        </motion.div>
      </section>
    </div>
  );
};

export default PlatformDetail;
