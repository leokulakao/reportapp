import { createTheme } from '@shopify/restyle';

// Palette
const palette = {
  white: '#FFFFFF',
  black: '#000000',

  darkGray: '#1F1F1F',
  lightGray: '#EBEEF2',

  grayFont: '#AAAEB2',

  green: 'rgb(104,191,121)',
  red: 'rgb(191,104,104)',
  pink: '#C94F82',
};

const theme = createTheme({
  colors: {
    theme: 'light',
    statusBar: 'dark',

    // BACKGROUND
    backgroundColor: palette.white,
    secondaryBackgroundColor: palette.lightGray,

    // TEXT
    textColor: palette.black,
    secondaryTextColor: palette.grayFont,

    // ICONS
    iconColor: palette.black,
    secondaryIconColor: palette.darkGray,
    contrastIconColor: palette.white,

    // NAVIGATION
    tabBarColor: palette.darkGray,
    tabBarActiveItemColor: palette.white,

    // CARD ITEM
    cardItemColor: palette.lightGray,

    // OTHER
    accentColor: palette.darkGray,
    greenColor: palette.green,
    redColor: palette.red,
    pinkColor: palette.pink,
  },
  spacing: {},
  breakpoints: {},
});

export default theme;

export type Theme = typeof theme;
