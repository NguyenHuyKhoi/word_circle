import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from './Text';

interface Props {
  title: string;
  img: any;
  onPress: () => void;
  style?: any;
}
export const ActionButton: FC<Props> = ({title, img, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={img} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: sizes._1sdp,
    borderRadius: sizes._6sdp,
    borderColor: COLORS.LightSkyBlue,
    paddingHorizontal: sizes._10sdp,
    backgroundColor: COLORS.white,
    paddingVertical: sizes._6sdp,
  },
  title: {
    color: COLORS.CelticBlue,
    fontSize: sizes._16sdp,
    fontWeight: '600',
    marginLeft: sizes._12sdp,
  },
  image: {
    width: sizes._24sdp,
    aspectRatio: 1,
  },
});
