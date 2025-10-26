import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { competitiveInsights, Platform } from '@/data/sentimentData';
import { motion } from 'framer-motion';

interface CompetitiveInsightsPanelProps {
  selectedCompetitor: Platform | null;
}

export const CompetitiveInsightsPanel = ({ selectedCompetitor }: CompetitiveInsightsPanelProps) => {
  const insights = selectedCompetitor
    ? competitiveInsights.filter(i => i.competitor === selectedCompetitor)
    : competitiveInsights.filter(i => i.priority === 'high');

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-success" />;
      case 'threat':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return <TrendingDown className="w-5 h-5 text-warning" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'opportunity':
        return 'border-success/30 bg-success/5';
      case 'threat':
        return 'border-destructive/30 bg-destructive/5';
      default:
        return 'border-warning/30 bg-warning/5';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary',
    } as const;
    
    return (
      <Badge variant={variants[priority as keyof typeof variants]}>
        {priority} priority
      </Badge>
    );
  };

  return (
    <Card className="border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Lightbulb className="w-6 h-6 text-primary" />
          </motion.div>
          {selectedCompetitor 
            ? `Insights from ${selectedCompetitor.charAt(0).toUpperCase() + selectedCompetitor.slice(1)}`
            : 'Top Strategic Insights for Slack'
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Alert className={`${getImpactColor(insight.impact)} border-2 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-4 flex-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {getImpactIcon(insight.impact)}
                    </motion.div>
                    <div className="space-y-2 flex-1">
                      <h4 className="font-bold text-lg">{insight.title}</h4>
                      {getPriorityBadge(insight.priority)}
                    </div>
                  </div>
                </div>

                <AlertDescription className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">📊 Trend</p>
                    <p className="text-muted-foreground">{insight.trend}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Action for Slack</p>
                        <p className="text-muted-foreground">{insight.actionableRecommendation}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-foreground mb-1">⚖️ Competitive Position</p>
                    <p className="text-muted-foreground">{insight.slackComparison}</p>
                  </div>
                </AlertDescription>
              </div>
            </Alert>
          </motion.div>
        ))}

        {insights.length === 0 && (
          <p className="text-center text-muted-foreground py-6">
            Select a competitor moon to see specific insights
          </p>
        )}
      </CardContent>
    </Card>
  );
};
