import {useSelector} from '@common';
import {CHAR_SIZES} from '@config';
import {CircleCharEntity} from '@models';
import {COLORS} from '@themes';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {
  data: CircleCharEntity;
}
export const CircleChar: FC<Props> = ({data}) => {
  const {indexes, chars} = useSelector(x => x.play);
  const {pos, char, index} = data;
  const selected = indexes.includes(index);
  const char_size = CHAR_SIZES[chars.length];
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          top: pos.y - char_size / 2,
          left: pos.x - char_size / 2,
          width: char_size,
          height: char_size,
          backgroundColor: selected ? COLORS.BlueViolet : undefined,
          //COLORS.AzureishWhite,
          borderRadius: !selected ? 0 : char_size,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            fontSize: char_size * 0.65,
            color: selected ? COLORS.white : COLORS.DarkCharcoal,
          },
        ]}>
        {char.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: COLORS.BlueJeans,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
  },
});
