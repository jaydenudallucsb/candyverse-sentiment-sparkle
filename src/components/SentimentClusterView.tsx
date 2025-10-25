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
          <Card className={`border-2 ${getSentimentColor(cluster.sentiment)}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{cluster.category}</span>
                {getSentimentIcon(cluster.sentiment)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sentiment Percentage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Sentiment Score</span>
                  <span className="text-2xl font-bold">{cluster.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      cluster.sentiment === 'positive'
                        ? 'bg-success'
                        : cluster.sentiment === 'negative'
                        ? 'bg-destructive'
                        : 'bg-warning'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${cluster.percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Keywords */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Top Keywords</p>
                <div className="flex flex-wrap gap-1">
                  {cluster.keywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Update */}
              {cluster.recentUpdate && (
                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-start gap-2">
                    {getImpactIcon(cluster.recentUpdate.impact)}
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{cluster.recentUpdate.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cluster.recentUpdate.date}
                      </p>
                    </div>
                  </div>
                  {cluster.recentUpdate.summary && cluster.recentUpdate.summary.length > 0 && (
                    <ul className="space-y-1 ml-7">
                      {cluster.recentUpdate.summary.map((point, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-foreground/40 mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
