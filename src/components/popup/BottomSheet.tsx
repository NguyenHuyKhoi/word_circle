import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {useReducedMotion} from 'react-native-reanimated';

interface Props {
  currentSnapPoints?: Array<string | number>; //Custom height bottom sheet
  children: JSX.Element;
  title?: string;
  onSubmit?: () => void;
  confirmLabel?: string;
  onCancel?: () => void;
}

export interface BottomSheetModalRef {
  open(): void;
  close(): void;
}
const defaultSnapPoints = ['1%', '50%'];
export const BottomSheetModalContainer = React.forwardRef<
  BottomSheetModalRef,
  Props
>((props, ref) => {
  const reducedMotion = useReducedMotion();
  const {currentSnapPoints, children} = props;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(
    () => currentSnapPoints ?? defaultSnapPoints,
    [currentSnapPoints],
  );
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.dismiss();
    }
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        bottomSheetRef.current?.present();
      },
      close: () => {
        bottomSheetRef.current?.dismiss();
      },
    }),
    [],
  );

  useEffect(() => {
    //bottomSheetRef?.current?.present();
  });

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      animateOnMount={!reducedMotion}
      style={styles.modal}
      enablePanDownToClose
      enableContentPanningGesture={false}
      backdropComponent={backDropProps => (
        <BottomSheetBackdrop
          {...backDropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      // animateOnMount
      onChange={handleSheetChanges}>
      <View style={styles.container}>{children}</View>
    </BottomSheetModal>
  );
});
const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: sizes._32sdp,
    borderTopRightRadius: sizes._32sdp,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.0,
    elevation: 24,
  },

  container: {
    flex: 1,
    zIndex: 99,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: sizes._10sdp,
    paddingTop: 0,
    borderBottomWidth: sizes._1sdp,
    borderBottomColor: COLORS.BrightGray,
  },
  headerTitle: {
    color: COLORS.DarkCharcoal,
  },
  cancelLabel: {color: COLORS.DarkCharcoal},
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: sizes._1sdp,
    borderColor: COLORS.BrightGray,
  },
  doneBtn: {
    backgroundColor: COLORS.CelticBlue,
  },
  button: {
    flex: 1,
    marginHorizontal: sizes._10sdp,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
