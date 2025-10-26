import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { sentimentData, Platform } from '@/data/sentimentData';
import { CommentFeed } from '@/components/CommentFeed';
import { SentimentClusterView } from '@/components/SentimentClusterView';

const PlatformDetail = () => {
  const { platform } = useParams<{ platform: Platform }>();
  const navigate = useNavigate();

  const platformData = sentimentData.find((d) => d.platform === platform);

  if (!platformData) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Platform not found</h1>
        <Button onClick={() => navigate('/candyverse')}>Back to Candyverse</Button>
      </div>
    );
  }

  const getPlatformIcon = () => {
    switch (platform) {
      case 'slack':
        return <div className="w-16 h-16 rounded-2xl bg-slack flex items-center justify-center"><div className="w-8 h-8 rounded-lg bg-white" /></div>;
      case 'discord':
        return <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center"><div className="w-8 h-8 rounded-lg bg-white" /></div>;
      case 'teams':
        return <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center"><div className="w-8 h-8 rounded-lg bg-white" /></div>;
      default:
        return <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center"><div className="w-8 h-8 rounded-lg bg-white" /></div>;
    }
  };

  const getPlatformColor = () => {
    switch (platform) {
      case 'slack':
        return 'from-slack/20 to-slack/5';
      case 'discord':
        return 'from-accent/20 to-accent/5';
      case 'teams':
        return 'from-secondary/20 to-secondary/5';
      default:
        return 'from-primary/20 to-primary/5';
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-6 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/candyverse')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Candyverse
          </Button>

          <Card className={`overflow-hidden border-2 bg-gradient-to-br ${getPlatformColor()} hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl`}>
            <CardContent className="p-10">
              <div className="flex items-start justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      {getPlatformIcon()}
                    </motion.div>
                    <div>
                      <h1 className="text-5xl font-bold text-foreground mb-2 animate-fade-in">
                        {platformData.name}
                      </h1>
                      <p className="text-xl text-muted-foreground">{platformData.planetType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm opacity-80 mb-1">Overall Sentiment</p>
                      <p className="text-3xl font-bold">{platformData.overallSentiment}%</p>
                    </div>

                    <div className="h-12 w-px bg-foreground/20" />

                    <div>
                      <p className="text-sm opacity-80 mb-1">Trend</p>
                      <Badge
                        variant={platformData.sentimentChange >= 0 ? 'default' : 'destructive'}
                        className="gap-1 text-base px-3 py-1"
                      >
                        {platformData.sentimentChange > 0 && <TrendingUp className="w-4 h-4" />}
                        {platformData.sentimentChange < 0 && <TrendingDown className="w-4 h-4" />}
                        {platformData.sentimentChange === 0 && <Minus className="w-4 h-4" />}
                        {platformData.sentimentChange > 0 ? '+' : ''}
                        {platformData.sentimentChange}%
                      </Badge>
                    </div>

                    <div className="h-12 w-px bg-foreground/20" />

                    <div>
                      <p className="text-sm opacity-80 mb-1">Total Mentions</p>
                      <p className="text-3xl font-bold">
                        {platformData.topics
                          .reduce((sum, topic) => sum + topic.mentions, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sentiment Clusters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground">Sentiment Clusters vs Recent Updates</h2>
          <SentimentClusterView clusters={platformData.sentimentClusters} />
        </motion.div>

        {/* Sentiment Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground">Sentiment Breakdown</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {platformData.topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-8 space-y-3">
                    <p className="font-bold text-xl">{topic.topic}</p>
                    <p className="text-sm text-muted-foreground">{topic.dateRange}</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{topic.mentions.toLocaleString()}</p>
                    <Badge
                      variant={
                        topic.sentiment === 'positive'
                          ? 'default'
                          : topic.sentiment === 'negative'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="text-sm"
                    >
                      {topic.sentiment}
                    </Badge>
                    <div className="pt-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            topic.sentiment === 'positive'
                              ? 'bg-success'
                              : topic.sentiment === 'negative'
                              ? 'bg-destructive'
                              : 'bg-warning'
                          }`}
                          style={{ width: `${topic.engagement * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(topic.engagement * 100)}% engagement
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comment Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground">What Users Are Saying</h2>
          <CommentFeed topics={platformData.topics} />
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformDetail;
