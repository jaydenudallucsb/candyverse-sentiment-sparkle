import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopicCluster } from '@/data/sentimentData';
import { motion } from 'framer-motion';

interface TrendChartProps {
  topic: TopicCluster;
  timeLabels?: string[];
}

export const TrendChart = ({ topic, timeLabels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'] }: TrendChartProps) => {
  const maxValue = Math.max(...topic.trend);
  const minValue = Math.min(...topic.trend);
  const range = maxValue - minValue;

  const getColor = () => {
    switch (topic.sentiment) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-warning';
    }
  };

  const getBarColor = () => {
    switch (topic.sentiment) {
      case 'positive':
        return 'bg-success';
      case 'negative':
        return 'bg-destructive';
      default:
        return 'bg-warning';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{topic.topic}</span>
          <span className={`text-sm font-normal ${getColor()}`}>
            {topic.sentiment}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="h-48 flex items-end gap-2">
            {topic.trend.map((value, index) => {
              const height = ((value - minValue) / range) * 100;
              const isLatest = index === topic.trend.length - 1;
              
              return (
                <motion.div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-1 w-full flex flex-col justify-end">
                    <div className="relative group">
                      <div
                        className={`w-full rounded-t-lg transition-all ${getBarColor()} ${
                          isLatest ? 'opacity-100 shadow-lg' : 'opacity-60'
                        } hover:opacity-100`}
                        style={{ height: `${height}%`, minHeight: '4px' }}
                      />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-foreground text-background px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xl">
                          {value}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`text-xs ${isLatest ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                    {timeLabels[index]}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current</p>
              <p className="font-bold text-lg">{topic.trend[topic.trend.length - 1]}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Change</p>
              <p className={`font-bold text-lg ${
                topic.trend[topic.trend.length - 1] > topic.trend[0] ? 'text-success' : 'text-destructive'
              }`}>
                {topic.trend[topic.trend.length - 1] > topic.trend[0] ? '+' : ''}
                {topic.trend[topic.trend.length - 1] - topic.trend[0]}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Mentions</p>
              <p className="font-bold text-lg">{topic.mentions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
