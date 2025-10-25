import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Sparkles, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    { path: '/', label: 'Overview', icon: Sparkles },
    { path: '/candyverse', label: 'Analysis', icon: Globe },
    { path: '/podcast', label: 'Insights', icon: Radio },
  ];

  return (
    <div className="min-h-screen">
      {/* Subtle background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-36 h-36 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Sparkles className="w-10 h-10 text-primary transition-transform group-hover:scale-110" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Unwrap.ai
                </h1>
                <p className="text-xs text-muted-foreground">Competitive Sentiment Intelligence</p>
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
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
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
          <p>Powered by Unwrap.ai • Competitive sentiment intelligence for modern teams</p>
        </div>
      </footer>
    </div>
  );
};
