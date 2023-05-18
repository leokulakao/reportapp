import { Report } from '../../models';

export interface StopwatchState {
  isStarted: boolean;
  startDate?: string;
  endDate?: string;
  cacheReport: Report;
}
