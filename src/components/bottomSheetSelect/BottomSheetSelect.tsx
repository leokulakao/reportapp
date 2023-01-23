import React, { useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';

import BottomSheetModalComp from '../BottomSheetModalComp';
import Theme from '../../theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type Props = {
  children?: JSX.Element | JSX.Element[];
  ref: any;
};

const BottomSheetSelect: React.FC<Props> = forwardRef((props, ref) => {
  const theme = useTheme<Theme>();
  const { children } = props;

  // BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['35%'], []);

  //   const handlePresentModalPress = useCallback(() => {
  //     bottomSheetModalRef.current?.present();
  //   }, []);

  const open = () => {
    bottomSheetModalRef.current?.present();
  };

  const close = () => {
    bottomSheetModalRef.current?.close();
  };

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
  }));

  return (
    <>
      <BottomSheetModalComp
        innerRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        containerStyle={styles(theme).sheetContainer}
      >
        {children}
      </BottomSheetModalComp>
    </>
  );
});

const styles = (theme: Theme) =>
  StyleSheet.create({
    sheetContainer: {
      // justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 45,
      paddingTop: 20,
      // backgroundColor: theme.colors.backgroundColor,
    },
  });

export default BottomSheetSelect;
