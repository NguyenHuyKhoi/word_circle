import {dispatch, useSelector} from '@common';
import {Text} from '@components';
import {DifficultyConfigs} from '@config';
import {EnumDifficulty} from '@models';
import {onSelectDifficulty} from '@reducer';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

export const Difficulties = () => {
  const {difficulty} = useSelector(x => x.play);
  const handleSelect = useCallback((type: EnumDifficulty) => {
    dispatch(onSelectDifficulty(type));
  }, []);

  useEffect(() => {
    handleSelect(EnumDifficulty.EASY);
  }, [handleSelect]);

  return (
    <View style={styles.container}>
      <FlatList
        data={DifficultyConfigs}
        keyExtractor={(_, index) => index + ''}
        horizontal
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.itemView,
              {
                backgroundColor:
                  difficulty === item.type
                    ? COLORS.LightSkyBlue
                    : COLORS.AzureishWhite + '99',
              },
            ]}
            onPress={() => {
              handleSelect(item.type);
            }}>
            <Text
              style={[
                styles.itemDimension,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  fontWeight: difficulty === item.type ? '700' : '400',
                  color:
                    difficulty === item.type
                      ? COLORS.white
                      : COLORS.DarkCharcoal,
                },
              ]}>{`${item.col} x ${item.row}`}</Text>
            <Text
              style={[
                styles.itemName,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  fontWeight: difficulty === item.type ? '700' : '400',
                  color:
                    difficulty === item.type
                      ? COLORS.white
                      : COLORS.DarkCharcoal,
                },
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginVertical: sizes._12sdp,
    marginHorizontal: sizes._10sdp,
  },
  list: {},
  itemView: {
    paddingHorizontal: sizes._16sdp,
    paddingVertical: sizes._8sdp,
    borderRadius: sizes._8sdp,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: sizes._4sdp,
  },
  itemDimension: {
    fontSize: sizes._18sdp,
  },
  itemName: {
    fontWeight: '400',
    color: COLORS.AuroMetalSaurus,
    fontSize: sizes._12sdp,
    textTransform: 'uppercase',
    marginTop: sizes._2sdp,
  },
});
