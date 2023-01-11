import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation?: NavigationProp<any, any>;
  onPress?: void;
};

export const HeaderBackButton: React.FC<Props> = ({ navigation, onPress }) => {
  const goBack = () => {
    const canGoBack = navigation?.canGoBack();
    return canGoBack ? navigation?.goBack() : navigation?.popToTop();
  };
  // console.log('onPress', !!onPress);

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => goBack()}
      style={{ marginLeft: 0 }}
    >
      <Icon name="arrow-back-outline" size={40} />
    </TouchableOpacity>
  );
};
