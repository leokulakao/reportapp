import React, { useCallback } from 'react';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

type Props = {
  innerRef: any;
  snapPoints: any;
  containerStyle?: any;
  children?: any;
};

const BottomSheetModalComp: React.FC<Props> = (props) => {
  const { innerRef, snapPoints, containerStyle, children } = props;

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
      // backgroundStyle={{ backgroundColor: THEME.BACKGROUND_COLOR }}
      handleIndicatorStyle={{ backgroundColor: 'grey' }}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView contentContainerStyle={[containerStyle]}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BottomSheetModalComp;
