import { AppStateStatus, ColorSchemeName } from 'react-native';
import { ThemeNames } from '../../theme';

export interface AppState {
  appState: AppStateStatus;
  appAppearance: ColorSchemeName;
  theme: ThemeNames;
}
