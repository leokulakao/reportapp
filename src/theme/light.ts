import { createTheme } from '@shopify/restyle';
// import { StatusBarStyle } from 'expo-status-bar';

// Palette
const palette = {
  white: '#FFFFFF',
  darkGray: '#1F1F1F',
  black: '#000000',
  gray: '#EBEEF2',
  grayFont: '#AAAEB2',
  green: '#68BF79',
};

const theme = createTheme({
  colors: {
    statusBar: 'light',

    backgroundColor: palette.white,
    secondaryBackgroundColor: palette.gray,

    textColor: palette.black,
    secondaryTextColor: palette.grayFont,

    accentColor: palette.darkGray,
    greenColor: palette.green,
  },
  spacing: {},
  breakpoints: {},
});

export default theme;

export type Theme = typeof theme;
