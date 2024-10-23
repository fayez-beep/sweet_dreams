// import React from 'react';
// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import {appIcons} from '../assets/index';
// import {Colors, NavService} from '../config';

// const Header = ({title, back = false, nav = '', profile = true}) => {
 
//   return (
    
//   );
// };
// export default Header;
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native'
import { appIcons } from '../assets/index'
export const AuthHeader = ({
    onPress = () => { },
    title= null,
    // backTitle = 'Back'
  }) => {
    return (
      <>
        <View style={[styles.headerContainer, { marginTop: Platform.OS === 'ios' ? 45 : 35 }]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.backButtonContainer}>
            <Image style={styles.imageStyle}
              source={appIcons.backIcon} />
            {/* <Text style={[styles.headerSignInText, { color: "#9c9c9c", }]}>
          {backTitle}
            </Text> */}
          </TouchableOpacity>
          <Text style={styles.headerSignInText}>
           {title}
          </Text>
        </View>
      </>
  
    )
  }

  const styles = StyleSheet.create({
    headerSignInText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: '600',
      textAlign: "center",
  
    },
    headerContainer: { paddingVertical:12, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  
    backButtonContainer: { position: "absolute", left: 10, flexDirection: "row", alignItems: "center", },
    imageStyle: { width: 25, height: 25, tintColor: "#9c9c9c" },
  
  })
  