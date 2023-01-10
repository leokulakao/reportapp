import { Report } from '../../models';

export interface ReportsState {
  reports: ReportStorage[];
}

export interface ReportStorage extends Report {
  id: string;
}
