import {useSelector} from '@common';
import {WordEntity} from '@models';
import {getLinePxOfWord} from '@reducer';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Svg} from 'react-native-svg';
import {Line} from './Line';
import {COLORS} from '@themes';

export const WordEffect = () => {
  const {p1, p2, words, word_color, table_config} = useSelector(x => x.play);

  const solvedWords = words?.filter(item => item?.solved) ?? [];
  return (
    <Svg style={styles.container}>
      {p1 !== undefined && p2 !== undefined && (
        <Line p1={p1} p2={p2} color={word_color ?? COLORS.Lime} />
      )}
      {solvedWords.map((word: WordEntity, index: number) => {
        const [a, b] = table_config ? getLinePxOfWord(word, table_config) : [];
        return (
          a &&
          b && (
            <Line
              key={index + ''}
              p1={a}
              p2={b}
              color={word.color ?? COLORS.Lime}
            />
          )
        );
      })}
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
