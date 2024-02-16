import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  img: any;
  onPress: () => void;
  style?: any;
}
export const IconButton: FC<Props> = ({img, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={img} style={styles.image} />
    </TouchableOpacity>
  );
};
const SIZE = sizes._50sdp;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: SIZE,
    aspectRatio: 1,
    justifyContent: 'center',
    borderWidth: sizes._1sdp,
    borderRadius: sizes._6sdp,
    borderColor: COLORS.LightSkyBlue,
    backgroundColor: COLORS.white,
  },
  image: {
    width: SIZE / 2,
    height: SIZE / 2,
  },
});
