export interface CalendarDay {
  id: number;
  day: number | string;
  date: Date | null;
  effectDate: boolean;
  currentDate: boolean;
}

export interface CalendarDate {
  id: string;
  year: number;
  month: number;
  monthDate: Date;
  days: Array<CalendarDay>;
}
