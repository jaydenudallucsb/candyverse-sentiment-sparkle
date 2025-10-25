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
            <span className="text-sm font-medium text-primary">Welcome to the Candyverse</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Unwrap User Sentiment
            </span>
            <br />
            <span className="text-foreground">One Sweet Story at a Time</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Step into a magical candy world where user emotions become delicious data visualizations. 
            We analyze sentiment across Slack, Discord, and Microsoft Teams to reveal how communities 
            truly feel about their platforms.
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
                    Slack knows its users inside and out — but what about the communities thriving on 
                    <span className="font-semibold text-foreground"> Discord </span> and 
                    <span className="font-semibold text-foreground"> Microsoft Teams</span>? 
                    Understanding competitor sentiment is like having a blind spot in a candy store. 
                    You can't improve your recipe if you don't know what flavors are winning hearts elsewhere.
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
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Solution: The Candyverse</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Welcome to the <span className="font-bold text-accent">Candyverse</span> — where each 
                    platform becomes a candy planet with its own sweet ecosystem:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-caramel/10 border border-caramel/20 space-y-3">
                      <div className="text-4xl">🍮</div>
                      <h3 className="font-bold text-caramel text-lg">Slack's Caramel Core</h3>
                      <p className="text-sm text-muted-foreground">
                        Smooth and glowing when users are happy, cracked and darker when sentiment dips. 
                        Watch it soften as pricing concerns mount.
                      </p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 space-y-3">
                      <div className="text-4xl">🍬</div>
                      <h3 className="font-bold text-accent text-lg">Discord's Gummy Cluster</h3>
                      <p className="text-sm text-muted-foreground">
                        Squishy spheres that jiggle with engagement spikes. AI channels caused a massive 
                        bounce in positive sentiment!
                      </p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-3">
                      <div className="text-4xl">🍭</div>
                      <h3 className="font-bold text-secondary text-lg">Teams' Peppermint Swirl</h3>
                      <p className="text-sm text-muted-foreground">
                        Patterns tighten or loosen based on sentiment consistency. Performance issues 
                        create tangled, chaotic swirls.
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
          <h2 className="text-3xl font-bold text-foreground">Ready to Explore?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into the interactive Candyverse to see how sentiment evolves over time, 
            or listen to our weekly Podcast Recap for bite-sized insights.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/candyverse"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Enter the Candyverse →
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Dashboard;
