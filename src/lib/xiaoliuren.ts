
import { Lunar, Solar } from 'lunar-javascript';

export enum Palace {
  DaAn = 1,
  LiuLian = 2,
  SuXi = 3,
  ChiKou = 4,
  XiaoJi = 5,
  KongWang = 6,
}

export enum DivinationMethodType {
  Date = 'date',
  Number = 'number',
  Text = 'text', // "Willow Leaf" etc.
  Event = 'event',
  Gender = 'gender',
}

export interface DivinationResult {
  monthPalace: Palace;
  dayPalace: Palace;
  hourPalace: Palace; // The final result
  monthName: string;
  dayName: string;
  hourName: string;
  lunarDateStr: string;
  // For animation path reconstruction
  path: number[]; // Sequence of palace IDs visited
}

export const PALACES = [
  { id: Palace.DaAn, name: 'Da An', cnName: '大安', element: 'Wood', direction: 'East' },
  { id: Palace.LiuLian, name: 'Liu Lian', cnName: '留连', element: 'Water', direction: 'North' },
  { id: Palace.SuXi, name: 'Su Xi', cnName: '速喜', element: 'Fire', direction: 'South' },
  { id: Palace.ChiKou, name: 'Chi Kou', cnName: '赤口', element: 'Metal', direction: 'West' },
  { id: Palace.XiaoJi, name: 'Xiao Ji', cnName: '小吉', element: 'Wood', direction: 'North' }, // Often Water/Wood
  { id: Palace.KongWang, name: 'Kong Wang', cnName: '空亡', element: 'Earth', direction: 'Center' },
];

export function getPalace(index: number): typeof PALACES[0] {
  // 1-based index to 0-based array
  const adjustedIndex = (index - 1) % 6;
  return PALACES[adjustedIndex];
}

/**
 * Calculate Xiao Liu Ren based on Date
 */
export function calculateByDate(date: Date): DivinationResult {
  const lunar = Lunar.fromDate(date);

  // Month: 1-12. If leap, Math.abs? lunar-javascript usually handles this.
  // We need the month number.
  const month = Math.abs(lunar.getMonth());

  // Day: 1-30
  const day = Math.abs(lunar.getDay());

  // Hour: 0-23 -> Zhi Index (1-12).
  // Zi (23-1) = 1, Chou (1-3) = 2, ...
  // (hour + 1) / 2 floor + 1
  const hour = date.getHours();
  // 23:00-00:59 -> Zi (1)
  // 01:00-02:59 -> Chou (2)
  let timeZhiIndex = Math.floor((hour + 1) / 2) + 1;
  if (timeZhiIndex > 12) timeZhiIndex = 1;

  // Algorithm:
  // Month Start: DaAn (1). 
  // Month Palace = (Month - 1) % 6 + 1
  // But wait, the standard algorithm counts:
  // 1 (DaAn), 2 (LiuLian)...
  // So if Month is 1, it lands on 1.
  // If Month is 2, it lands on 2.
  // So Month Palace Index = (Month - 1) % 6 + 1.

  let monthIndex = (month - 1) % 6 + 1;

  // Day Start: Month Palace.
  // If Month landed on 2 (LiuLian), Day 1 is 2.
  // Day 2 is 3.
  // Day Palace Index = (MonthIndex + (Day - 1) - 1) % 6 + 1 ?
  // Let's trace: Month=1 (DaAn). Day=1. Start at DaAn. Count 1. Result DaAn.
  // Formula: (Start - 1 + Count - 1) % 6 + 1
  // Wait.
  // Start at DaAn (1). Count 1 (Day 1) -> DaAn (1).
  // Start at DaAn (1). Count 2 (Day 2) -> LiuLian (2).
  // So: (Start + Count - 2) % 6 + 1

  let dayIndex = (monthIndex + day - 2) % 6 + 1;
  // Handle negative modulo if any (shouldn't be here but good practice)
  if (dayIndex <= 0) dayIndex += 6;

  // Hour Start: Day Palace.
  // Hour 1 (Zi) -> DayIndex.
  // Hour 2 (Chou) -> DayIndex + 1.
  let hourIndex = (dayIndex + timeZhiIndex - 2) % 6 + 1;
  if (hourIndex <= 0) hourIndex += 6;

  // Reconstruct path for animation
  // Month Path: 1 -> MonthIndex
  // Day Path: MonthIndex -> DayIndex
  // Hour Path: DayIndex -> HourIndex
  // We will store key waypoints for simplicity in this version, 
  // or full steps if we want detailed animation.
  // Let's store the 3 key stops.
  const path = [monthIndex, dayIndex, hourIndex];

  return {
    monthPalace: monthIndex as Palace,
    dayPalace: dayIndex as Palace,
    hourPalace: hourIndex as Palace,
    monthName: getPalace(monthIndex).cnName,
    dayName: getPalace(dayIndex).cnName,
    hourName: getPalace(hourIndex).cnName,
    lunarDateStr: lunar.toString(),
    path,
  };
}

/**
 * Calculate based on 3 random numbers
 */
export function calculateByNumbers(a: number, b: number, c: number): DivinationResult {
  // A -> Month equivalent
  const monthIndex = (a - 1) % 6 + 1;

  // B -> Day equivalent (Start from Month)
  const dayIndex = (monthIndex + b - 2) % 6 + 1;

  // C -> Hour equivalent (Start from Day)
  const hourIndex = (dayIndex + c - 2) % 6 + 1;

  return {
    monthPalace: monthIndex as Palace,
    dayPalace: dayIndex as Palace,
    hourPalace: hourIndex as Palace,
    monthName: getPalace(monthIndex).cnName,
    dayName: getPalace(dayIndex).cnName,
    hourName: getPalace(hourIndex).cnName,
    lunarDateStr: `Numbers: ${a}, ${b}, ${c}`,
    path: [monthIndex, dayIndex, hourIndex],
  };
}

/**
 * Calculate based on Text (e.g. "Willow Leaf")
 * Uses string length or hash to generate numbers.
 */
export function calculateByText(text: string): DivinationResult {
  // Simple algorithm: 
  // 1. Length of text
  // 2. Sum of char codes
  // 3. First char code
  const len = text.length || 1;
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i);
  }
  const first = text.charCodeAt(0) || 1;

  return calculateByNumbers(len, sum, first);
}

/**
 * Calculate based on Event Type
 * Start palace depends on event.
 * Then we need 2 more numbers. Usually we use current time for the rest.
 */
export function calculateByEvent(eventType: 'marriage' | 'wealth' | 'health' | 'legal' | 'travel', date: Date): DivinationResult {
  let startPalace = 1;
  switch (eventType) {
    case 'marriage': startPalace = 1; break; // Da An
    case 'wealth': startPalace = 2; break; // Liu Lian
    case 'health': startPalace = 3; break; // Su Xi
    case 'legal': startPalace = 4; break; // Chi Kou
    case 'travel': startPalace = 5; break; // Xiao Ji
  }

  // We treat 'startPalace' as the "Month" result directly.
  // Then we use Day and Hour from date to continue.

  const lunar = Lunar.fromDate(date);
  const day = Math.abs(lunar.getDay());
  const hour = date.getHours();
  let timeZhiIndex = Math.floor((hour + 1) / 2) + 1;
  if (timeZhiIndex > 12) timeZhiIndex = 1;

  // Day Start: StartPalace
  let dayIndex = (startPalace + day - 2) % 6 + 1;
  if (dayIndex <= 0) dayIndex += 6;

  // Hour Start: DayIndex
  let hourIndex = (dayIndex + timeZhiIndex - 2) % 6 + 1;
  if (hourIndex <= 0) hourIndex += 6;

  return {
    monthPalace: startPalace as Palace,
    dayPalace: dayIndex as Palace,
    hourPalace: hourIndex as Palace,
    monthName: getPalace(startPalace).cnName,
    dayName: getPalace(dayIndex).cnName,
    hourName: getPalace(hourIndex).cnName,
    lunarDateStr: `Event: ${eventType}, ${lunar.toString()}`,
    path: [startPalace, dayIndex, hourIndex],
  };
}
