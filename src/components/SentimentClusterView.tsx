import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SentimentCluster {
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  percentage: number;
  keywords: string[];
  recentUpdate?: {
    title: string;
    date: string;
    impact: 'positive' | 'negative' | 'neutral';
    summary: string[];
  };
}

interface SentimentClusterViewProps {
  clusters: SentimentCluster[];
}

export const SentimentClusterView = ({ clusters }: SentimentClusterViewProps) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'negative':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-warning" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-success/20 border-success/40';
      case 'negative':
        return 'bg-destructive/20 border-destructive/40';
      default:
        return 'bg-warning/20 border-warning/40';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clusters.map((cluster, index) => (
        <motion.div
          key={cluster.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`border-2 ${getSentimentColor(cluster.sentiment)} hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-card/50`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl font-bold">{cluster.category}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {getSentimentIcon(cluster.sentiment)}
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Sentiment Percentage */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Sentiment Score</span>
                  <motion.span 
                    className="text-3xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    {cluster.percentage}%
                  </motion.span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className={`h-full rounded-full ${
                      cluster.sentiment === 'positive'
                        ? 'bg-gradient-to-r from-success to-success/70'
                        : cluster.sentiment === 'negative'
                        ? 'bg-gradient-to-r from-destructive to-destructive/70'
                        : 'bg-gradient-to-r from-warning to-warning/70'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${cluster.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              </div>

              {/* Keywords */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Top Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {cluster.keywords.map((keyword, kidx) => (
                    <motion.div
                      key={keyword}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 + kidx * 0.05 }}
                    >
                      <Badge variant="outline" className="text-xs hover:bg-primary/20 hover:border-primary transition-all duration-200">
                        {keyword}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Update */}
              {cluster.recentUpdate && (
                <motion.div 
                  className="pt-4 border-t space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-background/60 to-background/40 border border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {getImpactIcon(cluster.recentUpdate.impact)}
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-base font-bold group-hover:text-primary transition-colors">{cluster.recentUpdate.title}</p>
                      <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                        {cluster.recentUpdate.date}
                      </p>
                    </div>
                  </div>
                  {cluster.recentUpdate.summary && cluster.recentUpdate.summary.length > 0 && (
                    <ul className="space-y-2 ml-2">
                      {cluster.recentUpdate.summary.map((point, idx) => (
                        <motion.li 
                          key={idx} 
                          className="text-sm text-muted-foreground flex items-start gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors group cursor-pointer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.7 + idx * 0.05 }}
                        >
                          <span className="text-primary font-bold mt-0.5 group-hover:scale-125 transition-transform">•</span>
                          <span className="flex-1">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
