import {dispatch, useSelector} from '@common';
import {CIRCLE_SIZES} from '@config';
import {onSetOriginPoint} from '@reducer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CircleChar} from './CircleChar';
import {GestureDetector} from './GestureDetector';
import {WordEffect} from './WordEffect';
export const Circle = () => {
  const {chars} = useSelector(x => x.play);
  const circle_size = CIRCLE_SIZES[chars.length];
  return (
    <View
      style={[
        styles.container,
        {
          width: circle_size,
          height: circle_size,
          borderRadius: circle_size,
        },
      ]}
      onLayout={event => {
        event.target.measure((x, y) => {
          dispatch(
            onSetOriginPoint({
              x: x,
              y: y,
            }),
          );
        });
      }}>
      <WordEffect />
      {chars.map((item, index) => (
        <CircleChar data={item} key={index + ''} />
      ))}
      <GestureDetector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
  },
});
