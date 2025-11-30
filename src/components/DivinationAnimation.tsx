

import React, { useEffect, useState, useRef } from 'react';
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const runAnimation = async () => {
      // Initial delay
      await new Promise(r => setTimeout(r, 500));

      // Step 1: Month (Start from Da An = 1)
      setMessage(t.ui.step1);
      setStep(1);
      await simulateCount(1, path[0]);
      
      await new Promise(r => setTimeout(r, 600));

      // Step 2: Day (Start from Month Result)
      setMessage(t.ui.step2);
      setStep(2);
      await simulateCount(path[0], path[1]);

      await new Promise(r => setTimeout(r, 600));

      // Step 3: Hour (Start from Day Result)
      setMessage(t.ui.step3);
      setStep(3);
      await simulateCount(path[1], path[2]);

      await new Promise(r => setTimeout(r, 800));
      onComplete();
    };

    runAnimation();
  }, []);

  const simulateCount = async (start: number, end: number) => {
    let current = start;
    
    // Calculate total steps needed. 
    // If start=1, end=3. Steps: 1->2->3. (2 steps movement, but we highlight 3 nodes)
    // We want to highlight 'start' first, then move.
    
    // Highlight Start
    setActivePalace(current);
    await new Promise(r => setTimeout(r, 300));

    const distance = (end - start + 6) % 6;
    // If distance is 0 (start == end), we just stay there.
    // Otherwise we move 'distance' times.

    for (let i = 0; i < distance; i++) {
      // Move to next
      current = (current % 6) + 1;
      setActivePalace(current);
      // Play tick sound if we had one
      await new Promise(r => setTimeout(r, 200)); // Speed of counting
    }
    
    // Final highlight for this step
    await new Promise(r => setTimeout(r, 200));
  };

  return (
    <div className="animation-container">
      <h2 className="animate-pulse text-xl mb-4 text-primary font-serif">{t.ui.calculating}</h2>
      <div className="text-sm text-gray-400 mb-8 h-6">{message}</div>
      
      <div className="palace-grid">
        {PALACES.map((p) => {
          const isActive = activePalace === p.id;
          // Determine if this node is a "final" result of a previous step
          const isMonthResult = step >= 1 && p.id === path[0];
          const isDayResult = step >= 2 && p.id === path[1];
          const isHourResult = step >= 3 && p.id === path[2];
          
          // Current active node style
          let className = `palace-node`;
          if (isActive) className += ' active';
          
          // Persistent markers for completed steps
          if (isMonthResult && step > 1) className += ' marker-month';
          if (isDayResult && step > 2) className += ' marker-day';
          
          return (
            <div key={p.id} className={className}>
              <div className="palace-node-name">{lang === 'zh' ? p.cnName : p.name}</div>
              {isMonthResult && step > 1 && <div className="marker-label">M</div>}
              {isDayResult && step > 2 && <div className="marker-label">D</div>}
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
          width: 100%;
        }
        .palace-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem; /* Increased gap */
          max-width: 350px;
          position: relative;
        }
        /* Connect the grid to look more like a hand/circle if desired, 
           but grid is clearer for now. */
           
        .palace-node {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(30, 41, 59, 0.6); /* Glassy */
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
          transition: all 0.2s ease;
          position: relative;
          color: #94a3b8;
        }

        .palace-node.active {
          border-color: var(--primary-color);
          background: rgba(251, 191, 36, 0.2);
          color: var(--primary-color);
          transform: scale(1.15);
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.4);
          z-index: 10;
        }

        .palace-node.marker-month {
          border-color: var(--secondary-color);
          color: var(--secondary-color);
        }
        
        .palace-node.marker-day {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .marker-label {
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 0.6rem;
          width: 18px;
          height: 18px;
          background: #0f172a;
          border: 1px solid currentColor;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
        }

        .palace-node-name {
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
        }
        
        @media (max-width: 480px) {
          .palace-grid {
             gap: 1rem;
          }
          .palace-node {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </div>
  );
}

