
import React, { useEffect, useState } from 'react';
import { Palace, PALACES } from '@/lib/xiaoliuren';
import { TRANSLATIONS } from '@/lib/translations';

interface Props {
  path: number[]; // [MonthIndex, DayIndex, HourIndex]
  onComplete: () => void;
  lang: 'zh' | 'en';
}

export default function DivinationAnimation({ path, onComplete, lang }: Props) {
  const [activePalace, setActivePalace] = useState<number | null>(null);
  const [step, setStep] = useState(0); // 0: Start, 1: Month, 2: Day, 3: Hour
  const [message, setMessage] = useState('');
  
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // Animation Sequence
    const runAnimation = async () => {
      // Step 1: Month/First
      setMessage(`${t.ui.step1}...`);
      await simulateCount(1, path[0]);
      setStep(1);
      
      await new Promise(r => setTimeout(r, 800));

      // Step 2: Day/Second
      setMessage(`${t.ui.step2}...`);
      await simulateCount(path[0], path[1]);
      setStep(2);

      await new Promise(r => setTimeout(r, 800));

      // Step 3: Hour/Third
      setMessage(`${t.ui.step3}...`);
      await simulateCount(path[1], path[2]);
      setStep(3);

      await new Promise(r => setTimeout(r, 1000));
      onComplete();
    };

    runAnimation();
  }, []);

  const simulateCount = async (start: number, end: number) => {
    // Determine number of steps.
    // In Xiao Liu Ren, we count clockwise.
    // Distance = (End - Start + 6) % 6. If 0, it means 6 steps (or 0 if start==end, but usually we count at least 1).
    // Actually, if start=1, end=1, we count 1.
    // Let's just visualize the "landing" for now to save time, or do a quick cycle.
    // Let's do a quick cycle visual.
    
    let current = start;
    const steps = (end - start + 6) % 6; 
    // If steps is 0, it means we land on the same spot.
    
    // Flash current
    setActivePalace(current);
    await new Promise(r => setTimeout(r, 300));

    // If we need to move
    if (steps > 0 || start === end) {
       // Simple visual: just jump to end for now to keep it snappy, 
       // or iterate if we want "counting" feel.
       // Let's iterate a bit.
       let count = 0;
       while (count < steps) {
         current = (current % 6) + 1;
         setActivePalace(current);
         await new Promise(r => setTimeout(r, 200));
         count++;
       }
    }
  };

  return (
    <div className="animation-container">
      <h2 className="animate-pulse text-xl mb-4 text-primary">{t.ui.calculating}</h2>
      <div className="text-sm text-gray-400 mb-8">{message}</div>
      
      <div className="palace-grid">
        {PALACES.map((p) => {
          const isActive = activePalace === p.id;
          const isFinal = step === 3 && isActive;
          
          return (
            <div 
              key={p.id} 
              className={`palace-node ${isActive ? 'active' : ''} ${isFinal ? 'final' : ''}`}
            >
              <div className="palace-node-name">{lang === 'zh' ? p.cnName : p.name}</div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .animation-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .palace-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          max-width: 300px;
        }
        .palace-node {
          width: 80px;
          height: 80px;
          border: 2px solid #334155;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1e293b;
          transition: all 0.3s ease;
          opacity: 0.5;
        }
        .palace-node.active {
          border-color: #fbbf24;
          background: rgba(251, 191, 36, 0.1);
          opacity: 1;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
        }
        .palace-node.final {
          border-color: #f472b6;
          background: rgba(244, 114, 182, 0.2);
          box-shadow: 0 0 25px rgba(244, 114, 182, 0.5);
        }
        .palace-node-name {
          font-size: 0.8rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
