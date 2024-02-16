import {useSelector} from '@common';
import {WordEntity} from '@models';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {
  style?: any;
}
export const Words: FC<Props> = ({style}) => {
  const {words} = useSelector(x => x.play);
  return (
    <View style={[styles.container, style]}>
      {words?.map((word: WordEntity, index: number) => (
        <View
          key={index + ''}
          style={[
            styles.itemView,
            {
              backgroundColor: word.solved ? undefined : COLORS.white + '22',
            },
          ]}>
          <Text
            style={[
              styles.itemLabel,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                color: word.solved ? COLORS.DarkCharcoal : COLORS.white,
                textDecorationLine: word.solved ? 'line-through' : 'none',
              },
            ]}>
            {word.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: sizes._10sdp,
    alignSelf: 'center',
  },
  itemView: {
    paddingHorizontal: sizes._8sdp,
    paddingVertical: sizes._4sdp,
    borderRadius: sizes._20sdp,
    marginHorizontal: sizes._4sdp,
    marginVertical: sizes._3sdp,
  },
  itemLabel: {
    fontSize: sizes._16sdp,
    fontWeight: '600',
  },
});
