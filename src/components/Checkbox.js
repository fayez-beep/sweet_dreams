import {
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../utils';
import Img from './Img';
import {appIcons} from '../assets';
import {useSelector} from 'react-redux';
import {HatTheme, UserTheme} from '../utils/colors';

const Checkbox = ({isCheck, index, handleCheck}) => {
  const appTheme = useSelector(state => state?.appReducer?.appTheme);
  console.log(appTheme, 'Appbassckground');
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
        },
      ]}
      key={index}
      onPress={handleCheck}>
      {/* {isCheck == true && ( */}
      <Img
        src={isCheck == true ? appIcons.radiocheck : null}
        local
        style={styles.image}
        resizeMode={'contain'}
        tintColor={isCheck == true ? colors?.blue : colors?.white}
      />
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: 25,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 10,
    width: 10,
    // paddingHorizontal: 5,
    // paddingVertical: 5,
  },
});
