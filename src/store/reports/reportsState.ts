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
