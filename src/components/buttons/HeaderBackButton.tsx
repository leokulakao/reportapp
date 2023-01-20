import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

// type HeaderBackButtonPropsCustomRight = NativeStackHeaderProps & {
//   onPress?: () => void;
// };

type HeaderBackButtonPropsCustomRight = {
  onPress?: () => void;
};

const HeaderBackButton: React.FC<HeaderBackButtonPropsCustomRight> = (
  props
) => {
  const { onPress } = props;

  // console.log(onPress);

  // const goBack = () => {
  //   // const canGoBack = navigation?.navigation.canGoBack();
  //   console.log(onPress);
  //   return onPress;
  // };
  return (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 0 }}>
      <Icon name="arrow-back-outline" size={40} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
