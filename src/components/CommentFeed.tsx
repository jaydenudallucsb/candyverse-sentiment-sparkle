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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl border-2 ${getSentimentColor()}`}
    >
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {author.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm">{author}</p>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
            <div className="flex items-center gap-2">
              {getSentimentIcon()}
              <Badge variant="outline" className="text-xs">
                {topic}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2 items-start">
            <Quote className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm italic text-foreground">{text}</p>
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
    <Card>
      <CardHeader>
        <CardTitle>User Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
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
