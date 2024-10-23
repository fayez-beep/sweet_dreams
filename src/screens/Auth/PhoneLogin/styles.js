import {StyleSheet,Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
import { family } from '../../../utils';

const {width,height} = Dimensions.get('window');
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
    // fontWeight: 'bold',
    color: colors.black,
    marginVertical: 20,
    fontFamily: family?.ArialCE,
  },
  textNormal: {
    fontSize: size.normal,
    // fontWeight: '300',
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  textNormalWithColor: {
    color: colors.skyBlue,
    textDecorationColor: colors.skyBlue,
    fontSize: size.medium,

    fontFamily: family?.ArialCE,
  },
  applogo: {
    width: width * 0.91,
    height: height * 0.22,
    resizeMode: 'contain',
    // marginVertical:"12%"
    marginVertical: 5,
  },
  phoneContainer: {
    width:  WP('83%'),
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 5,
  },
  textContainerPhone:{
    backgroundColor: 'transparent',
  }
});

export default styles;
