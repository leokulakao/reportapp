import { AppState } from './app/appState';
import { ReportsState } from './reports/reportsState';

export interface RootState {
  app: AppState;
  reports: ReportsState;
}
