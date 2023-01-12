import { AppStateStatus } from 'react-native';
import { ThemeNames } from '../../theme';

export interface AppState {
  appState: AppStateStatus;
  theme: ThemeNames;
}
