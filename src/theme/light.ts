import { createTheme } from '@shopify/restyle';

// Palette
const palette = {
  white: '#FFFFFF',
  darkGray: '#1F1F1F',
  black: '#000000',
  gray: '#EBEEF2',
  grayFont: '#AAAEB2',
  green: '#68BF79',
  pink: '#C94F82',
};

const theme = createTheme({
  colors: {
    statusBar: 'dark',

    backgroundColor: palette.white,
    secondaryBackgroundColor: palette.gray,

    textColor: palette.black,
    secondaryTextColor: palette.grayFont,

    accentColor: palette.darkGray,
    greenColor: palette.green,
    pinkColor: palette.pink,
  },
  spacing: {},
  breakpoints: {},
});

export default theme;

export type Theme = typeof theme;
