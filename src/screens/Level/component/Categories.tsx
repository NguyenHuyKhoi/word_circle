import {images} from '@assets';
import {dispatch, useSelector} from '@common';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {onSelectCategory} from '@reducer';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

export const Categories = () => {
  const {categories} = useSelector(x => x.game);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.LEVEL>
    >();
  const handlePlay = useCallback(
    (cat_id: number) => {
      dispatch(onSelectCategory(cat_id));
      setTimeout(() => {
        navigation.navigate(APP_SCREEN.PLAY);
      }, 200);
    },
    [navigation],
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(_, index) => index + ''}
        numColumns={1}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              handlePlay(item.id);
            }}
            style={[
              styles.itemView,
              {
                backgroundColor: COLORS.LightSkyBlue,
              },
            ]}>
            <View style={styles.difficultyView}>
              <Text style={styles.difficultyLabel}>{'Difficulty'}</Text>
              <View style={styles.difficultyStars}>
                {new Array(item.char_count).fill(0).map(() => (
                  <Image source={images.icons.star} style={styles.star} />
                ))}
              </View>
            </View>
            <View style={styles.levelView}>
              <Text style={styles.levelLabel}>{'Level'}</Text>
              <Text style={styles.levelValue}>{`${item.win_levels + 1} / ${
                item.total_levels
              }`}</Text>
            </View>
          </TouchableOpacity>
        )}
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
    paddingHorizontal: sizes._8sdp,
    paddingVertical: sizes._8sdp,
    borderRadius: sizes._6sdp,
    flexDirection: 'column',
    marginHorizontal: sizes._12sdp,
    marginVertical: sizes._8sdp,
  },
  levelView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: sizes._4sdp,
  },
  levelLabel: {
    fontSize: sizes._16sdp,
    fontWeight: '600',
    color: COLORS.white,
  },
  levelValue: {
    fontSize: sizes._20sdp,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: sizes._8sdp,
  },
  difficultyView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyLabel: {
    fontSize: sizes._16sdp,
    fontWeight: '600',
    color: COLORS.white,
  },
  difficultyStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: sizes._20sdp,
    height: sizes._20sdp,
    marginVertical: sizes._2sdp,
  },
});
