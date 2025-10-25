import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
          Unwrap.ai is an intelligent sentiment analysis platform that goes beyond surface-level metrics 
          to give teams true understanding of competitive landscapes. We analyze user sentiment 
          across Slack, Discord, and Microsoft Teams in real-time.
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
            Our platform visualizes sentiment as an interactive universe. Slack sits at the center, 
            while Discord and Teams orbit as moons—each sized by mention volume, colored by sentiment, 
            and clustered by topic.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <button
              onClick={() => navigate('/candyverse')}
              className="px-10 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-light tracking-wide hover:bg-primary/90 transition-all"
            >
              Explore The Analysis
            </button>
            <button
              onClick={() => navigate('/podcast')}
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
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Three platforms. One universe.
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slack/40 to-slack/10 mx-auto flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slack" />
              </div>
              <h3 className="text-2xl font-light text-slack">Slack</h3>
              <p className="text-foreground/60 leading-relaxed">
                The central hub. 72% positive sentiment with concerns around pricing 
                creating opportunities for market positioning.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 mx-auto flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent" />
              </div>
              <h3 className="text-2xl font-light text-accent">Discord</h3>
              <p className="text-foreground/60 leading-relaxed">
                The rising competitor. 84% sentiment driven by innovative AI features 
                and strong community engagement.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary/40 to-secondary/10 mx-auto flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-secondary" />
              </div>
              <h3 className="text-2xl font-light text-secondary">Teams</h3>
              <p className="text-foreground/60 leading-relaxed">
                The enterprise alternative. 58% sentiment reveals performance and UX 
                pain points to capitalize on.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
