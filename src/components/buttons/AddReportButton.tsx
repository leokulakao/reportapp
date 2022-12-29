import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onPress: () => void;
};

const AddReportButton: React.FC<Props> = (props) => {
  const { onPress } = props;
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { bottom: insets.bottom + (Platform.OS === 'android' ? 100 : 70) },
      ]}
      activeOpacity={0.7}
    >
      <Icon name="add" size={42} />
    </TouchableOpacity>
  );
};

export default AddReportButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 40,
    width: 64,
    height: 64,
    paddingLeft: 3,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // TODO: set theme
    // backgroundColor: THEME.ACCENT_COLOR,
  },
});
