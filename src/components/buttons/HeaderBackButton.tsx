import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
  navigation?: NavigationProp<any, any>;
  onPress?: void;
};

const HeaderBackButton: React.FC<Props> = (props) => {
  const { navigation, onPress } = props;

  const goBack = () => {
    const canGoBack = navigation?.canGoBack();
    return canGoBack ? navigation?.goBack() : navigation?.popToTop();
  };
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => goBack()}
      style={{ marginLeft: 0 }}
    >
      <Icon name="arrow-back-outline" size={40} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
