import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../theme';

type Props = {
  icon?: string;
  onPress: () => void;
  text?: string;
  style?: object;
};

const MainButton: React.FC<Props> = (props) => {
  const { icon, onPress, text, style } = props;

  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
        { backgroundColor: theme.colors.secondaryBackgroundColor },
      ]}
      activeOpacity={0.7}
    >
      {!!icon && <Icon name={icon} size={38} />}
      {!!text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
  },
});
