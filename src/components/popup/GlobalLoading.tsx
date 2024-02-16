import React, {useImperativeHandle, useState} from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

export const globalLoadingRef = React.createRef<any>();
export const globalLoading = {
  show: () => {
    globalLoadingRef?.current?.show();
  },
  hide: () => {
    globalLoadingRef?.current?.hide();
  },
};

export interface Props {
  name?: string;
}

export const GlobalLoading = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {show: show, hide: hide};
  });

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} animationType={'none'} transparent>
      <StatusBar
        translucent
        backgroundColor={'rgba(0,0,0,0.6)'}
        barStyle={'light-content'}
      />
      <View style={styles.main}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
