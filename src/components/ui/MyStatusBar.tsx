import {COLORS} from '@themes';
import {_screen_statusbar_height} from '@utils';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
export const MyStatusBar = ({
  backgroundColor,
  ...props
}: {
  backgroundColor?: string;
}) => (
  <View
    style={[
      styles.statusBar,
      {backgroundColor: backgroundColor || COLORS.LightSkyBlue},
    ]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);
const styles = StyleSheet.create({
  statusBar: {
    height: _screen_statusbar_height,
  },
});
