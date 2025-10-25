import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface TimeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  isPlaying?: boolean;
  onPlayPause?: () => void;
}

export const TimeSlider = ({
  value,
  onChange,
  min = 0,
  max = 6,
  step = 1,
  labels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  isPlaying = false,
  onPlayPause,
}: TimeSliderProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        {onPlayPause && (
          <Button
            variant="outline"
            size="icon"
            onClick={onPlayPause}
            className="shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        )}
        
        <div className="flex-1">
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        {labels.map((label, index) => (
          <span
            key={index}
            className={`transition-all ${
              index === value ? 'text-primary font-semibold scale-110' : ''
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Showing sentiment data for <span className="font-semibold text-primary">{labels[value]}</span>
        </p>
      </div>
    </div>
  );
};
