import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertCircle, Target, Lightbulb, BarChart3 } from 'lucide-react';

interface ComparisonData {
  universalFeatures: {
    percentage: number;
    slackSentiment: number;
    discordSentiment: number;
    teamsSentiment: number;
  };
  slackAdvantage: number;
  keyFindings: string[];
  recommendations: string[];
}

interface ComparisonInsightsProps {
  data: ComparisonData;
}

export const ComparisonInsights = ({ data }: ComparisonInsightsProps) => {
  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Universal Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="border-2 border-primary/30 hover:border-primary/60 transition-all duration-300">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-xl font-light">Universal Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-6xl font-light text-primary tabular-nums">
                  {data.universalFeatures.percentage}%
                </div>
                <p className="text-sm text-foreground/60">
                  of discussions are shared across all platforms
                </p>
                <div className="pt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/70">Slack:</span>
                    <Badge variant={data.universalFeatures.slackSentiment > 0 ? 'default' : 'destructive'}>
                      {data.universalFeatures.slackSentiment.toFixed(3)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/70">Discord:</span>
                    <Badge variant={data.universalFeatures.discordSentiment > 0 ? 'default' : 'destructive'}>
                      {data.universalFeatures.discordSentiment.toFixed(3)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/70">Teams:</span>
                    <Badge variant={data.universalFeatures.teamsSentiment > 0 ? 'default' : 'destructive'}>
                      {data.universalFeatures.teamsSentiment.toFixed(3)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Slack's Advantage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="border-2 border-success/30 hover:border-success/60 transition-all duration-300">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-success mb-2" />
              <CardTitle className="text-xl font-light">Slack's Advantage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-6xl font-light text-success tabular-nums">
                  +{data.slackAdvantage.toFixed(3)}
                </div>
                <p className="text-sm text-foreground/60">
                  sentiment lead over Discord in universal features
                </p>
                <div className="pt-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-xs text-success font-medium">
                    🎯 Slack performs best where it matters most
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Clustering Quality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border-2 border-warning/30 hover:border-warning/60 transition-all duration-300">
            <CardHeader>
              <Target className="w-8 h-8 text-warning mb-2" />
              <CardTitle className="text-xl font-light">Data Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-6xl font-light text-warning tabular-nums">4</div>
                <p className="text-sm text-foreground/60">
                  semantic clusters identified from 4,662 comments
                </p>
                <div className="pt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/70">Silhouette Score:</span>
                    <Badge variant="secondary">0.032</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/70">Noise Ratio:</span>
                    <Badge variant="secondary">15.4%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Key Findings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Card className="border-2 border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-light">Key Findings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.keyFindings.map((finding, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-light text-lg">
                    {index + 1}
                  </div>
                  <p className="text-foreground/70 leading-relaxed">{finding}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="border-2 border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-accent" />
              <CardTitle className="text-3xl font-light">Strategic Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-lg bg-gradient-to-r from-accent/10 to-transparent border-l-4 border-accent"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xl">
                    💡
                  </div>
                  <p className="text-foreground/70 leading-relaxed">{rec}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
