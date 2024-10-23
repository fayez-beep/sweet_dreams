import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, size, WP, family} from '../utils';
import {appIcons} from '../assets';
import NavService from '../helpers/NavService';
import {ASSETS_URL} from '../config/WebService';
import moment from 'moment';
import Img from './Img';

const NotificationCard = ({
  name = '',
  des = '',
  tim = '',
  img = '',
  onPress,
  onAccept,
  onReject,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.white,
        marginVertical: 10,

        padding: 10,
        ...Shadows.shadow3,
        // marginBottom: 15,
        marginHorizontal: 20,
        borderRadius: 12,
        marginTop: 10,

        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View>
        <Image
          source={img ? {uri: ASSETS_URL + img} : appIcons.userPlaceholder}
          style={{
            width: 60,
            height: 60,
            borderWidth: 3,
            borderColor: colors.primary,
            borderRadius: 30,
          }}
          resizeMode="contain"
        />
      </View>
      <View>
        <View
          style={{
            width: WP('70%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', width: WP('50%')}}>
            <Text
              style={{
                marginHorizontal: 10,
                color: colors.black,
                fontSize: size.normal,
                // fontWeight: '700',
                fontFamily: family?.ArialCE,
              }}
              numberOfLines={2}>
              {name}
            </Text>
            <Text
              style={{
                marginHorizontal: 10,
                color: colors.gray,
                fontSize: size.xsmall,
                fontFamily: family?.ArialCE,
              }}
              numberOfLines={2}>
              {des}
            </Text>
            {name === 'Send-Request' ? (
              <View style={styles.row}>
                <TouchableOpacity style={styles.request_btn} onPress={onAccept}>
                  {/* <Img
                    local
                    style={styles.icn}
                    src={appIcons.check}
                    tintColor={colors.green}
                  /> */}
                  <Text style={styles.btn_text}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.request_btn} onPress={onReject}>
                  {/* <Img
                    local
                    style={styles.icn}
                    src={appIcons.close}
                    tintColor={colors.red}
                  /> */}
                  <Text style={styles.btn_text}>Reject</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <Text
            style={{
              color: colors.darkGray,
              fontSize: size.xtiny,
              fontFamily: family?.ArialCE,
            }}>
            {moment(tim).format('DD MMM, YYYY')}
          </Text>
        </View>
      </View>

      {/* <Text
          style={{
            marginHorizontal: 10,
            color: colors.gray,
            fontSize: size.small,
          }}>
          Description
        </Text> */}
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  icn: {width: 12, height: 12, marginHorizontal: 5},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  request_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  btn_text: {
    fontSize: size.small,
    fontFamily: family.CherryCreamSodaRegular,
    color: colors.white,
  },
});
