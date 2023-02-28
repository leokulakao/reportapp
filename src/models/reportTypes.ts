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
  reportRounded: boolean;
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

// views

export interface ReportsByMonthView {
  year: number;
  month: number;
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
