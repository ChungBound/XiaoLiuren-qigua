
declare module 'lunar-javascript' {
    export class Lunar {
        static fromDate(date: Date): Lunar;
        getMonth(): number;
        getDay(): number;
        getTimeZhi(): string;
        toString(): string;
    }
    export class Solar {
        static fromDate(date: Date): Solar;
    }
}
