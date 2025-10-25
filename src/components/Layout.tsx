import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Candy, Sparkles, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    { path: '/', label: 'Dashboard', icon: Sparkles },
    { path: '/candyverse', label: 'Candyverse', icon: Candy },
    { path: '/podcast', label: 'Podcast', icon: Radio },
  ];

  return (
    <div className="min-h-screen">
      {/* Floating candy decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-12 h-12 rounded-full bg-primary/20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-secondary/20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-10 h-10 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-14 h-14 rounded-full bg-primary/15 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Candy className="w-10 h-10 text-primary transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse-glow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Unwrap.ai
                </h1>
                <p className="text-xs text-muted-foreground">Sentiment Analysis Candyverse</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 z-20 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setActiveTab(tab.path)}
                  className="relative"
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 px-6 py-4 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>Built with 🍭 by Unwrap.ai • Analyzing sentiment across the collaboration universe</p>
        </div>
      </footer>
    </div>
  );
};
