import {useSelector} from '@common';
import {getCurrentWord} from '@reducer';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}
export const CurrentWord: FC<Props> = () => {
  const {chars, indexes} = useSelector(x => x.play);
  const currentWord = getCurrentWord(chars, indexes);
  return (
    <View
      style={[
        styles.container,
        {
          height: sizes._40sdp,
          backgroundColor: currentWord ? COLORS.BlueViolet : undefined,
        },
      ]}>
      <Text style={styles.text}>{currentWord ?? ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BlueViolet,
    paddingHorizontal: sizes._10sdp,
    paddingVertical: sizes._4sdp,
    borderRadius: sizes._20sdp,
    marginVertical: sizes._12sdp,
    alignSelf: 'center',
  },
  text: {
    fontSize: sizes._24sdp,
    fontWeight: '700',
    color: COLORS.white,
  },
});
