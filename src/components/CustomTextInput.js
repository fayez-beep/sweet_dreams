import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TouchableOpacity as TouchableFromGesture} from 'react-native-gesture-handler';
import {TextInputMask} from 'react-native-masked-text';
import {appIcons} from '../assets';
import {colors, size, family} from '../utils';

const {width} = Dimensions.get('window');

export default function CustomTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const [isFocused, setIsFocused] = useState(false);
  const {containerStyle, types, placeholder} = props;
  return (
    <View style={{width: '100%', marginTop: 20}}>
      {/* <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
        {placeholder}
      </Text> */}
      <View
        style={[
          {
            alignSelf: 'center',
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
          },
          containerStyle,
        ]}>
        {props?.icon ? (
          <Image
            source={props?.icon}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: colors.text,
              marginTop: 5,
            }}
          />
        ) : null}
        <View
          style={{
            flex: 1,
            paddingBottom: 6,
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
            // ...Shadows.shadow5,
          }}>
          <TextInput
            placeholderTextColor={colors.darkGray}
            types={types}
            label={props.label}
            inputPadding={10}
            style={{
              flex: 1,
              color: colors.black,
              // ...Shadows.shadow3
            }}
            inputStyle={{color: colors.white, fontSize: 16}}
            labelStyle={{color: colors.grey}}
            secureTextEntry={hidden}
            {...props}
          />
          {props.isPassword && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}></TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
export function ProfileTextInput(props) {
  const {icon} = props;
  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
      }}>
      <Image
        source={icon}
        style={{width: 15, height: 15, resizeMode: 'contain'}}
      />
      <TextInput
        style={{
          width: '100%',
          height: 50,
          color: colors.primary,
          marginLeft: 10,
          // fontWeight: '600',
          fontFamily: family?.ArialCE,
        }}
        placeholderTextColor={'#7E7E7E'}
        {...props}
      />
    </View>
  );
}

export function CustomTextInputWithHeading(props) {
  const [hidden, setHidden] = useState(props.isPassword);

  return (
    <View
      style={{
        width: '100%',
        marginTop: props?.topFalse ? 0 : 10,
        alignItems: 'center',
      }}>
      <Text
        style={[
          {
            alignSelf: 'flex-start',
            marginBottom: props?.topFalse ? 0 : 10,
            fontSize: size.xsmall,
            color: colors.skyBlue,
            marginLeft: props?.textStyle ? 8 : null,
            fontFamily: family?.ArialCE,
          },
        ]}>
        {props.heading}
      </Text>

      {Platform.OS === 'ios' ? (
        <TouchableFromGesture
          activeOpacity={0.8}
          onPress={props?.datePicker ? props?.onPress : null}
          style={{
            width: width - 60,
            overflow: 'hidden',
            height: props.multiline ? 150 : 55,
            backgroundColor: colors.white,
            paddingHorizontal: 5,
            borderRadius: props.multiline ? 10 : 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            flexDirection: 'row',
            // paddingHorizontal: 15,
          }}>
          <Image
            source={props?.icon}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              tintColor: colors.icon,
            }}
          />
          <TextInput
            style={{
              flex: 1,
              height: props?.multiline ? 100 : 55,
              color: colors.darkGray,
              fontFamily: family?.ArialCE,
              backgroundColor: 'white',
              overflow: 'hidden',
            }}
            placeholderTextColor={colors.darkGray}
            secureTextEntry={hidden}
            {...props}
            onChangeText={props?.Onchange}
            multiline={props.multiline ? true : false}
            numberOfLines={props.multiline == true ? 10 : null}
            textAlignVertical={props?.multiline ? 'top' : null}
            editable={props?.datePicker ? false : true}
            maxLength={props?.maxLength}
            returnKeyType={props.multiline ? 'next' : 'done'}
          />
          {props?.isPassword && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={hidden ? appIcons.eyeNot : appIcons.eye}
                style={{
                  marginHorizontal: 10,
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: colors.grey,
                }}
              />
            </TouchableOpacity>
          )}

          {props?.datePicker && (
            <TouchableOpacity
              style={{}}
              onPress={props?.datePicker ? props?.onPress : null}
              activeOpacity={0.8}>
              <Image
                source={appIcons.calendar}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: colors.skyBlue,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </TouchableFromGesture>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props?.datePicker ? props?.onPress : null}
          style={{
            width: width - 60,
            flex: 1,
            height: props.multiline ? 150 : 55,
            backgroundColor: colors.white,
            paddingHorizontal: 5,
            borderRadius: props.multiline ? 10 : 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            flexDirection: 'row',
            // paddingHorizontal: 15,
          }}>
          <Image
            source={props?.icon}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              tintColor: colors.icon,
            }}
          />
          <TextInput
            style={[
              {
                flex: 1,
                height: props?.multiline ? 100 : 55,
                color: colors.darkGray,
                fontFamily: family?.ArialCE,
              },
              props.customStyles ? props.customStyles : null,
            ]}
            placeholderTextColor={colors.darkGray}
            secureTextEntry={hidden}
            {...props}
            onChangeText={props?.Onchange}
            multiline={props.multiline ? true : false}
            numberOfLines={props.multiline == true ? 10 : null}
            textAlignVertical={props?.multiline ? 'top' : null}
            editable={props?.datePicker ? false : true}
            maxLength={props?.maxLength}
          />
          {props?.isPassword && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={hidden ? appIcons.eyeNot : appIcons.eye}
                style={{
                  marginHorizontal: 10,
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: colors.grey,
                }}
              />
            </TouchableOpacity>
          )}

          {props?.datePicker && (
            <TouchableOpacity
              style={{}}
              onPress={props?.datePicker ? props?.onPress : null}
              activeOpacity={0.8}>
              <Image
                source={appIcons.calendar}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: colors.skyBlue,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
export function CustomPhoneInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {containerStyle, types, placeholder, color, placeholderColor, verify} =
    props;
  return (
    <View style={{width: '100%', marginTop: 18}}>
      {/* <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
        {placeholder}
      </Text> */}
      <View
        style={[
          {
            alignSelf: 'center',
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 7,
            paddingVertical: 5,
            height: 55,
            marginVertical: 0,
          },
          containerStyle,
        ]}>
        {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              // tintColor: colors.iconcolor,
              marginHorizontal: 10,
              // marginTop: 5,
            }}
          />
        ) : null}
        <View
          style={{
            flex: 1,

            flexDirection: 'row',
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: colors.lightGray,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInputMask
              type={'cel-phone'}
              style={{
                flex: 1,
                color: colors.black,
                paddingLeft: 10,
                fontSize: size.small,
              }}
              onChangeText={phoneNumberFormat => {
                let phoneNumber = phoneNumberFormat
                  .toString()
                  .replace(/\D+/g, '');
                props?.onChangePhoneInput(phoneNumberFormat, phoneNumber);
              }}
              maxLength={
                props?.formattedPhoneNumber.toString().startsWith('1') ? 18 : 19
              }
              options={
                props?.phoneNumber.startsWith('1')
                  ? {
                      dddMask: '9 (999) 999 - ',
                    }
                  : {
                      dddMask: '(999) 999 - ',
                    }
              }
              {...props}
            />
          </View>
          {/* {props.rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={!hidden ? appIcons.Visible : appIcons.Unvisible}
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </View>
  );
}
export function CustomSearchInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {width} = Dimensions.get('screen');

  const {
    containerStyle,
    types,
    placeholder,
    color,
    placeholderColor,
    verify,
    borderStyles,
    Iconcolor,
    Lineiconcolor,
    Lineicon,
    labeltext,
    label,
    textInputStyles,
    onSubmitEditing,
    search,
    onChangeText,
    rightImage,
    rightimagetext,
    rightImagetintColor,
    multiline,
  } = props;

  return (
    <View style={{}}>
      <View
        style={[
          {
            width: width - 30,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.white,
            borderRadius: 100,
            paddingHorizontal: 7,
            paddingVertical: 2,
            height: 55,
            borderWidth: 0,
            borderColor: colors.lightGray,
            marginVertical: 0,
            // backgroundColor:'red',
            ...Shadows.shadow3,
          },
          containerStyle,
        ]}>
        {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              tintColor: Iconcolor,
              marginHorizontal: 10,
            }}
          />
        ) : null}

        {props?.Lineicon ? (
          <Image
            source={props?.Lineicon}
            style={{
              width: 18,
              height: 30,
              resizeMode: 'contain',
              tintColor: Lineiconcolor,
              marginHorizontal: -10,
            }}
          />
        ) : null}
        <View
          style={[
            {
              flex: 1,
              marginLeft: 10,
              // alignItems: 'center',
              borderLeftWidth: 0,
              borderLeftColor: colors.border,
            },
            borderStyles,
          ]}>
          {label && (
            <CustomText
              text={labeltext}
              style={{
                color: colors.white,
                ...appStyles.font14,
                bottom: 5,
                marginLeft: Platform.OS == 'ios' ? 0 : 3,
                ...appStyles.margin1Percent,
                ...appStyles.family_Poppins_SemiBold,
              }}
            />
          )}

          <TextInput
            placeholderTextColor={props?.placeholderColor || colors.white}
            multiline={multiline}
            style={[
              {
                flex: 1,
                color: colors.white,
                // left: label ? -1 : 0,
                alignItems: 'center',
                top: label ? 5 : 0,
                justifyContent: 'center',
                marginTop: label ? -20 : Platform.OS == 'android' ? 0 : 0,
                fontSize: size.xsmall,
                fontFamily: family.Poppins_Medium,
              },
              textInputStyles,
            ]}
            secureTextEntry={hidden}
            autoCapitalize="none"
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            {...props}
          />
          {props?.rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={!hidden ? appIcons.eye : appIcons.eyeNot}
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {props?.search && (
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => setHidden(!hidden)}
            >
              <Image
                source={props?.search}
                style={{
                  height: 22,
                  width: 22,
                  marginRight: 10,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {props?.rightImage && (
            <View
              style={{
                position: 'absolute',
                right: 5,
                top: 15,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={rightImage}
                style={{
                  tintColor: rightImagetintColor,
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  marginRight: 4,
                }}
              />
              <Text
                style={{
                  color: colors.secondary,
                  // ...appStyles.family_Poppins_Medium,
                  // ...appStyles.font13,
                }}>
                {rightimagetext}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
