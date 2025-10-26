import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, TrendingDown, Users, PieChart, Target, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect } from 'react';

interface SlackInsightOverlayProps {
  onClose: () => void;
}

export const SlackInsightOverlay = ({ onClose }: SlackInsightOverlayProps) => {
  const controls = useAnimation();

  useEffect(() => {
    // Start animation sequence when overlay opens
    controls.start("visible");
  }, [controls]);

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

  // Musical reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 cosmic-bg backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200,
          mass: 0.8
        }}
        className="max-w-6xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar glass rounded-3xl border border-primary/30 shadow-[0_0_80px_rgba(59,130,246,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div 
          className="p-8 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-slack/30 to-primary/20 border border-slack/40 flex items-center justify-center backdrop-blur-sm"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(14, 165, 233, 0.3)",
                    "0 0 40px rgba(14, 165, 233, 0.5)",
                    "0 0 20px rgba(14, 165, 233, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <PieChart className="w-8 h-8 text-slack" />
              </motion.div>
              <div>
                <h2 className="text-4xl font-light text-foreground tracking-tight">Cross-Platform Intelligence</h2>
                <p className="text-muted-foreground">Slack vs Discord vs Microsoft Teams</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="hover:bg-destructive/20 rounded-full transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </Button>
          </motion.div>

          {/* Key Metrics Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
            {[
              { value: data.totalComments, label: "Total Comments", color: "primary", icon: Users },
              { value: data.slackComments, label: "Slack Comments", color: "slack" },
              { value: data.discordComments, label: "Discord Comments", color: "primary" },
              { value: data.teamsComments, label: "Teams Comments", color: "secondary" }
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className={`border-${metric.color}/30 hover:border-${metric.color}/60 transition-all duration-300 glass`}>
                  <CardContent className="p-6 text-center">
                    {metric.icon && <metric.icon className={`w-6 h-6 text-${metric.color} mx-auto mb-2`} />}
                    <motion.p 
                      className={`text-3xl font-bold text-${metric.color}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {metric.value.toLocaleString()}
                    </motion.p>
                    <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Universal Overlap Meter */}
          <motion.div variants={itemVariants}>
            <Card className="border border-primary/40 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent glass overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Target className="w-6 h-6 text-primary" />
                  Universal Feature Overlap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <motion.p 
                      className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary"
                      animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: "200% 100%" }}
                    >
                      {data.universalPercentage}%
                    </motion.p>
                    <p className="text-muted-foreground mt-1">of discussions overlap across all platforms</p>
                  </div>
                  <div className="text-right">
                    <motion.p 
                      className="text-4xl font-bold text-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      {data.universalCluster.toLocaleString()}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">comments in universal cluster</p>
                  </div>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  className="origin-left"
                >
                  <Progress value={data.universalPercentage} className="h-3 bg-muted/50" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cluster Distribution */}
          <motion.div variants={itemVariants}>
            <Card className="border-primary/30 glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <PieChart className="w-6 h-6 text-primary" />
                  Cluster Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                {[
                  { 
                    label: "All 3 Platforms", 
                    value: data.universalCluster, 
                    percent: data.universalPercentage, 
                    gradient: "from-slack via-primary to-accent",
                    bg: "from-primary/20 to-transparent",
                    border: "primary"
                  },
                  { 
                    label: "Discord Only", 
                    value: data.discordOnlyCluster, 
                    percent: data.discordOnlyPercentage, 
                    color: "primary",
                    bg: "from-primary/15 to-transparent",
                    border: "primary/30"
                  },
                  { 
                    label: "Teams Only", 
                    value: data.teamsOnlyCluster, 
                    percent: data.teamsOnlyPercentage, 
                    color: "secondary",
                    bg: "from-secondary/15 to-transparent",
                    border: "secondary/30"
                  },
                  { 
                    label: "Slack Only", 
                    value: data.slackOnlyCluster, 
                    percent: data.slackOnlyPercentage, 
                    color: "slack",
                    bg: "from-slack/10 to-transparent",
                    border: "slack/30"
                  }
                ].map((cluster, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${cluster.bg} border border-${cluster.border} backdrop-blur-sm`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className={`w-3 h-3 rounded-full ${cluster.gradient ? `bg-gradient-to-r ${cluster.gradient}` : `bg-${cluster.color}`}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      />
                      <span className="font-semibold text-foreground">{cluster.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-bold text-${cluster.color || 'foreground'}`}>
                        {cluster.value.toLocaleString()}
                      </span>
                      <Badge variant={cluster.percent > 50 ? "default" : "secondary"} className="min-w-[60px] justify-center">
                        {cluster.percent}%
                      </Badge>
                    </div>
                  </motion.div>
                ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sentiment Comparison */}
          <motion.div variants={itemVariants}>
            <Card className="border-primary/30 glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingDown className="w-6 h-6 text-warning" />
                  Sentiment Waveform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                {[
                  { platform: "Slack", sentiment: data.slackSentiment, color: "slack", gradient: "from-slack/80 to-slack" },
                  { platform: "Discord", sentiment: data.discordSentiment, color: "primary", gradient: "from-primary/80 to-primary" },
                  { platform: "Microsoft Teams", sentiment: data.teamsSentiment, color: "secondary", gradient: "from-secondary/80 to-secondary" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-${item.color}`}>{item.platform}</span>
                      <motion.span 
                        className={`text-2xl font-bold text-${item.color} tabular-nums`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + idx * 0.15, type: "spring", stiffness: 150 }}
                      >
                        {item.sentiment.toFixed(3)}
                      </motion.span>
                    </div>
                    <div className="h-5 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-muted">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${item.gradient} relative overflow-hidden`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.abs(item.sentiment) * 100}%`,
                        }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 1 + idx * 0.15,
                          ease: "easeOut"
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: 1.5 + idx * 0.2
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Insights */}
          <motion.div variants={itemVariants}>
            <Card className="border border-primary/40 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <AlertCircle className="w-6 h-6 text-primary" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Platform-agnostic features dominate",
                    content: `${data.universalPercentage}% of user comments overlap across Slack, Discord, and Teams, meaning most discussions are about shared features rather than platform-specific ones.`,
                    color: "primary",
                    delay: 0
                  },
                  {
                    title: "Sentiment is consistently neutral to slightly negative",
                    content: `Slack's sentiment is ${data.slackSentiment.toFixed(3)}, Discord's is ${data.discordSentiment.toFixed(3)}, and Teams' is ${data.teamsSentiment.toFixed(3)}, indicating shared dissatisfaction across platforms.`,
                    color: "warning",
                    delay: 0.1
                  },
                  {
                    title: "Slack has no unique clusters",
                    content: `Despite ${data.slackComments.toLocaleString()} Slack comments, none formed a Slack-only cluster, showing high overlap in conversation topics with competitors.`,
                    color: "slack",
                    delay: 0.2
                  }
                ].map((insight, idx) => (
                  <motion.div
                    key={idx}
                    className={`p-4 rounded-2xl bg-gradient-to-r from-${insight.color}/10 to-transparent border-l-4 border-${insight.color} backdrop-blur-sm`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + insight.delay, type: "spring", stiffness: 100 }}
                    whileHover={{ x: 4, borderLeftWidth: "6px" }}
                  >
                    <h4 className="font-semibold mb-2 text-foreground">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight.content}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Actionable Insight Footer */}
          <motion.div variants={itemVariants}>
            <Card className="border border-accent/40 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent glass">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.3)",
                        "0 0 35px rgba(168, 85, 247, 0.5)",
                        "0 0 20px rgba(168, 85, 247, 0.3)"
                      ],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Target className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">Strategic Opportunity</h4>
                    <motion.p 
                      className="text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      Opportunities for Slack lie in <strong className="text-accent">differentiating its experience</strong> and <strong className="text-accent">addressing universal user frustrations</strong> shared with Discord and Teams. Focus on unique value propositions that set Slack apart.
                    </motion.p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
