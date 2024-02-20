import {useSelector} from '@common';
import {sizes} from '@utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TableCell} from './TableCell';
import {CELL_SIZES} from '@config';

export const Table = () => {
  const {table} = useSelector(x => x.play);
  if (table === undefined || table[0] === undefined) {
    return undefined;
  }
  // const row = table.length;
  // const col = table[0].length;
  const cell_size = CELL_SIZES[table[0].length];
  return (
    <View
      style={[
        styles.container,
        {
          // width: (col ?? 1) * (cell_size ?? 1),
          // height: (row ?? 1) * (cell_size ?? 1),
        },
      ]}>
      {table.map((row, ri) => (
        <View style={styles.row} key={ri + ''}>
          {row.map((cell, ci) => (
            <TableCell data={cell} size={cell_size} key={ci + ''} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: sizes._10sdp,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes._12sdp,
  },
  row: {
    flexDirection: 'row',
  },
});
