import {images} from '@assets';
import {dispatch, useSelector} from '@common';
import {IconButton} from '@components';
import {EnumDifficulty, EnumGameStatus} from '@models';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  onSelectDifficulty,
  onStartGame,
  onUseHint,
  onUseShowWord,
} from '@reducer';
import {sizes} from '@utils';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

export const Footer = () => {
  const {status, difficulty} = useSelector(x => x.play);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.PLAY>
    >();
  const replayGame = useCallback(() => {
    dispatch(onStartGame());
  }, []);

  const useHint = useCallback(() => {
    dispatch(onUseHint());
  }, []);

  const showWord = useCallback(() => {
    dispatch(onUseShowWord());
  }, []);

  const upDifficulty = useCallback(() => {
    if (difficulty === undefined) {
      return;
    }
    if (difficulty < 3) {
      dispatch(onSelectDifficulty(difficulty + 1));
    }
    setTimeout(() => {
      dispatch(onStartGame());
    }, 500);
  }, [difficulty]);

  const downDifficulty = useCallback(() => {
    if (difficulty === undefined) {
      return;
    }
    if (difficulty > 0) {
      dispatch(onSelectDifficulty(difficulty - 1));
    }
    setTimeout(() => {
      dispatch(onStartGame());
    }, 500);
  }, [difficulty]);

  const backHome = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const SPACING = sizes._8sdp;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <IconButton img={images.icons.back} onPress={backHome} />
        <View style={{width: SPACING}} />
        <IconButton img={images.icons.refresh} onPress={replayGame} />

        {status === EnumGameStatus.COMPLETE ? (
          <>
            <View style={{width: SPACING}} />
            {difficulty !== undefined && difficulty < EnumDifficulty.EXTREME ? (
              <IconButton img={images.icons.up} onPress={upDifficulty} />
            ) : (
              <View style={{width: sizes._50sdp}} />
            )}
          </>
        ) : undefined}
        {status === EnumGameStatus.COMPLETE ? (
          <>
            <View style={{width: SPACING}} />
            {difficulty !== undefined && difficulty > EnumDifficulty.EASY ? (
              <IconButton img={images.icons.down} onPress={downDifficulty} />
            ) : (
              <View style={{width: sizes._50sdp}} />
            )}
          </>
        ) : undefined}
      </View>
      <View style={{flex: 1}} />
      <View style={[styles.row]}>
        {status === EnumGameStatus.PLAY && (
          <IconButton img={images.icons.mag_glass} onPress={showWord} />
        )}
        <View style={{width: SPACING}} />
        {status === EnumGameStatus.PLAY && (
          <IconButton img={images.icons.bulb} onPress={useHint} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: sizes._16sdp,
  },
  row: {
    flexDirection: 'row',
  },
});
