import {images} from '@assets';
import {MyStatusBar, Text} from '@components';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
interface Props {
  title?: string;
  backDisabled?: boolean;
}
export const Header: FC<Props> = ({title, backDisabled}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <MyStatusBar />
      <View style={styles.header}>
        {backDisabled ? (
          <View style={{width: sizes._36sdp, height: sizes._40sdp}} />
        ) : (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Image source={images.icons.back} style={styles.backImg} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title ?? ''}</Text>

        <View style={{width: sizes._36sdp}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: sizes._6sdp,
    paddingHorizontal: sizes._8sdp,
    backgroundColor: COLORS.LightSkyBlue,
  },
  backBtn: {
    padding: sizes._8sdp,
  },
  backImg: {
    width: sizes._24sdp,
    height: sizes._24sdp,
  },
  title: {
    color: COLORS.white,
    fontSize: sizes._18sdp,
    fontWeight: '500',
  },
  emptyView: {
    width: sizes._20sdp,
  },
});
