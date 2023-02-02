import * as Localization from 'expo-localization';

export const dateToLocale = (date: Date): string => {
  return new Date(date).toLocaleDateString(Localization.locale);
};
