import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {appIcons} from '../assets/index';
import {appImages} from '../assets';
import {colors, family, size} from '../utils';
import NavService from '../helpers/NavService';
import Shadows from '../helpers/Shadows';
import {ASSETS_URL} from '../config/WebService';

function AppBackground({
  children,
  title,
  back = false,
  menu = false,
  profile = false,
  nav = '',
  rightIcon = appIcons.notification,
  marginHorizontal = true,
  bottomLine = true,
  childrenContainerStyle = {},
  imgUri = '',
  rightIconNav = () => {
    NavService.navigate('Notification');
  },
  twocloudsss = true,
  notification = false,
  appBackground = true,
  backgroundChange = true,
  draw = false,
  dummybackground,
  Save = true,
  // savePost = NavService.navigate('SavePost'),
  rightIcon1 = appIcons.save,
}) {
  return (
    <ImageBackground
      source={
        appBackground
          ? backgroundChange
            ? appImages.backgroundImage
            : appImages.bg
          : twocloudsss
          ? appImages.twocloud
          : appImages.subs1
      }
      style={{flex: 1}}>
      <View
        style={{
          marginTop: getStatusBarHeight() * 1.4,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
          // backgroundColor:'red',
          // height:200
        }}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              nav.length
                ? NavService.navigate(nav)
                : back
                ? NavService.goBack()
                : NavService.openDrawer();
            }}
            style={{
              alignItems: 'center',
              backgroundColor: colors.white,
              borderRadius: 50,
              left: menu ? 45 : 20,
              width: 40,
              height: 40,
              zIndex: 50,
              position: 'absolute',
              justifyContent: 'center',

              ...Shadows.shadow5,
            }}>
            {back && (
              <Image
                source={appIcons.back}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                }}
              />
            )}
            {menu && (
              <Image
                source={appIcons.menu}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            <Text
              style={{
                color: colors.black,
                fontFamily: family?.CherryCreamSodaRegular,
                fontSize: size?.h6,
              }}>
              {title}
            </Text>
          </View>
          {notification && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Notification');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 120 / 2,
                backgroundColor: colors.blue,
              }}>
              <Image
                source={rightIcon}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          )}
          {Save && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('SavePost');
              }}
              style={{
                position: 'absolute',
                right: notification ? 70 : 20,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 120 / 2,
                backgroundColor: colors.blue,
              }}>
              <Image
                source={rightIcon1}
                style={{
                  width: 20,
                  height: 20,
                  // borderRadius: 12,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {draw && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.openDrawer();
              }}
              style={{
                position: 'absolute',
                left: 20,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 120 / 2,
                backgroundColor: colors.blue,
              }}>
              <Image
                source={appIcons.menu}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          )}

          {profile && (
            <View
              style={{
                position: 'absolute',
                right: 20,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 120 / 2,
              }}>
              <Image
                source={
                  imgUri ? {uri: ASSETS_URL + imgUri} : appIcons.userPlaceholder
                }
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  resizeMode: 'cover',
                  borderWidth: 2,
                  borderRadius: 23,
                  borderColor: colors.primary,
                }}
              />
            </View>
          )}
        </>
      </View>
      {bottomLine ? (
        <View
          style={{
            borderColor: colors.lightGray,
            borderBottomWidth: 1,
            marginHorizontal: 30,
          }}
        />
      ) : null}
      <View
        style={{
          flex: 1,
          marginHorizontal: !marginHorizontal ? 20 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </ImageBackground>
  );
}

export default AppBackground;
