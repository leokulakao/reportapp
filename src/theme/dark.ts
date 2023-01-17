import { createTheme } from '@shopify/restyle';

// Palette
const palette = {
  white: '#FFFFFF',
  darkGray: '#1F1F1F',
  black: '#000000',
  gray: '#EBEEF2',
  grayBlock: '#47484a',
  grayFont: '#AAAEB2',
  green: '#68BF79',
};

const theme = createTheme({
  colors: {
    statusBar: 'light',

    backgroundColor: palette.black,
    secondaryBackgroundColor: palette.darkGray,
    blockBackgroudColor: palette.grayBlock,

    textColor: palette.white,
    secondaryTextColor: palette.white,

    accentColor: palette.white,
    greenColor: palette.green,
  },
  spacing: {},
  breakpoints: {},
});

export default theme;

export type Theme = typeof theme;
