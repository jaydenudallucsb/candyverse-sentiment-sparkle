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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 pointer-events-none"
          style={{ left: position.x + 20, top: position.y + 20 }}
        >
          <div className="glass rounded-xl p-4 border-2 border-primary/40 shadow-2xl backdrop-blur-xl min-w-[250px]">
            <h4 className="font-semibold text-foreground mb-3">{content.title}</h4>
            <div className="space-y-2">
              {content.metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">{metric.label}:</span>
                  <Badge variant={metric.variant || 'default'} className="ml-2">
                    {metric.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
