import {dispatch, useSelector} from '@common';
import {Text} from '@components';
import {CategoryConfigs} from '@config';
import {Category} from '@models';
import {onSelectCategory} from '@reducer';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const NUM_COL = 3;
export const Categories = () => {
  const {category} = useSelector(x => x.play);
  const list: (Category | null)[] = [...CategoryConfigs];
  while (list.length % NUM_COL !== 0) {
    list.push(null);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(_, index) => index + ''}
        numColumns={NUM_COL}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
          item === null ? (
            <View style={styles.itemView} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                dispatch(onSelectCategory(item.type));
              }}
              style={[
                styles.itemView,
                {
                  backgroundColor:
                    category === item.type
                      ? COLORS.LightSkyBlue
                      : COLORS.AzureishWhite + '99',
                },
              ]}>
              <Text
                style={[
                  styles.itemName,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    fontSize:
                      item.name.length <= 10 ? sizes._14sdp : sizes._12sdp,
                    fontWeight: category === item.type ? '700' : '400',
                    color:
                      category === item.type
                        ? COLORS.white
                        : COLORS.DarkCharcoal,
                  },
                ]}>
                {item.name}
              </Text>
              <View style={styles.imageView}>
                <Image
                  source={item.image}
                  style={[
                    styles.itemImage,
                    {
                      transform: [{scale: category === item.type ? 1 : 0.6}],
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: sizes._12sdp,
    marginHorizontal: sizes._4sdp,
    flex: 1,
  },
  list: {},
  itemView: {
    flex: 1,
    paddingHorizontal: sizes._4sdp,
    paddingVertical: sizes._4sdp,
    borderRadius: sizes._8sdp,
    flexDirection: 'column',
    marginHorizontal: sizes._6sdp,
    marginVertical: sizes._6sdp,
  },
  itemImage: {
    height: sizes._45sdp,
    marginVertical: sizes._10sdp,
    aspectRatio: 1,
  },
  imageView: {
    height: sizes._60sdp,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._8sdp,
  },
  itemName: {
    fontWeight: '500',
    color: COLORS.DarkCharcoal,
    textTransform: 'uppercase',
    alignSelf: 'center',
    marginVertical: sizes._4sdp,
  },
});
