import React, { useCallback } from 'react';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Platform } from 'react-native';
import { useTheme } from '@shopify/restyle';

import Theme from '../theme';
import { SharedValue } from 'react-native-reanimated';

type Props = {
  innerRef: any;
  snapPoints: (string | number)[] | SharedValue<(string | number)[]>;
  containerStyle?: any;
  children?: any;
  bottomInset?: number;
  detached?: boolean;
};

const BottomSheetModalComp: React.FC<Props> = (props) => {
  const { innerRef, snapPoints, containerStyle, children } = props;
  const theme = useTheme<Theme>();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        opacity={0.4}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={innerRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme.colors.backgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'grey' }}
      enablePanDownToClose
      enableContentPanningGesture={Platform.OS === 'android' ? false : true}
      backdropComponent={renderBackdrop}
      {...props}
    >
      <BottomSheetScrollView contentContainerStyle={[containerStyle]}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BottomSheetModalComp;
