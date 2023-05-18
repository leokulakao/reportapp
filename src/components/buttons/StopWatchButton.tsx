import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Theme from '../../theme';
import { useTheme } from '@shopify/restyle';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Easing,
  withTiming,
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';

type Props = {
  onPress: () => void;
  outsideBlockWidth: number;
};

export type StopWatchButtonType = 'on' | 'off';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export type StopWatchButtonRef = {
  mode: StopWatchButtonType;
  on: () => void;
  off: () => void;
};

const StopWatchButton = forwardRef<StopWatchButtonRef, Props>((props, ref) => {
  const { onPress, outsideBlockWidth } = props;

  const [buttonMode, setButtonMode] = useState<StopWatchButtonType>('off');

  const transitionRef = React.useRef<TransitioningView | null>(null);
  const theme = useTheme<Theme>();

  const buttonWidth = useSharedValue(
    buttonMode === 'off' ? 54 : outsideBlockWidth / 2 - 5
  );
  const buttonRoudios = useSharedValue(buttonMode === 'off' ? 50 : 8);
  const buttonColor = useSharedValue(
    buttonMode === 'off' ? theme.colors.greenColor : theme.colors.redColor
  );

  const animation = useAnimatedStyle(() => {
    return {
      width: withSpring(buttonWidth.value),
      borderRadius: withSpring(buttonRoudios.value),
      backgroundColor: withTiming(buttonColor.value, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });

  const _animateButtonOn = () => {
    console.log('StopWatchButton -  on');
    buttonWidth.value = outsideBlockWidth / 2 - 5;
    buttonRoudios.value = 8;
    buttonColor.value = theme.colors.redColor;
    setButtonMode('on');
  };

  const _animateButtonOff = () => {
    buttonWidth.value = 54;
    buttonRoudios.value = 50;
    buttonColor.value = theme.colors.greenColor;
    setButtonMode('off');
  };

  useImperativeHandle(ref, () => ({
    mode: buttonMode,
    on: _animateButtonOn,
    off: _animateButtonOff,
  }));

  return (
    <AnimatedTouchable
      onPress={() => {
        onPress();
      }}
      style={[styles(theme).button, animation]}
    >
      <Transitioning.View
        ref={transitionRef}
        transition={
          <Transition.Together>
            <Transition.Out type="scale" durationMs={100} />
            <Transition.Change interpolation="easeInOut" />
            <Transition.In type="scale" durationMs={100} delayMs={50} />
          </Transition.Together>
        }
      >
        {buttonMode === 'off' ? (
          <Icon name="stopwatch-outline" size={32} color={'#fff'} />
        ) : (
          <Icon name="stop-circle-outline" size={32} color={'#fff'} />
        )}
      </Transitioning.View>
    </AnimatedTouchable>
  );
});

export default StopWatchButton;

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      width: '100%',
      height: 54,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.greenColor,
      marginRight: 5,
    },
  });
