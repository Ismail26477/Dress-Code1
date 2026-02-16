import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const FlashSaleTimer = () => {
  const [time, setTime] = useState({ h: 5, m: 42, s: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <Zap size={16} className="text-primary" fill="currentColor" />
      <span className="text-sm font-bold text-foreground">Flash Sale</span>
      <div className="flex items-center gap-1 ml-auto">
        {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">{val}</span>
            {i < 2 && <span className="text-primary font-bold text-xs">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleTimer;
