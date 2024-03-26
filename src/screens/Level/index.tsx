import {Header} from '@components';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Categories} from './component';

export const LevelScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Word Circle" backDisabled />
      <Categories />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
  },
  footer: {
    marginBottom: sizes._30sdp,
  },
  btnView: {
    height: sizes._50sdp,
    marginHorizontal: sizes._20sdp,
    borderRadius: sizes._10sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    fontWeight: '700',
    fontSize: sizes._20sdp,
    textTransform: 'uppercase',
  },
});
