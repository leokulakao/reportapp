export interface Report {
  title: string;
  date: string;
  hours: number;
  minutes: number;
  publications: number;
  videos: number;
  returnVisits: number;
  bibleStudies: number;
  specialHours: number;
  specialMinutes: number;
}

export interface ReportSaved extends Report {
  id: string;
}

// core

interface MinutesPassed {
  minutesPassed: number;
  spetialMinutesPassed: number;
  reportRounded: ReportRoundedState;
}

interface Year {
  year: number;
}

interface Month {
  month: number;
}

interface YearsData {
  years: Record<number, ReportsDataYear>;
}

interface MonthsData {
  months: Record<number, ReportsDataMonths>;
}

export enum ReportRoundedState {
  NONE = 'NONE',
  PASSED = 'PASSED',
  ROUNDED_UP = 'ROUNDED_UP',
  ROUNDED_DOWN = 'ROUNDED_DOWN',
}

// data

export interface ReportsDataMonths extends MinutesPassed, Year, Month {
  reports: ReportSaved[];
}

export interface ReportsDataYear extends Year, MonthsData {}

export interface ReportsData extends YearsData {}

// inputs

interface ReportInput extends Year, Month {
  report: ReportSaved;
}

export interface ReportDeleteByIdInput extends ReportInput {}

export interface ReportEditByIdInput extends ReportInput {}

export interface ReportCalculateMinutesPassedInput extends Year, Month {}

export interface ReportUpdateStateReportRoundedState extends Year, Month {
  reportRoundedState: ReportRoundedState;
}

export interface ReportRoundMinutes extends Year, Month, MinutesPassed {
  reportRoundedState:
    | ReportRoundedState.ROUNDED_UP
    | ReportRoundedState.ROUNDED_DOWN;
  title: string;
}

export interface ReportPassRemainingHoursInput
  extends Year,
    Month,
    MinutesPassed {
  titleNext: string;
  titlePrev: string;
}

// views

export interface ReportsByMonthView extends Year, Month, MinutesPassed {
  reportsByDays: ReportsByDaysView[];
}

export interface ReportsByDaysView extends Month, Year {
  day: number;
  start: string;
  end: string;
  reports: ReportSaved[];
}

export interface ReportStatsYearView extends Year {
  statsMonths: ReportStatsMonthView[];
}

export interface ReportStatsMonthView extends Month, Year, MinutesPassed {
  hours: number;
  minutes: number;
  publications: number;
  videos: number;
  returnVisits: number;
  biblieStudies: number;
  specialHours: number;
  specialMinutes: number;
}

// backup

export interface Backup {
  version: string;
  data: ReportsData;
}

// alert

export interface MinutesPassedAlert extends MinutesPassed {}
