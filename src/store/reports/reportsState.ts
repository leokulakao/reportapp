import { Report, ReportsData } from '../../models';

export interface ReportsState {
  reports: ReportStorage[];
  data: ReportsData;
}

export interface ReportStorage extends Report {
  id: string;
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
