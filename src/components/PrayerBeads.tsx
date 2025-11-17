import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type BeadColor = 'red' | 'yellow' | 'blue' | 'lightblue' | 'green' | 'purple' | 'orange' | 'pink';

const colorMap: Record<BeadColor, string> = {
  red: '#DC2626',
  yellow: '#FBBF24',
  blue: '#2563EB',
  lightblue: '#06B6D4',
  green: '#059669',
  purple: '#7C3AED',
  orange: '#F97316',
  pink: '#EC4899'
};

export default function PrayerBeads() {
  const [count, setCount] = useState(0);
  const [animatingBead, setAnimatingBead] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<BeadColor>('red');

  const totalBeads = 50;
  const currentBead = count % totalBeads;

  const handleIncrement = () => {
    setCount(count + 1);
    setAnimatingBead(currentBead);
    setTimeout(() => setAnimatingBead(null), 300);
  };

  const handleReset = () => {
    setCount(0);
    setAnimatingBead(null);
  };

  const renderBeads = () => {
    const beads = [];
    const radius = 140;
    const centerX = 160;
    const centerY = 160;

    for (let i = 0; i < totalBeads; i++) {
      const angle = (i / totalBeads) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const isActive = i === currentBead;
      const isPassed = i < currentBead;
      const isAnimating = i === animatingBead;

      beads.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={isAnimating ? 8 : isActive ? 7 : 5}
          fill={isActive || isPassed ? colorMap[selectedColor] : '#D1D5DB'}
          className={`transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
          style={{
            filter: isActive ? 'drop-shadow(0 0 6px rgba(0,0,0,0.3))' : 'none'
          }}
        />
      );
    }

    return beads;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card className="p-8 bg-card/80 backdrop-blur">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <svg width="320" height="380" viewBox="0 0 320 380" className="drop-shadow-lg">
              <line
                x1="160"
                y1="305"
                x2="160"
                y2="360"
                stroke={colorMap[selectedColor]}
                strokeWidth="3"
              />
              {renderBeads()}
              <g transform="translate(160, 365)">
                <rect
                  x="-15"
                  y="-5"
                  width="30"
                  height="10"
                  fill={colorMap[selectedColor]}
                  rx="2"
                />
                <rect
                  x="-8"
                  y="5"
                  width="16"
                  height="25"
                  fill={colorMap[selectedColor]}
                  rx="2"
                />
                <rect
                  x="-12"
                  y="30"
                  width="24"
                  height="8"
                  fill={colorMap[selectedColor]}
                  rx="2"
                />
              </g>
            </svg>
          </div>

          <div className="text-center space-y-2">
            <p className="text-5xl font-bold text-primary font-['Cormorant']">{count}</p>
            <p className="text-sm text-muted-foreground">молитв прочитано</p>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              onClick={handleIncrement}
              size="lg"
              className="flex-1 text-lg font-semibold"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              +1
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
            >
              <Icon name="RotateCcw" size={20} />
            </Button>
          </div>

          <div className="w-full space-y-3">
            <p className="text-sm font-medium text-center">Цвет четок</p>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(colorMap) as BeadColor[]).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-10 rounded-md border-2 transition-all ${
                    selectedColor === color
                      ? 'border-primary scale-110 shadow-lg'
                      : 'border-border hover:scale-105'
                  }`}
                  style={{ backgroundColor: colorMap[color] }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
