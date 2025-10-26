import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, BarChart3, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="full-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center max-w-5xl space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-foreground tracking-tight"
          >
            When you want to understand
            <br />
            <span className="text-foreground/80">your competitors,</span>
            <br />
            all the data conspires
            <br />
            <span className="text-foreground/80">to help you achieve it.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-foreground/50 italic text-lg"
          >
            Unwrap.ai
          </motion.p>
        </motion.div>

        {/* Info Box - Bottom Left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-8 max-w-sm text-sm text-foreground/60 leading-relaxed glass p-6 rounded-lg"
        >
          Unwrap.ai is an intelligent sentiment analysis platform that goes beyond surface-level metrics to give teams
          true understanding of competitive landscapes. We analyze user sentiment across Slack, Discord, and Microsoft
          Teams in real-time.
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="full-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl space-y-12"
        >
          <h2 className="text-4xl md:text-6xl font-light text-foreground leading-tight">
            Understanding sentiment
            <br />
            <span className="text-foreground/60">is the single</span>
            <br />
            most important ingredient
            <br />
            <span className="text-foreground/60">in competitive intelligence.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="glass p-8 rounded-lg space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto" />
              <h3 className="text-xl font-light text-foreground">Real-Time Analysis</h3>
              <p className="text-sm text-foreground/60">
                Track sentiment shifts as they happen across multiple platforms simultaneously.
              </p>
            </div>
            <div className="glass p-8 rounded-lg space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 mx-auto" />
              <h3 className="text-xl font-light text-foreground">Topic Clustering</h3>
              <p className="text-sm text-foreground/60">
                AI-powered analysis groups feedback into actionable themes and trends.
              </p>
            </div>
            <div className="glass p-8 rounded-lg space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 mx-auto" />
              <h3 className="text-xl font-light text-foreground">Competitive Edge</h3>
              <p className="text-sm text-foreground/60">
                Identify opportunities by understanding what users love—and hate—about alternatives.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Solution Section */}
      <section className="full-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl space-y-12"
        >
          <h2 className="text-4xl md:text-6xl font-light text-foreground leading-tight">
            Unwrap.ai is that conspiracy:
            <br />
            <span className="text-primary">the conspiracy of insight.</span>
          </h2>

          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Our platform visualizes sentiment as an interactive universe. Slack sits at the center, while Discord and
            Teams orbit as moons—each sized by mention volume, colored by sentiment, and clustered by topic.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <button
              onClick={() => navigate("/candyverse")}
              className="px-10 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-light tracking-wide hover:bg-primary/90 transition-all"
            >
              Explore The Analysis
            </button>
            <button
              onClick={() => navigate("/podcast")}
              className="px-10 py-4 glass text-foreground rounded-lg text-lg font-light tracking-wide hover:bg-white/10 transition-all"
            >
              View Insights
            </button>
          </div>
        </motion.div>
      </section>

      {/* Platform Section */}
      <section className="full-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-6xl space-y-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-foreground">Three platforms. One universe.</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slack/40 to-slack/10 mx-auto flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slack" />
              </div>
              <h3 className="text-2xl font-light text-slack">Slack</h3>
              <p className="text-foreground/60 leading-relaxed">56.6% positive sentiment.</p>
            </div>

            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 mx-auto flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent" />
              </div>
              <h3 className="text-2xl font-light text-accent">Discord</h3>
              <p className="text-foreground/60 leading-relaxed">38.1% positive sentiment.</p>
            </div>

            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary/40 to-secondary/10 mx-auto flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-secondary" />
              </div>
              <h3 className="text-2xl font-light text-secondary">Teams</h3>
              <p className="text-foreground/60 leading-relaxed">52.5% positive sentiment.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Detailed Sentiment Analysis Section */}
      <section className="full-section bg-gradient-to-b from-background via-muted/20 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl w-full space-y-16"
        >
          <div className="text-center space-y-4">
            <Badge className="px-4 py-2 text-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Cross-Platform Intelligence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Sentiment Percentages
              <br />
              <span className="text-foreground/60">by Platform</span>
            </h2>
          </div>

          {/* Platform Sentiment Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Slack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-slack/20 hover:border-slack/40 transition-all h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slack/40 to-slack/10 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-slack" />
                  </div>
                  <CardTitle className="text-center text-2xl font-light text-slack">Slack</CardTitle>
                  <CardDescription className="text-center">1,376 total comments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-foreground/80">Positive</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-success">56.5%</p>
                        <p className="text-xs text-foreground/50">778 comments</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-foreground/30" />
                        <span className="text-sm text-foreground/80">Neutral</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-foreground/60">23.0%</p>
                        <p className="text-xs text-foreground/50">316 comments</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-foreground/80">Negative</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-destructive">20.5%</p>
                        <p className="text-xs text-foreground/50">282 comments</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-center text-foreground/60">Average Score</p>
                    <p className="text-3xl font-light text-center text-success">+0.218</p>
                    <p className="text-xs text-center text-foreground/50 mt-1">Slightly positive overall</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Discord */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-accent/20 hover:border-accent/40 transition-all h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-accent" />
                  </div>
                  <CardTitle className="text-center text-2xl font-light text-accent">Discord</CardTitle>
                  <CardDescription className="text-center">1,684 total comments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-foreground/80">Positive</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-success">38.1%</p>
                        <p className="text-xs text-foreground/50">641 comments</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-foreground/30" />
                        <span className="text-sm text-foreground/80">Neutral</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-foreground/60">27.7%</p>
                        <p className="text-xs text-foreground/50">466 comments</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-foreground/80">Negative</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-destructive">34.3%</p>
                        <p className="text-xs text-foreground/50">577 comments</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-center text-foreground/60">Average Score</p>
                    <p className="text-3xl font-light text-center text-foreground/70">+0.011</p>
                    <p className="text-xs text-center text-foreground/50 mt-1">Barely positive/neutral</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Microsoft Teams */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-secondary/20 hover:border-secondary/40 transition-all h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/40 to-secondary/10 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-secondary" />
                  </div>
                  <CardTitle className="text-center text-2xl font-light text-secondary">Microsoft Teams</CardTitle>
                  <CardDescription className="text-center">1,602 total comments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-foreground/80">Positive</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-success">52.5%</p>
                        <p className="text-xs text-foreground/50">841 comments</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-foreground/30" />
                        <span className="text-sm text-foreground/80">Neutral</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-foreground/60">26.5%</p>
                        <p className="text-xs text-foreground/50">424 comments</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-foreground/80">Negative</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-destructive">21.0%</p>
                        <p className="text-xs text-foreground/50">337 comments</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-center text-foreground/60">Average Score</p>
                    <p className="text-3xl font-light text-center text-success">+0.193</p>
                    <p className="text-xs text-center text-foreground/50 mt-1">Slightly positive</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                Key Takeaways
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Positive Rankings */}
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <CardTitle className="text-xl font-light">Positive Sentiment</CardTitle>
                  </div>
                  <CardDescription className="text-center">Ranking by % Positive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-success" />
                      <span className="font-light">Slack</span>
                    </div>
                    <span className="text-xl font-light text-success">56.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60">2.</span>
                      <span className="font-light">Teams</span>
                    </div>
                    <span className="text-xl font-light">52.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60">3.</span>
                      <span className="font-light">Discord</span>
                    </div>
                    <span className="text-xl font-light">38.1%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Negative Rankings */}
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                    <CardTitle className="text-xl font-light">Negative Sentiment</CardTitle>
                  </div>
                  <CardDescription className="text-center">Ranking by % Negative</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-destructive rotate-180" />
                      <span className="font-light">Discord</span>
                    </div>
                    <span className="text-xl font-light text-destructive">34.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60">2.</span>
                      <span className="font-light">Teams</span>
                    </div>
                    <span className="text-xl font-light">21.0%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60">3.</span>
                      <span className="font-light">Slack</span>
                    </div>
                    <span className="text-xl font-light">20.5%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Average Score Rankings */}
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl font-light">Overall Score</CardTitle>
                  </div>
                  <CardDescription className="text-center">Average Sentiment Score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="font-light">Slack</span>
                    </div>
                    <span className="text-xl font-light text-primary">+0.218</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60">2.</span>
                      <span className="font-light">Teams</span>
                    </div>
                    <span className="text-xl font-light">+0.193</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60">3.</span>
                      <span className="font-light">Discord</span>
                    </div>
                    <span className="text-xl font-light">+0.011</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
