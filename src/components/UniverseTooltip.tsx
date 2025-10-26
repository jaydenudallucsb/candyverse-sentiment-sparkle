import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface UniverseTooltipProps {
  isVisible: boolean;
  position: { x: number; y: number };
  content: {
    title: string;
    metrics: { label: string; value: string | number; variant?: 'default' | 'secondary' | 'destructive' }[];
  };
}

export const UniverseTooltip = ({ isVisible, position, content }: UniverseTooltipProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.2 
          }}
          className="fixed z-50 pointer-events-none"
          style={{ left: position.x + 20, top: position.y + 20 }}
        >
          <div className="glass rounded-2xl p-4 border border-primary/40 shadow-[0_0_40px_rgba(59,130,246,0.2)] backdrop-blur-xl min-w-[250px]">
            <motion.h4 
              className="font-semibold text-foreground mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {content.title}
            </motion.h4>
            <div className="space-y-2">
              {content.metrics.map((metric, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-muted-foreground">{metric.label}:</span>
                  <Badge variant={metric.variant || 'default'} className="ml-2 font-mono">
                    {metric.value}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
