import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, WP, family} from '../utils';
import Shadows from '../helpers/Shadows';

const PostDreamCard = ({item, feeling, onPress, colored = false, index}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      style={{
        backgroundColor: colored ? colors.white : colors.blue,
        marginVertical: 10,
        marginHorizontal: 4,
        // padding: 13,
        paddingVertical: 12,
        width: 95,
        borderRadius: 25,
        ...Shadows.shadow3,
      }}>
      <Text
        style={{
          color: colored ? colors.darkGray : colors.white,
          textAlign: 'center',
          fontFamily: family?.ArialCE,
          paddingHorizontal: 5,
        }}>
        {item?.feeling}
      </Text>
    </TouchableOpacity>
  );
};

export default PostDreamCard;

const styles = StyleSheet.create({});
