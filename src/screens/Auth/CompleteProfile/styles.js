import {StyleSheet, Dimensions} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';
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
  },
  textNormal: {
    marginVertical: 20,
  },
  applogo: {
    width: width * 0.91,
    height: height * 0.22,
    resizeMode: 'contain',
    marginVertical: '12%',
  },
  logoStyle: {
    position: 'relative',
  },
  upload: {
    position: 'absolute',
    bottom: '16%',
    zIndex: 20,
    right: '28%',
  },
  lang: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '500',
    color: colors.skyBlue,
    marginTop: 10,
    marginLeft: 8,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  cloudTitle: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: size.small,
    fontFamily: family?.ArialCE,
  },
  cloudText: {
    color: colors.darkGray,
    fontSize: size.tiny,
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: family?.ArialCE,
  },
  inputContianer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default styles;
