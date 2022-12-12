import { createTheme } from '@shopify/restyle';
// import { StatusBarStyle } from 'expo-status-bar';

// Palette
const palette = {
  white: '#FFFFFF',
  black: '#1F1F1F',
  gray: '#EBEEF2',
  grayFont: '#AAAEB2',
};

const theme = createTheme({
  colors: {
    statusBar: 'light',

    tabBarBackground: palette.white,
    tabBarBackgroundFocus: palette.black,
    tabBarIcon: palette.white,
    tabBarIconFocus: palette.black,

    homeBackground: palette.gray,

    reportSliderBackground: palette.white,
    reportSliderBr: palette.gray,
    reportSliderHeader: palette.black,
    reportSliderText: palette.black,
  },
  spacing: {},
  breakpoints: {},
});

export default theme;

export type Theme = typeof theme;
