import {StyleSheet, Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
import {family} from '../../../utils';
import {responsiveWidth} from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');
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
    marginTop: 30,
  },
  subText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginVertical: 20,
  },
  textNormal: {
    fontSize: size.small,
    fontWeight: '400',
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  textNormalWithColor: {
    color: colors.skyBlue,
    textDecorationColor: colors.skyBlue,
    fontSize: size.small,
    fontWeight: '500',
    fontFamily: family?.ArialCE,
  },
  applogo: {
    width: width * 0.91,
    height: height * 0.19,
    resizeMode: 'contain',
    // marginVertical:"12%"
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'flex-start',
    marginLeft: responsiveWidth(2.5),
  },
  CheckBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  bottomHalf: {
    alignSelf: 'center',
    marginTop: '40%',
  },
  bottomText: {
    color: colors.black,
    fontWeight: '400',
    fontFamily: family.ArialCE,
  },
});

export default styles;
