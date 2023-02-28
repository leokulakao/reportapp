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

// slice interface

export interface ReportDeleteByIdInput {
  year: number;
  month: number;
  report: ReportSaved;
}
