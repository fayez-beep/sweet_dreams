import React from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import {appIcons} from '../assets';
import {colors, family} from '../utils';

const {width} = Dimensions.get('window');

export default function CustomTextInput(props) {
  return (
    <View style={[{width: '100%', marginTop: 10, alignItems: 'center'}]}>
      <View
        style={[
          {
            width: props?.drawerBtn ? 100 : width - 60,
            height: props?.drawerBtn ? 30 : 55,
            backgroundColor: colors.white,
            paddingHorizontal: 15,
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.16,
            shadowRadius: 2.22,
            elevation: 3,
          },
        ]}>
        {props?.icon ? (
          <Image
            source={props?.value[1]}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              tintColor: colors.icon,
              position: 'absolute',
              left: props?.drawerBtn ? 0 : width / 3.7,
            }}
          />
        ) : null}
        {props?.icon ? (
          <Text
            style={{
              flex: 1,
              color: props?.value ? colors.black : colors.darkGray,
              textAlign: props?.textAlign,
              fontFamily: family?.ArialCE,
            }}>
            {props?.value?.length ? props?.value[0] : props?.placeholder}
          </Text>
        ) : (
          <Text
            style={{
              flex: 1,
              color: props?.value ? colors.black : colors.darkGray,
              textAlign: props?.textAlign,
              fontFamily: family?.ArialCE,
              
              }}>
            {props?.value?.length ? props?.value : props?.placeholder}
          </Text>
        )}

        {props?.isDropdown && (
          <Image
            source={appIcons.dropdown}
            style={{
              width: 15,
              height: 15,
              resizeMode: 'contain',
              tintColor: colors.black,
            }}
          />
        )}
      </View>
    </View>
  );
}
export function AuthTextInputSelector(props) {
  const [dropdown, setDropdown] = React.useState(props?.isDropdown);
  return (
    <View
      style={[
        {
          width: '90%',
          marginTop: 15,
          alignItems: 'center',
        },
        props?.mainContainerStyle,
      ]}>
      {props?.value?.length ? (
        <Text
          style={{
            color: colors.white,
            fontSize: 14,
            width: '100%',
          }}>
          {props?.placeholder}
        </Text>
      ) : null}
      <View
        style={{
          height: 50,
          textDecorationLine: 'underline',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: colors.white,
          alignItems: 'center',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 2.22,
          elevation: 3,
        }}>
        {props?.icon && (
          <Image
            source={props?.icon}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
              tintColor: colors.primary,
              marginRight: 15,
            }}
          />
        )}
        <Text style={{flex: 1, color: colors.white, fontSize: 17}}>
          {props?.value?.length ? props?.value : props?.placeholder}
        </Text>

        {props?.isDropdown && (
          <Image
            source={appIcons.dropdown}
            style={{
              width: 15,
              height: 15,
              resizeMode: 'contain',
              tintColor: colors.white,
            }}
          />
        )}
      </View>
    </View>
  );
}
