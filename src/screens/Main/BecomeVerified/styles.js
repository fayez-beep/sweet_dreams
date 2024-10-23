import {StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors, HP, WP, size , family} from '../../../utils';

const styles = StyleSheet.create({
heading:{
 
          alignSelf: 'flex-start',
          marginTop:15,
          fontSize: size.xsmall,
        //   fontWeight: '500',
          color: colors.skyBlue,
          fontFamily: family?.ArialCE,
          // marginTop:5
     
},
profileImage:{
    borderRadius: 10,
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    padding: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
},
TouchableOpacity:{
    borderRadius: 10,
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    padding: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  
    flexDirection: 'row',
},
ImageContainer: {
    width: 20,
    height: 20,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: colors.lightGray,
  },

});

export default styles;
