import {dispatch, useSelector} from '@common';
import {Point, WordEntity} from '@models';
import {onSetOriginPoint} from '@reducer';
import {COLORS} from '@src/themes';
import {sizes} from '@utils';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GestureDetector} from './GestureDetector';
import {WordEffect} from './WordEffect';

export const Table = () => {
  const {table, words, table_config} = useSelector(x => x.play);

  const {row, col, cell_size} = table_config ?? {};

  const isHighlightCell = useCallback(
    (cell: Point) => {
      const exist = words?.find(
        (word: WordEntity) =>
          !word.solved && word.hinted && word.y === cell.y && word.x === cell.x,
      );
      return exist;
    },
    [words],
  );

  return (
    <View
      style={[
        styles.container,
        {
          width: (col ?? 1) * (cell_size ?? 1),
          height: (row ?? 1) * (cell_size ?? 1),
        },
      ]}
      onLayout={event => {
        event.target.measure((x, y, width, height, pageX, pageY) => {
          dispatch(
            onSetOriginPoint({
              x: x + pageX,
              y: y + pageY,
            }),
          );
        });
      }}>
      <WordEffect />
      <FlatList
        data={table ?? []}
        keyExtractor={(_, index) => index + ''}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <FlatList
            data={item}
            scrollEnabled={false}
            keyExtractor={(_, colIndex) => colIndex + ''}
            horizontal
            renderItem={rowData => {
              return (
                <View
                  style={[
                    styles.cell,
                    {
                      width: cell_size ?? 1,
                      height: cell_size ?? 1,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: isHighlightCell({x: rowData.index, y: index})
                          ? COLORS.VeryLightBlue
                          : COLORS.DarkCharcoal,
                        fontSize: (cell_size ?? 1) * 0.65,
                      },
                    ]}>
                    {rowData.item}
                  </Text>
                </View>
              );
            }}
          />
        )}
      />
      <GestureDetector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: sizes._10sdp,
    alignSelf: 'center',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: sizes._20sdp,
    fontWeight: '500',
    color: COLORS.DarkCharcoal,
  },
});
