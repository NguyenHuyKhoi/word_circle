import {images} from '@assets';
import {ActionButton, Text} from '../ui';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {useImperativeHandle, useState} from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface GlobalAlertData {
  title: string;
  content?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
export const globalAlertRef = React.createRef<any>();
export const globalAlert = {
  show: (data: GlobalAlertData) => {
    globalAlertRef?.current?.show(data);
  },
  hide: () => {
    globalAlertRef?.current?.hide();
  },
};

export interface GlobalAlertProps {}

export const GlobalAlert = React.forwardRef((props, ref) => {
  const {} = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<GlobalAlertData | undefined>();

  useImperativeHandle(ref, () => {
    return {show: show, hide: hide};
  });

  const show = (params: GlobalAlertData) => {
    setVisible(true);
    setData(params);
  };
  const hide = () => {
    setVisible(false);
  };

  return (
    <Modal
      style={styles.main}
      visible={visible}
      animationType={'none'}
      transparent>
      <StatusBar
        translucent
        backgroundColor={'rgba(0,0,0,0.6)'}
        barStyle={'light-content'}
      />
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.main}>
          <View style={styles.boxContent}>
            <View style={styles.content}>
              <Text style={styles.title}>{data?.title ?? ''}</Text>

              {data?.content && (
                <Text style={styles.message}>{data?.content}</Text>
              )}
              <View style={styles.footer}>
                <ActionButton
                  img={images.icons.wrong}
                  title="btn_cancel"
                  onPress={() => {
                    setVisible(false);
                    data?.onCancel?.();
                  }}
                />
                <ActionButton
                  img={images.icons.correct}
                  title="btn_ok"
                  onPress={() => {
                    setVisible(false);
                    data?.onConfirm?.();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  boxContent: {
    width: sizes._300sdp,
    backgroundColor: 'white',
    borderRadius: sizes._15sdp,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: sizes._16sdp,
    justifyContent: 'center',
  },
  title: {
    marginBottom: sizes._4sdp,
    marginHorizontal: sizes._12sdp,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: sizes._20sdp,
    color: COLORS.DarkCharcoal,
  },
  message: {
    marginBottom: sizes._10sdp,
    fontWeight: '400',
    fontSize: sizes._16sdp,
    color: COLORS.DavyGrey,
  },
  button: {
    width: sizes._80sdp,
    height: sizes._40sdp,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    marginTop: sizes._10sdp,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
