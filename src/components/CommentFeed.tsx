import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Minus, User, Quote } from 'lucide-react';
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.01 }}
      className="glass p-6 rounded-2xl space-y-4 hover:bg-muted/20 transition-all duration-300 cursor-pointer relative overflow-hidden group"
    >
      {/* Sentiment Indicator Line */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          sentiment === 'positive'
            ? 'bg-gradient-to-b from-success to-success/50'
            : sentiment === 'negative'
            ? 'bg-gradient-to-b from-destructive to-destructive/50'
            : 'bg-gradient-to-b from-warning to-warning/50'
        }`}
      />

      <div className="flex items-start gap-4 pl-4">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${
            sentiment === 'positive'
              ? 'from-success/30 to-success/10'
              : sentiment === 'negative'
              ? 'from-destructive/30 to-destructive/10'
              : 'from-warning/30 to-warning/10'
          } flex items-center justify-center flex-shrink-0 cursor-pointer relative overflow-hidden`}
        >
          <User className="w-6 h-6 text-foreground/60 relative z-10" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-light text-foreground">{author}</span>
            <span className="text-xs text-foreground/30">•</span>
            <span className="text-xs text-foreground/50">{date}</span>
            <Badge variant="outline" className="text-xs">
              {topic}
            </Badge>
          </div>
          <div className="flex gap-3 items-start">
            <Quote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/70 leading-relaxed font-light">
              {text}
            </p>
          </div>
        </div>

        {/* Sentiment Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            sentiment === 'positive'
              ? 'bg-success/20 text-success'
              : sentiment === 'negative'
              ? 'bg-destructive/20 text-destructive'
              : 'bg-warning/20 text-warning'
          }`}
        >
          {sentiment === 'positive' && <ThumbsUp className="w-5 h-5" />}
          {sentiment === 'negative' && <ThumbsDown className="w-5 h-5" />}
          {sentiment === 'neutral' && <Minus className="w-5 h-5" />}
        </motion.div>
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
    <div className="glass p-8 rounded-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Quote className="w-8 h-8 text-primary" />
          <h3 className="text-2xl font-light text-foreground">Community Voices</h3>
        </div>
        <Badge variant="outline" className="text-sm px-4 py-1.5">
          {sortedComments.length} insights
        </Badge>
      </div>

      <div className="space-y-6 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
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
    </div>
  );
};
