import {dispatch, useSelector} from '@common';
import {MyStatusBar} from '@components';
import {onStartGame} from '@reducer';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Footer, Table, Words} from './component';
export const PlayScreen = ({}) => {
  const {word} = useSelector(x => x.play);
  useEffect(() => {
    dispatch(onStartGame());
  }, []);

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={COLORS.LightSkyBlue} />
      <View style={styles.wordView}>
        <Text style={styles.wordValue}>{word}</Text>
      </View>
      <Words style={styles.words} />
      <View style={styles.table}>
        <Table />
      </View>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LightSkyBlue,
    flexDirection: 'column',
  },
  wordView: {
    paddingHorizontal: sizes._24sdp,
    paddingVertical: sizes._6sdp,
    borderRadius: sizes._30sdp,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
    minWidth: sizes._100sdp,
    height: sizes._40sdp,
    marginTop: sizes._10sdp,
  },
  wordValue: {
    fontSize: sizes._26sdp,
    fontWeight: '700',
    color: COLORS.white,
    lineHeight: sizes._30sdp,
    textTransform: 'uppercase',
  },
  header: {},
  words: {
    marginTop: sizes._10sdp,
  },
  table: {
    marginVertical: sizes._30sdp,
  },
  word: {
    fontSize: sizes._30sdp,
    fontWeight: '600',
    color: COLORS.white,
  },
});
