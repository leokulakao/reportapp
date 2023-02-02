import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import Theme from '../../theme';

type Props = {
  year: number;
  onPress: () => void;
};

const SelectYearButton: React.FC<Props> = (props) => {
  const { year, onPress } = props;
  const theme = useTheme<Theme>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [t, i18n] = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles(theme).button}
      activeOpacity={0.7}
    >
      <Text style={styles(theme).text}>
        {t('Year')} {year}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectYearButton;

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      marginTop: 30,
      marginBottom: 10,
      marginLeft: 35,
      padding: 5,
    },
    text: {
      fontSize: 16,
      color: theme.colors.textColor,
    },
  });
