import {StyleSheet, Dimensions} from 'react-native';
import {colors, HP, WP, size, family} from '../../utils';
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
    marginTop: 10,
  },
  subText: {
    fontSize: size.small,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: 20,
  },
  textNormal: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.black,
  },
  textNormalWithColor: {
    color: colors.skyBlue,
    textDecorationColor: colors.skyBlue,
    fontSize: 17,
    fontWeight: '500',
  },
  applogo: {
    width: width * 0.91,
    height: height * 0.22,
    resizeMode: 'contain',
    // marginVertical:"12%"
    marginVertical: 5,
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

export default styles;
