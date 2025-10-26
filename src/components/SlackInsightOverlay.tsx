import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, TrendingDown, Users, PieChart, Target, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SlackInsightOverlayProps {
  onClose: () => void;
}

export const SlackInsightOverlay = ({ onClose }: SlackInsightOverlayProps) => {
  // Data from clustering_results.json and analysis
  const data = {
    totalComments: 4662,
    slackComments: 1376,
    discordComments: 1684,
    teamsComments: 1602,
    universalCluster: 3924,
    universalPercentage: 84.1,
    discordOnlyCluster: 5,
    discordOnlyPercentage: 0.1,
    teamsOnlyCluster: 8,
    teamsOnlyPercentage: 0.2,
    slackOnlyCluster: 0,
    slackOnlyPercentage: 0,
    slackSentiment: -0.086,
    discordSentiment: -0.012,
    teamsSentiment: -0.041,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="max-w-6xl w-full max-h-[90vh] overflow-y-auto glass rounded-3xl border-2 border-primary/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slack/20 border-2 border-slack flex items-center justify-center">
                <PieChart className="w-8 h-8 text-slack" />
              </div>
              <div>
                <h2 className="text-4xl font-light text-foreground">Cross-Platform Analysis</h2>
                <p className="text-foreground/70">Slack vs Discord vs Microsoft Teams</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/20">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-primary/30 hover:border-primary/60 transition-all">
              <CardContent className="p-6 text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-primary">{data.totalComments.toLocaleString()}</p>
                <p className="text-sm text-foreground/70">Total Comments</p>
              </CardContent>
            </Card>
            <Card className="border-slack/30 hover:border-slack/60 transition-all">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-slack">{data.slackComments.toLocaleString()}</p>
                <p className="text-sm text-foreground/70">Slack Comments</p>
              </CardContent>
            </Card>
            <Card className="border-accent/30 hover:border-accent/60 transition-all">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-accent">{data.discordComments.toLocaleString()}</p>
                <p className="text-sm text-foreground/70">Discord Comments</p>
              </CardContent>
            </Card>
            <Card className="border-secondary/30 hover:border-secondary/60 transition-all">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-secondary">{data.teamsComments.toLocaleString()}</p>
                <p className="text-sm text-foreground/70">Teams Comments</p>
              </CardContent>
            </Card>
          </div>

          {/* Universal Overlap Meter */}
          <Card className="border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Universal Feature Overlap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-5xl font-bold text-primary">{data.universalPercentage}%</p>
                  <p className="text-foreground/70">of discussions overlap across all platforms</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">{data.universalCluster.toLocaleString()}</p>
                  <p className="text-sm text-foreground/70">comments in universal cluster</p>
                </div>
              </div>
              <Progress value={data.universalPercentage} className="h-3" />
            </CardContent>
          </Card>

          {/* Cluster Distribution */}
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-6 h-6 text-primary" />
                Cluster Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/20 to-transparent border border-primary/30">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-slack via-accent to-secondary" />
                    <span className="font-semibold">All 3 Platforms</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary">{data.universalCluster.toLocaleString()}</span>
                    <Badge variant="default">{data.universalPercentage}%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-accent" />
                    <span className="font-semibold">Discord Only</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-accent">{data.discordOnlyCluster}</span>
                    <Badge variant="secondary">{data.discordOnlyPercentage}%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-secondary" />
                    <span className="font-semibold">Teams Only</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-secondary">{data.teamsOnlyCluster}</span>
                    <Badge variant="secondary">{data.teamsOnlyPercentage}%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-slack" />
                    <span className="font-semibold">Slack Only</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-foreground">{data.slackOnlyCluster}</span>
                    <Badge variant="outline">0%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Comparison */}
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-warning" />
                Sentiment Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Slack */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slack">Slack</span>
                    <span className="text-2xl font-bold text-slack">{data.slackSentiment.toFixed(3)}</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-destructive to-warning"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(data.slackSentiment) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
                {/* Discord */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-accent">Discord</span>
                    <span className="text-2xl font-bold text-accent">{data.discordSentiment.toFixed(3)}</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-success/50 to-success"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(data.discordSentiment) * 100}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
                {/* Teams */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-secondary">Microsoft Teams</span>
                    <span className="text-2xl font-bold text-secondary">{data.teamsSentiment.toFixed(3)}</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-warning to-warning/50"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(data.teamsSentiment) * 100}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border-2 border-primary/40 bg-gradient-to-br from-background/80 to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary">
                <h4 className="font-semibold mb-2 text-foreground">Platform-agnostic features dominate</h4>
                <p className="text-sm text-foreground/80">
                  {data.universalPercentage}% of user comments overlap across Slack, Discord, and Teams, meaning most discussions are about shared features rather than platform-specific ones.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-warning/10 to-transparent border-l-4 border-warning">
                <h4 className="font-semibold mb-2 text-foreground">Sentiment is consistently neutral to slightly negative</h4>
                <p className="text-sm text-foreground/80">
                  Slack's sentiment is {data.slackSentiment.toFixed(3)}, Discord's is {data.discordSentiment.toFixed(3)}, and Teams' is {data.teamsSentiment.toFixed(3)}, indicating shared dissatisfaction across platforms.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-destructive/10 to-transparent border-l-4 border-destructive">
                <h4 className="font-semibold mb-2 text-foreground">Slack has no unique clusters</h4>
                <p className="text-sm text-foreground/80">
                  Despite {data.slackComments.toLocaleString()} Slack comments, none formed a Slack-only cluster, showing high overlap in conversation topics with competitors.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actionable Insight Footer */}
          <Card className="border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Strategic Opportunity</h4>
                  <p className="text-foreground/80">
                    Opportunities for Slack lie in <strong>differentiating its experience</strong> and <strong>addressing universal user frustrations</strong> shared with Discord and Teams. Focus on unique value propositions that set Slack apart.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};
