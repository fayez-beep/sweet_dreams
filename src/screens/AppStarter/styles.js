import {StyleSheet, Dimensions} from 'react-native';
import {colors, HP, WP, size, family} from '../../utils';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginBottom: 40,
    marginTop: 10,
  },
  textNormalWithColor: {
    color: colors.skyBlue,
    textDecorationColor: colors.skyBlue,
    fontSize: size.medium,

    fontFamily: family?.ArialCE,
  },
  textNormal: {
    fontSize: size.normal,
    // fontWeight: '300',
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  heading: {
    fontSize: size.h6,
    fontFamily: family.ArialCE,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: WP('90%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    height: 60,
    justifyContent: 'center',
  },
  buttonInnerImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.white,
    position: 'absolute',
    left: width / 8,
  },
  buttonInnerText: {
    // fontWeight: 'bold',
    fontSize: size.small,
    fontFamily: family.ArialCE,
    color: colors.white,
    position: 'absolute',
    left: width / 4,
  },
  applogo: {
    width: width * 0.91,
    height: height * 0.22,
    resizeMode: 'contain',
  },
  space: {
    paddingVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 5,
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
  termsLink: {
    textAlign: 'center',
    marginTop: 12,
    color: '#0047BA',
    textDecorationLine: 'underline',
    fontSize: size.tiny,
    fontFamily: family.ArialCE,
  },
  privacyLink: {
    textAlign: 'center',
    color: '#0047BA',
    marginTop: 12,
    textDecorationLine: 'underline',
    fontSize: size.tiny,
    fontFamily: family.ArialCE,
  },
});

export default style;
