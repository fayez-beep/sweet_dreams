import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, HP, size, WP, family} from '../utils';
import {appIcons} from '../assets';

const FaqCard = ({item}) => {
  const [shouldShow, setShouldShow] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.middleCard}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShouldShow(!shouldShow)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={{color: colors.black, fontSize: size.small, fontFamily: family?.ArialCE,}}>
            {item?.faqDetail}
          </Text>
          <Image
            source={shouldShow ? appIcons.dropdown2 : appIcons.dropdown2}
            style={{width: 15, height: 8}}
          />
        </TouchableOpacity>
      </View>
      {shouldShow && (
        <View style={styles.card}>
          <Text
            style={{
              paddingVertical: 10,
              fontSize: size.xxsmall,
              color: colors.darkGray,
              fontFamily: family?.ArialCE,
            }}>
            {item?.description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FaqCard;

const styles = StyleSheet.create({
  card: {
    paddingBottom: 10,
    backgroundColor: colors.white,
    // height: HP('30%'),
    // width: WP('90%'),
    marginHorizontal: 20,
    borderRadius: 30,
    marginVertical: 8,
  },
  middleCard: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});
