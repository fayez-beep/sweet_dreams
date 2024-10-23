// RadioButton.js

import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import { colors } from '../utils';

const RadioButton = ({label, selected, onSelect}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(label)}>
      <View style={styles.parent}>
        <View style={[styles.container,{  borderColor: selected ? 'blue' : 'gray',}]}>
          {selected && <View style={styles.selected} />}
        </View>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  parent: {flexDirection: 'row', alignItems: 'center',marginBottom:10},
  container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
  text: {marginLeft: 8,color:colors.darkGray},
});
