import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
  year: number;
  onPress: () => void;
};

const SelectYearButton: React.FC<Props> = (props) => {
  const { year, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>
        {'Year'} {year}
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
