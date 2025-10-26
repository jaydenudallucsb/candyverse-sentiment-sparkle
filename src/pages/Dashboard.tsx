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
              <p className="text-foreground/60 leading-relaxed">56.5% positive sentiment.</p>
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
    </div>
  );
};

export default Dashboard;
