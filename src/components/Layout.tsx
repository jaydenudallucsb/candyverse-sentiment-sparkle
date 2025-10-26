import { Link, useLocation } from "react-router-dom";
import { Menu, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "INTRODUCTION" },
    { path: "/candyverse", label: "THE ANALYSIS" },
    { path: "/podcast", label: "INSIGHTS" },
  ];

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/20">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-light tracking-wider transition-colors ${
                  location.pathname === item.path
                    ? "text-foreground border-b-2 border-primary pb-1"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-light tracking-wider transition-colors ${
                    location.pathname === item.path
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>{children}</main>

      {/* Scroll Indicator (only on home) */}
      {location.pathname === "/" && (
        <div className="scroll-indicator text-foreground/40">
          <ChevronDown className="h-6 w-6" />
        </div>
      )}
    </div>
  );
};
