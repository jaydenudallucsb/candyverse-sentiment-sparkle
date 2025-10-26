import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Sparkles, MessageCircle } from 'lucide-react';

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
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {clusters.map((cluster, index) => (
        <motion.div
          key={cluster.category}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="glass p-10 rounded-3xl space-y-8 relative overflow-hidden group cursor-pointer"
        >
          {/* Background Gradient */}
          <motion.div
            className={`absolute inset-0 ${
              cluster.sentiment === 'positive'
                ? 'bg-gradient-to-br from-success/10'
                : cluster.sentiment === 'negative'
                ? 'bg-gradient-to-br from-destructive/10'
                : 'bg-gradient-to-br from-warning/10'
            } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          <div className="relative z-10 space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <MessageCircle className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-3xl font-light text-foreground leading-tight">
                  {cluster.category}
                </h3>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3, type: "spring", bounce: 0.5 }}
                viewport={{ once: true }}
                className="text-6xl font-light bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent tabular-nums"
              >
                {cluster.percentage}
                <span className="text-3xl">%</span>
              </motion.div>
            </div>

            {/* Sentiment Bar */}
            <div className="space-y-3">
              <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    cluster.sentiment === 'positive'
                      ? 'bg-gradient-to-r from-success via-success/80 to-success/60'
                      : cluster.sentiment === 'negative'
                      ? 'bg-gradient-to-r from-destructive via-destructive/80 to-destructive/60'
                      : 'bg-gradient-to-r from-warning via-warning/80 to-warning/60'
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cluster.percentage}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
              <Badge
                variant={
                  cluster.sentiment === 'positive'
                    ? 'default'
                    : cluster.sentiment === 'negative'
                    ? 'destructive'
                    : 'secondary'
                }
                className="text-xs"
              >
                {cluster.sentiment}
              </Badge>
            </div>

            {/* Keywords */}
            <div className="space-y-4">
              <p className="text-xs text-foreground/50 uppercase tracking-widest">Key Themes</p>
              <div className="flex flex-wrap gap-2">
                {cluster.keywords.map((keyword, i) => (
                  <motion.div
                    key={keyword}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + i * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-sm px-4 py-1.5 hover:bg-primary/10 transition-all"
                    >
                      {keyword}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Update */}
            {cluster.recentUpdate && (
              <div className="space-y-4 pt-4 border-t border-foreground/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-foreground/50" />
                  <p className="text-xs text-foreground/50 uppercase tracking-widest">
                    {cluster.recentUpdate.date}
                  </p>
                </div>
                <h4 className="text-lg font-light text-foreground">{cluster.recentUpdate.title}</h4>
                <ul className="space-y-3">
                  {cluster.recentUpdate.summary.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-sm text-foreground/70 flex items-start gap-3 leading-relaxed"
                    >
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
