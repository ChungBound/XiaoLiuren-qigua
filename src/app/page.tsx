
'use client';

import { useState, useEffect } from 'react';
import { calculateByDate, calculateByNumbers, calculateByText, calculateByEvent, DivinationResult, Palace } from '@/lib/xiaoliuren';
import { TRANSLATIONS } from '@/lib/translations';
import DivinationAnimation from '@/components/DivinationAnimation';

type Lang = 'zh' | 'en';
type Method = 'date' | 'number' | 'text' | 'event';

export default function Home() {
  const [lang, setLang] = useState<Lang>('zh');
  const [method, setMethod] = useState<Method | null>(null);
  const [result, setResult] = useState<DivinationResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Inputs
  const [dateInput, setDateInput] = useState<string>('');
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [num3, setNum3] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [eventType, setEventType] = useState<string>('marriage');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // Set default date to now
    const now = new Date();
    // Format for datetime-local: YYYY-MM-DDTHH:mm
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setDateInput(`${year}-${month}-${day}T${hours}:${minutes}`);
  }, []);

  const handleCalculateDate = () => {
    if (!dateInput) return;
    const date = new Date(dateInput);
    const res = calculateByDate(date);
    startDivination(res);
  };

  const handleCalculateNumber = () => {
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);
    const n3 = parseInt(num3);
    
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) return;
    
    const res = calculateByNumbers(n1, n2, n3);
    startDivination(res);
  };

  const handleCalculateText = () => {
    if (!textInput) return;
    const res = calculateByText(textInput);
    startDivination(res);
  };

  const handleCalculateEvent = () => {
    const res = calculateByEvent(eventType as any, new Date());
    startDivination(res);
  };

  const startDivination = (res: DivinationResult) => {
    setResult(res);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const reset = () => {
    setResult(null);
    setMethod(null);
    setNum1('');
    setNum2('');
    setNum3('');
    setTextInput('');
    setIsAnimating(false);
  };

  const toggleLang = () => {
    setLang(l => l === 'zh' ? 'en' : 'zh');
  };

  const renderResult = () => {
    if (!result) return null;
    if (isAnimating) {
      return (
        <DivinationAnimation 
          path={result.path} 
          onComplete={handleAnimationComplete} 
          lang={lang}
        />
      );
    }
    
    const palaceData = t.palaces[result.hourPalace as unknown as keyof typeof t.palaces];
    
    return (
      <div className="result-card">
        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
          {result.lunarDateStr}
        </div>
        
        <div className="palace-name">{palaceData.name}</div>
        
        <div className="tags">
          {palaceData.keywords.map((k, i) => (
            <span key={i} className="tag">{k}</span>
          ))}
        </div>

        <div className="palace-meaning">
          "{palaceData.meaning}"
        </div>

        <div className="palace-detail">
          {palaceData.detail}
        </div>

        <button className="btn btn-outline" onClick={reset} style={{ marginTop: '2rem' }}>
          {t.ui.back}
        </button>
      </div>
    );
  };

  const renderMethodSelector = () => (
    <div className="card">
      <h1 className="title">{t.title}</h1>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <button className="btn" onClick={() => setMethod('date')}>
          {t.methods.date}
        </button>
        <button className="btn btn-outline" onClick={() => setMethod('number')}>
          {t.methods.number}
        </button>
        <button className="btn btn-outline" onClick={() => setMethod('text')}>
          {t.methods.text}
        </button>
        <button className="btn btn-outline" onClick={() => setMethod('event')}>
          {t.methods.event}
        </button>
      </div>
    </div>
  );

  const renderDateInput = () => (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t.methods.date}</h2>
      <div className="input-group">
        <label>{t.ui.input_date}</label>
        <input 
          type="datetime-local" 
          className="input-field"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleCalculateDate}>
        {t.ui.calculate}
      </button>
      <button className="btn btn-outline" onClick={() => setMethod(null)} style={{ marginTop: '0.5rem' }}>
        {t.ui.back}
      </button>
    </div>
  );

  const renderNumberInput = () => (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t.methods.number}</h2>
      <div className="input-group">
        <label>{t.ui.input_numbers}</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
          <input 
            type="number" 
            className="input-field" 
            placeholder="1"
            value={num1}
            onChange={e => setNum1(e.target.value)}
          />
          <input 
            type="number" 
            className="input-field" 
            placeholder="2"
            value={num2}
            onChange={e => setNum2(e.target.value)}
          />
          <input 
            type="number" 
            className="input-field" 
            placeholder="3"
            value={num3}
            onChange={e => setNum3(e.target.value)}
          />
        </div>
      </div>
      <button className="btn" onClick={handleCalculateNumber}>
        {t.ui.calculate}
      </button>
      <button className="btn btn-outline" onClick={() => setMethod(null)} style={{ marginTop: '0.5rem' }}>
        {t.ui.back}
      </button>
    </div>
  );

  const renderTextInput = () => (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t.methods.text}</h2>
      <div className="input-group">
        <label>{t.ui.input_text}</label>
        <input 
          type="text" 
          className="input-field" 
          placeholder="e.g. Willow Leaf"
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleCalculateText}>
        {t.ui.calculate}
      </button>
      <button className="btn btn-outline" onClick={() => setMethod(null)} style={{ marginTop: '0.5rem' }}>
        {t.ui.back}
      </button>
    </div>
  );

  const renderEventInput = () => (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t.methods.event}</h2>
      <div className="input-group">
        <label>{t.ui.select_event}</label>
        <select 
          className="input-field"
          value={eventType}
          onChange={e => setEventType(e.target.value)}
        >
          {Object.entries(t.events).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      <button className="btn" onClick={handleCalculateEvent}>
        {t.ui.calculate}
      </button>
      <button className="btn btn-outline" onClick={() => setMethod(null)} style={{ marginTop: '0.5rem' }}>
        {t.ui.back}
      </button>
    </div>
  );

  return (
    <div className="container">
      <div className="lang-switch-container">
        <button 
          className={`lang-btn ${lang === 'zh' ? 'active' : ''}`} 
          onClick={() => setLang('zh')}
        >
          中文
        </button>
        <button 
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>

      {!result && !method && renderMethodSelector()}
      {!result && method === 'date' && renderDateInput()}
      {!result && method === 'number' && renderNumberInput()}
      {!result && method === 'text' && renderTextInput()}
      {!result && method === 'event' && renderEventInput()}
      {result && (
        <div className="card">
           {renderResult()}
        </div>
      )}
    </div>
  );
}
