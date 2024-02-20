import {dispatch} from '@common';
import {onGestureMove, onGestureRelease} from '@reducer';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {PanResponder, StyleSheet, View} from 'react-native';
interface Props {}
export const GestureDetector: FC<Props> = () => {
  const enable = true;
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        // Ask to be the responsder:
        onStartShouldSetPanResponder: () => enable,
        onStartShouldSetPanResponderCapture: () => enable,
        onMoveShouldSetPanResponder: () => enable,
        onMoveShouldSetPanResponderCapture: () => enable,
        onPanResponderGrant: (evt, gestureState) => {
          dispatch(
            onGestureMove({
              x: gestureState.x0,
              y: gestureState.y0,
            }),
          );
        },
        onPanResponderMove: (evt, gestureState) => {
          dispatch(
            onGestureMove({
              x: gestureState.moveX,
              y: gestureState.moveY,
            }),
          );
        },
        onPanResponderTerminationRequest: () => enable,
        onPanResponderRelease: () => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          dispatch(onGestureRelease());
        },
        onPanResponderTerminate: () => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: () => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      }),
    [enable],
  );

  return <View {...panResponder.panHandlers} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    // backgroundColor: 'red',
  },
  point: {
    position: 'absolute',
    width: sizes._20sdp,
    height: sizes._20sdp,
    backgroundColor: 'yellow',
  },
});
