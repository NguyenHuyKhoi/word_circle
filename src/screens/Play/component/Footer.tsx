import {images} from '@assets';
import {dispatch, useSelector} from '@common';
import {IconButton} from '@components';
import {EnumGameStatus} from '@models';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {onUseHint, onUseShowWord, onWinLevel} from '@reducer';
import {sizes} from '@utils';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

export const Footer = () => {
  const {status} = useSelector(x => x.play);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.PLAY>
    >();
  const nextLevel = useCallback(() => {
    dispatch(onWinLevel());
  }, []);

  var timer: NodeJS.Timeout;
  const autoNextLevel = () => {
    timer = setInterval(() => {
      dispatch(onWinLevel());
    }, 100);
  };

  const stopAuto = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const useHint = useCallback(() => {
    dispatch(onUseHint());
  }, []);

  const showWord = useCallback(() => {
    dispatch(onUseShowWord());
  }, []);

  const backHome = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const SPACING = sizes._8sdp;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <IconButton img={images.icons.back} onPress={backHome} />
        <View style={{width: SPACING}} />
        {status === EnumGameStatus.COMPLETE && (
          <IconButton img={images.icons.level_up} onPress={nextLevel} />
        )}
        {false && (
          <>
            <IconButton img={images.icons.level_up} onPress={autoNextLevel} />
            <IconButton img={images.icons.refresh} onPress={stopAuto} />
          </>
        )}
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
