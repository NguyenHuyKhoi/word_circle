import {CharEntity} from '@models';
import {EMPTY_CHAR} from '@reducer';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {
  data: CharEntity;
  size: number;
}
export const TableCell: FC<Props> = ({data, size}) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: size,
          height: size,
          backgroundColor:
            data.char === EMPTY_CHAR
              ? 'rgba(0,0,0,0)'
              : data.solved
              ? COLORS.BlueViolet
              : 'rgba(255,255,255,0.6)',
        },
      ]}>
      <Text
        style={[
          styles.label,
          {
            color: data.solved ? COLORS.white : COLORS.DarkCharcoal,
            fontSize: size * 0.65,
          },
        ]}>
        {data.solved || data.hinted ? data.char.toUpperCase() : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: sizes._2sdp,
    borderRadius: sizes._6sdp,
  },
  label: {
    fontSize: sizes._20sdp,
    fontWeight: '500',
    color: COLORS.DarkCharcoal,
  },
});
