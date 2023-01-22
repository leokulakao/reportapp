import { Report } from '../../models';

export interface ReportsState {
  reports: ReportStorage[];
}

export interface ReportStorage extends Report {
  id: string;
}

export interface ReportsByMonth {
  year: number;
  month: number;
  reportsByDays: ReportsByDays[];
}

export interface ReportsByDays {
  year: number;
  month: number;
  day: number;
  start: string;
  end: string;
  reports: ReportStorage[];
}

export interface ReportStatsYear {
  year: number;
  statsMonths: ReportStatsMonth[];
}

export interface Backup {
  version: string;
  reports: ReportStorage[];
}

export interface ReportStatsMonth {
  year: number;
  month: number;
  hours: number;
  publications: number;
  videos: number;
  returnVisits: number;
  biblieStudies: number;
  specialHours: number;
}
