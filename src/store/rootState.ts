import { AppState } from './app/appState';
import { ReportsState } from './reports/reportsState';
import { StopwatchState } from './stopwatch/stopwatchState';

export interface RootState {
  app: AppState;
  reports: ReportsState;
  stopwatch: StopwatchState;
}
