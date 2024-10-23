import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {appIcons} from '../assets';
import {colors, size, family} from '../utils';
import Shadows from '../helpers/Shadows';
import { useTranslation } from 'react-i18next';
const FilterToggle = () => {
  const {t} = useTranslation()
  const [data, setData] = useState([
    {
      item:`${t('str_Monthly')}`,
    },
  ]);
  const [shouldShow, setShouldShow] = useState(false);
  const [showItem, setshowItem] = useState(`${t('str_Daily')}`);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.middleCard}
        onPress={() => setShouldShow(!shouldShow)}
        activeOpacity={0.9}>
        <Text style={{color: colors.darkGray, fontSize: size.small, fontFamily: family?.ArialCE,}}>
          {showItem}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.lightGray,
            borderRadius: 4,
            padding: 7,
          }}
          onPress={() => setShouldShow(!shouldShow)}>
          <Image
            source={shouldShow ? appIcons.dropdown2 : appIcons.dropdown2}
            style={{width: 9, height: 5}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {shouldShow && (
        <>
          <FlatList
            key={shouldShow}
            style={{
              position: 'absolute',
              backgroundColor: colors.white,
              marginHorizontal: 1,
              borderRadius: 10,
              marginVertical: '39%',
              width: '100%',
              ...Shadows.shadow5,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 10,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  borderTopColor: colors.gray,
                  borderTopWidth: 0.2,
                }}
                onPress={() => {
                  setData([
                    {
                      item: item?.item == `${t('str_Monthly')}` ? `${t('str_Daily')}` : `${t('str_Monthly')}`,
                    },
                  ]);
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
            )}
          />
        </>
      )}
    </View>
  );
};

export default FilterToggle;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    // height: HP('30%'),
    // width: WP('90%'),
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 0,
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
});
