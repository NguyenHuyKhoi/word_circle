import {useSelector} from '@common';
import {Header} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Categories, Difficulties} from './component';

export const LevelScreen = () => {
  const {difficulty, category} = useSelector(x => x.play);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.LEVEL>
    >();
  const handlePlay = useCallback(() => {
    navigation.navigate(APP_SCREEN.PLAY);
  }, [navigation]);

  const enable_play = difficulty !== undefined && category !== undefined;
  return (
    <View style={styles.container}>
      <Header title="Word x Word" backDisabled />
      <Difficulties />
      <Categories />
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!enable_play}
          style={[
            styles.btnView,
            {
              backgroundColor: enable_play
                ? COLORS.LightSkyBlue
                : COLORS.AzureishWhite + '99',
            },
          ]}
          onPress={handlePlay}>
          <Text
            style={[
              styles.btnLabel,
              {
                color: enable_play ? COLORS.white : COLORS.DarkCharcoal,
              },
            ]}>
            Play
          </Text>
        </TouchableOpacity>
      </View>
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
