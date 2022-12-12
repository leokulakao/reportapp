import light, { Theme } from './light';
import dark from './dark';

export type ThemeNames = 'light' | 'dark';

export interface ThemesMeta {
  light: ThemeMeta;
  dark: ThemeMeta;
}
export interface ThemeMeta {
  id: ThemeNames;
  name: string;
  theme: Theme;
}

export const themes: ThemesMeta = {
  light: {
    id: 'light',
    name: 'Default Light',
    theme: light,
  },
  dark: {
    id: 'dark',
    name: 'Default Dark',
    theme: dark,
  },
};

export default Theme;
