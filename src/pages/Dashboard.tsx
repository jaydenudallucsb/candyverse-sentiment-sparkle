import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Competitive Intelligence Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Understand User Sentiment
            </span>
            <br />
            <span className="text-foreground">Across Your Competition</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced sentiment analysis across Slack, Discord, and Microsoft Teams. 
            Identify trends, track competitor movements, and discover actionable insights 
            to inform your product strategy.
          </p>
        </motion.section>

        {/* The Problem */}
        <motion.section variants={itemVariants} className="space-y-6">
          <Card className="border-2 border-destructive/20 bg-destructive/5">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-destructive/10">
                  <Globe className="w-8 h-8 text-destructive" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-3">The Problem</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Slack understands its own users, but what about the communities on 
                    <span className="font-semibold text-foreground"> Discord </span> and 
                    <span className="font-semibold text-foreground"> Microsoft Teams</span>? 
                    Competitive intelligence requires visibility into how users feel about alternative platforms, 
                    their feature preferences, and emerging pain points across the market.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Our Approach */}
        <motion.section variants={itemVariants} className="space-y-6">
          <Card className="border-2 border-secondary/20 bg-secondary/5">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-secondary/10">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Approach</h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p className="leading-relaxed">
                      We collect user feedback from across the collaboration universe, performing deep 
                      sentiment and keyword analysis. Each comment becomes a candy in our visualization — 
                      sized by volume, colored by emotion, positioned by topic.
                    </p>
                    <ul className="space-y-3 ml-6">
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">Sentiment Scoring:</strong> Positive (mint green), Neutral (lemon yellow), Negative (cherry red)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">Topic Clustering:</strong> AI Features, Performance, Pricing, Community, and more</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">Timeline Analysis:</strong> Track how sentiment evolves with feature releases</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Our Solution */}
        <motion.section variants={itemVariants} className="space-y-6">
          <Card className="border-2 border-accent/20 bg-accent/5">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-accent/10">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Solution: Sentiment Universe</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Our interactive visualization platform positions each collaboration tool 
                    as a data sphere with real-time sentiment tracking:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-slack/10 border border-slack/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slack/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-slack" />
                      </div>
                      <h3 className="font-bold text-slack text-lg">Slack Central Hub</h3>
                      <p className="text-sm text-muted-foreground">
                        Primary platform at the center of analysis. Real-time sentiment tracking 
                        shows 72% positive with pricing concerns affecting overall perception.
                      </p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-accent" />
                      </div>
                      <h3 className="font-bold text-accent text-lg">Discord Moon</h3>
                      <p className="text-sm text-muted-foreground">
                        Orbiting competitor with 84% sentiment. AI feature launches driving 
                        significant positive engagement and user satisfaction.
                      </p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-secondary" />
                      </div>
                      <h3 className="font-bold text-secondary text-lg">Teams Moon</h3>
                      <p className="text-sm text-muted-foreground">
                        Competitor analysis shows 58% sentiment. Performance and UX issues 
                        creating opportunity for market repositioning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* CTA */}
        <motion.section variants={itemVariants} className="text-center space-y-6 py-12">
          <h2 className="text-3xl font-bold text-foreground">Start Analyzing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the interactive sentiment visualization to track trends over time, 
            or review our weekly insights summary for key competitive intelligence.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/candyverse"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              View Analysis →
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Dashboard;
