import { StyleSheet, Dimensions } from 'react-native';
import Shadows from '../../../helpers/Shadows';
import { colors, HP, WP, size } from '../../../utils';
import { family } from '../../../utils';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
    
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop:20
  },
  applogo: {
    width: width * 0.91,
    height: height * 0.22,
    resizeMode: 'contain',
    // marginVertical: '12%',
  },
  underlineStyleBase: {
    width: 47,
    height: 47,
    // borderWidth: 0,
    borderRadius: 100,
    // borderColor: '#ffffff',
    // borderWidth: 2,
    color: colors.skyBlue,
    fontSize: 17,
    backgroundColor: colors.white,
    ...Shadows.shadow3
  },
  textNormal: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  textNormalWithColor: {
    color: colors.primary,
    textDecorationColor: colors.primary,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: family?.ArialCE,
  },
  otpInput: {
    width: '80%',
    height: 20,
    alignSelf: 'center',
    marginVertical: 40,
    fontFamily: family?.ArialCE,
    

  },
  timerContainer:{
    alignItems: "center",
},
  timerText: {
    // alignSelf: 'flex-end',
    color: colors.black,
    fontSize: 15,
    marginBottom: 10,
    // marginRight: 27,
   
    marginTop:10,
    fontFamily: family?.ArialCE,
  
  },
  clock:{
    width:50,
    height:50,

  }
});

export default styles;
