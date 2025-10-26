import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, Minus, Quote } from 'lucide-react';
import { TopicCluster, SentimentType } from '@/data/sentimentData';
import { motion } from 'framer-motion';

interface CommentFeedProps {
  topics: TopicCluster[];
}

interface CommentProps {
  text: string;
  sentiment: SentimentType;
  topic: string;
  author: string;
  date: string;
  index: number;
}

const Comment = ({ text, sentiment, topic, author, date, index }: CommentProps) => {
  const getSentimentIcon = () => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-success" />;
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-warning" />;
    }
  };

  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'border-success/20 bg-success/5';
      case 'negative':
        return 'border-destructive/20 bg-destructive/5';
      default:
        return 'border-warning/20 bg-warning/5';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`p-5 rounded-2xl border-2 ${getSentimentColor()} hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden backdrop-blur-sm`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8 }}
      />
      <div className="flex gap-4 relative z-10">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar className="h-12 w-12 shrink-0 border-2 border-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-sm">
              {author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-base group-hover:text-primary transition-colors">{author}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{date}</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {getSentimentIcon()}
              </motion.div>
              <Badge variant="outline" className="text-xs font-medium hover:bg-primary/10 transition-colors">
                {topic}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-3 items-start p-4 rounded-xl bg-background/50 border border-border/50">
            <Quote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CommentFeed = ({ topics }: CommentFeedProps) => {
  // Flatten all quotes from all topics
  const allComments = topics.flatMap((topic) =>
    topic.quotes.map((quote, index) => ({
      text: quote,
      sentiment: topic.sentiment,
      topic: topic.topic,
      author: `User${Math.floor(Math.random() * 1000)}`,
      date: `${Math.floor(Math.random() * 7) + 1} days ago`,
      topicId: topic.id,
      quoteIndex: index,
    }))
  );

  // Sort by sentiment and recent first
  const sortedComments = allComments.sort((a, b) => {
    const sentimentOrder = { negative: 0, neutral: 1, positive: 2 };
    return sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment];
  });

  return (
    <Card className="border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-card to-card/50 shadow-xl">
      <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-3 h-3 rounded-full bg-success animate-pulse-glow"
          />
          User Feedback
          <Badge variant="secondary" className="ml-auto">
            {sortedComments.length} comments
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-3 custom-scrollbar">
          {sortedComments.map((comment, index) => (
            <Comment
              key={`${comment.topicId}-${comment.quoteIndex}`}
              text={comment.text}
              sentiment={comment.sentiment}
              topic={comment.topic}
              author={comment.author}
              date={comment.date}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
