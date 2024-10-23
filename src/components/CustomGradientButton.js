import React from 'react';
import {Dimensions, Text, TouchableOpacity, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons} from '../assets';
import Shadows from '../helpers/Shadows';
import {colors, HP, size, family, WP} from '../utils';

const {width} = Dimensions.get('screen');

function CustomGradientButton(props) {
  const {
    linearHeight,
    color,
    title,
    onPress,
    buttonStyle,
    textStyle,
    disabled,
    icon,
    styleWidth,
    iconName,
    colorstyle = false,
    profile,
    Otherprofile
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        {
          alignSelf: 'center',
          width: styleWidth ? '100%' : WP('83%'),
          marginTop: profile || Otherprofile ? 10 : 40,
          ...Shadows.shadow3,
        },
        buttonStyle,
      ]}>
      <LinearGradient
        colors={colorstyle ? colors.gradient : colors.bluegradient}
        style={[
          {
            height: styleWidth ? 50 : 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          },
          linearHeight,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.4}}>
        {icon ? (
          <Image
            source={appIcons.email}
            style={{
              // marginRight: 20,
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: colors.white,
              position: 'absolute',
              left: width / 7.6,
            }}
          />
        ) : (
          <></>
        )}
        {iconName ? (
          <Image
            source={iconName}
            style={{
              marginTop: 15,
              // marginRight: 20,
              width: 23,
              height: 23,
              resizeMode: 'contain',
              tintColor: colors.white,
            }}
          />
        ) : (
          <></>
        )}

        {props?.preLoginEmailButton ? (
          <View
            style={{width: '60%', marginLeft: '15%', justifyContent: 'center'}}>
            <Text
              style={[
                {
                  fontSize: styleWidth ? size.small : size.normal,
                  color: colors.white,
                  // fontWeight: styleWidth ? '500' : '500',
                  fontFamily: family?.ArialCE,
                },
                textStyle,
              ]}>
              {title}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              {
                fontSize: styleWidth ? size.small : size.normal,
                color: colors.white,
                // fontWeight: styleWidth ? '500' : '500',
                fontFamily: family?.ArialCE,
              },
              textStyle,
            ]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default CustomGradientButton;
