import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
  year: number;
  onPress: () => void;
};

const SelectYearButton: React.FC<Props> = (props) => {
  const { year, onPress } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [t, i18n] = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>
        {t('Year')} {year}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectYearButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 35,
    padding: 5,
  },
  text: {
    fontSize: 16,
  },
});
