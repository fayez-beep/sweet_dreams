import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {appIcons} from '../assets';
import {colors, size, WP, family} from '../utils';
import Shadows from '../helpers/Shadows';

const PostSelector = ({showItem, setshowItem}) => {
  const {t} = useTranslation();
  const [data, setData] = useState([
    {
      item: t('str_Public'),
    },
    {
      item: t('str_Followers'),
    },
    {
      item: t('str_Anonymous'),
    },
    {
      item: t('str_Journal'),
    },
  ]);

  const [shouldShow, setShouldShow] = useState(false);

  // const [showItem, setshowItem] = useState('Public');

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        {shouldShow &&
          data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index + 1}
                activeOpacity={0.7}
                style={{
                  borderBottomColor: colors.lightGray,
                  borderBottomWidth: Platform.OS == 'android' ? 0.2 : 0.7,
                  borderLeftWidth: Platform.OS == 'android' ? 0.2 : 0.7,
                  borderRightWidth: Platform.OS == 'android' ? 0.2 : 0.7,
                  borderRightColor: colors.lightGray,
                  borderLeftColor: colors.lightGray,
                }}
                onPress={() => {
                  setData(
                    item?.item == t('str_Public')
                      ? [
                          {
                            item: t('str_Followers'),
                          },
                          {
                            item: t('str_Anonymous'),
                          },
                          {
                            item: t('str_Journal'),
                          },
                        ]
                      : item?.item == t('str_Followers')
                      ? [
                          {
                            item: t('str_Public'),
                          },
                          {
                            item: t('str_Anonymous'),
                          },
                          {
                            item: t('str_Journal'),
                          },
                        ]
                      : item?.item == t('str_Anonymous')
                      ? [
                          {
                            item: t('str_Public'),
                          },
                          {
                            item: t('str_Followers'),
                          },
                          {
                            item: t('str_Journal'),
                          },
                        ]
                      : item?.item == t('str_Journal')
                      ? [
                          {
                            item: t('str_Public'),
                          },
                          {
                            item: t('str_Followers'),
                          },
                          {
                            item: t('str_Anonymous'),
                          },
                        ]
                      : [
                          {
                            item: t('str_Public'),
                          },
                          {
                            item: t('str_Followers'),
                          },
                          {
                            item: t('str_Anonymous'),
                          },
                          {
                            item: t('str_Journal'),
                          },
                        ],
                  );
                  setshowItem(item?.item);
                  setShouldShow(!shouldShow);
                }}>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: size.xxsmall,
                    color: colors.darkGray,
                    marginHorizontal: 10,
                    fontFamily: family?.ArialCE,
                  }}>
                  {item?.item}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <TouchableOpacity
        style={styles.middleCard}
        onPress={() => setShouldShow(!shouldShow)}>
        <Text
          style={{
            color: colors.darkGray,
            fontSize: size.xsmall,
            width: 90,
            fontFamily: family?.ArialCE,
          }}>
          {showItem}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            borderRadius: 3,
            padding: 7,
            marginLeft: -10,
          }}
          onPress={() => setShouldShow(!shouldShow)}>
          <Image
            source={shouldShow ? appIcons.dropdown : appIcons.dropdown}
            style={{width: 9, height: 5}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default PostSelector;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgb(238,238,238)',
    // height: HP('30%'),
    // width: WP('33%'),
    marginHorizontal: Platform.OS == 'ios' ? 15 : WP('7%'),

    borderRadius: 10,
    marginVertical: 8,
    ...Shadows.shadow3,
  },
  middleCard: {
    width: 100,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  container: {
    position: 'absolute',
    // zIndex:9999,
    backgroundColor: colors.white,
    marginHorizontal: 1,
    borderRadius: 10,
    marginVertical: '33%',
    width: '100%',
    // ...Shadows.shadow5,
    // borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
});
