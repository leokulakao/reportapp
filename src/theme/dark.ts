import { createTheme } from '@shopify/restyle';

// Palette
const palette = {
  white: '#FFFFFF',
  black: '#000000',

  darkGray: '#1F1F1F',
  gray: '#292929',
  lightGray: '#EBEEF2',

  grayFont: '#AAAEB2',

  green: '#68BF79',
  pink: '#C94F82',
};

const theme = createTheme({
  colors: {
    theme: 'dark',
    statusBar: 'light',

    // BACKGROUND
    backgroundColor: palette.darkGray,
    secondaryBackgroundColor: palette.black,

    // TEXT
    textColor: palette.white,
    secondaryTextColor: palette.lightGray,

    // ICONS
    iconColor: palette.white,
    secondaryIconColor: palette.lightGray,
    contrastIconColor: palette.white,

    // NAVIGATION
    tabBarColor: palette.gray,
    tabBarActiveItemColor: palette.black,

    // CARD ITEM
    cardItemColor: palette.gray,

    // OTHER
    accentColor: palette.gray,
    greenColor: palette.green,
    pinkColor: palette.pink,
  },
  spacing: {},
  breakpoints: {},
});

export default theme;

export type Theme = typeof theme;
