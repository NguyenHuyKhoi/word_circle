import {useSelector} from '@common';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Svg} from 'react-native-svg';
import {Line} from './Line';

export const WordEffect = () => {
  const {chars, indexes, circlePointer} = useSelector(x => x.play);

  const lastIndex =
    indexes.length > 0 ? indexes[indexes.length - 1] : undefined;
  return (
    <Svg style={styles.container}>
      {indexes.map((item: number, index: number) => {
        if (index === 0) {
          return undefined;
        }
        const p2 = chars[item].pos;
        const p1 = chars[indexes[index - 1]].pos;
        return <Line key={index + ''} p1={p1} p2={p2} />;
      })}
      {lastIndex !== undefined && circlePointer && (
        <Line p1={chars[lastIndex].pos} p2={circlePointer} />
      )}
    </Svg>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
