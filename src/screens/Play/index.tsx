import {dispatch, useSelector} from '@common';
import {Header} from '@components';
import {onSetupGame} from '@reducer';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Circle, CurrentWord, Footer, Table} from './component';
export const PlayScreen = ({}) => {
  const {worldPointer, circlePointer} = useSelector(x => x.play);
  const {categories, cat_id} = useSelector(x => x.game);

  const category = categories.find(item => item.id === cat_id)!;
  const {win_levels, total_levels} = category;
  const onStartGame = useCallback(() => {
    dispatch(onSetupGame(category));
  }, [category]);

  useEffect(() => {
    onStartGame();
  }, [onStartGame]);

  const debug = false;
  return (
    <View style={styles.container}>
      <Header title={`${win_levels + 1} / ${total_levels}`} />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Table />
      </View>
      <CurrentWord />
      <Circle />
      <View style={{height: sizes._12sdp}} />
      <Footer />
      <View style={{height: sizes._20sdp}} />
      {debug && worldPointer && (
        <>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: sizes._10sdp,
              height: sizes._10sdp,
              backgroundColor: COLORS.Pigment,
              position: 'absolute',
              top: worldPointer?.y ?? 0,
              left: worldPointer?.x ?? 0,
            }}
          />
        </>
      )}
      {debug && circlePointer && worldPointer && (
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: sizes._10sdp,
            fontWeight: '700',
            position: 'absolute',
            top: worldPointer?.y ?? 0 - 20,
            left: worldPointer?.x ?? 0,
          }}>
          {`${Math.floor(circlePointer.x)}-${Math.floor(circlePointer.y)}`}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.AzureishWhite,
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
