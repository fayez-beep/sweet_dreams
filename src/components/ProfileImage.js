import React from 'react';
import {Image, Text, View} from 'react-native';
import {colors, size , family} from '../utils';

const ProfileImage = ({
  size = 140,
  imageUri,
  innerAsset = false,
  name = ' ',
  style,
}) => {
// console.log(imageUri,innerAsset,'profile Image');
  if (imageUri)
    return (
      <View
        style={{
          // marginTop: -20,
          // backgroundColor: colors.primary,
          height: 100,
          width: 130,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 72.5,
        }}>
        <Image
          source={innerAsset ? imageUri : {uri: imageUri}}
         
          // source={imageUri}
          style={[
            {
              width: size,
              height: size,
              resizeMode: 'cover',
              borderRadius: 70,
              borderColor:colors.primary,
              borderWidth:5
            },
            style,
          ]}
        />
      </View>
    );
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 50,
          borderColor: colors.primary,
          backgroundColor: colors.secondary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text
        numberOfLines={1}
        style={{
          color: colors.primary,
          fontSize: size * 0.75,
          // fontWeight: '800',
          width: '100%',
          textAlign: 'center',
          fontFamily: family?.ArialCE,
        }}>
        {name[0].toUpperCase()}
      </Text>
    </View>
  );
};

export default ProfileImage;
