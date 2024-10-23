import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors, size, WP, family} from '../utils';
import {appIcons} from '../assets';
import Shadows from '../helpers/Shadows';
import NavService from '../helpers/NavService';
import moment from 'moment';
import {ASSETS_URL} from '../config/WebService';

const ChatListCard = ({item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => NavService.navigate('Message', item)}
      style={{
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        ...Shadows.shadow3,
        // marginBottom: 15,
        marginHorizontal: 15,
        marginTop: 3,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        flexDirection: 'row',
        marginVertical: 10,
      }}>
      <Image
        source={
          item?.profile_image
            ? {uri: ASSETS_URL + item.profile_image}
            : appIcons.userPlaceholder
        }
        style={{
          width: 60,
          height: 60,
          borderWidth: 3,
          borderColor: colors.primary,
          borderRadius: 30,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'column',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
            alignContent: 'center',
            // width: WP('82%'),
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 8,
              color: colors.black,
              fontSize: size.normal,
              // fontWeight: '500',
              fontFamily: family?.ArialCE,
            }}
            numberOfLines={2}>
            {item.full_name}
          </Text>
          <Text
            style={{
              marginRight: 25,
              color: colors.gray,
              fontSize: size.tiny,
              fontFamily: family?.ArialCE,
            }}>
            {moment(item.created_at).format('hh:mm A DD MMM, YYYY')}
          </Text>
        </View>

        <Text
          style={{
            marginHorizontal: 8,
            marginTop: 4,
            color: colors.gray,
            fontSize: size.small,
            // fontWeight: '600',
            width: WP('70%'),
            fontFamily: family?.ArialCE,
          }}
          numberOfLines={2}>
          {item.type === 'text' ? item.last_message : 'Attachment'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListCard;

const styles = StyleSheet.create({});
