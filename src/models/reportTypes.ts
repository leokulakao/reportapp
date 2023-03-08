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

// data

export interface ReportsDataMonths {
  year: number;
  month: number;
  reports: ReportSaved[];
  minutesPassed?: number;
  reportRounded: ReportRounded;
}

export enum ReportRounded {
  NONE = 'NONE',
  PASSED = 'PASSED',
}

export interface ReportsDataYear {
  year: number;
  months: Record<number, ReportsDataMonths>;
}

export interface ReportsData {
  years: Record<number, ReportsDataYear>;
}

// inputs

export interface ReportDeleteByIdInput {
  year: number;
  month: number;
  report: ReportSaved;
}

export interface ReportEditByIdInput extends ReportDeleteByIdInput {}

export interface ReportCalculateMinutesPassedInput {
  year: number;
  month: number;
}

export interface ReportPassRemainingHoursInput
  extends ReportCalculateMinutesPassedInput {
  minutesPassed: number;
  reportRounded: ReportRounded;
}

// views

export interface ReportsByMonthView {
  year: number;
  month: number;
  minutesPassed: number;
  reportRounded: ReportRounded;
  reportsByDays: ReportsByDaysView[];
}

export interface ReportsByDaysView {
  year: number;
  month: number;
  day: number;
  start: string;
  end: string;
  reports: ReportSaved[];
}

export interface ReportStatsYearView {
  year: number;
  statsMonths: ReportStatsMonthView[];
}

export interface ReportStatsMonthView {
  year: number;
  month: number;
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

export interface MinutesPassedAlert {
  minutesPassed: number;
  reportRounded: ReportRounded;
}
