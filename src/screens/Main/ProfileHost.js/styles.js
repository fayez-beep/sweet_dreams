import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, HP, WP, size, family} from '../../../utils';

const styles = StyleSheet.create({
  txt: {
    color: colors.primary,
    fontSize: size.h4,
    fontFamily: family?.ArialCE,
  },
  txtHeading: {
    fontSize: size.large,
    color: colors.darkGray,
    fontFamily: family?.ArialCE,
  },
  TopContainer: {flexDirection: 'row', marginTop: 20},
  detail: {marginHorizontal: 10, marginTop: 10},
  name: {
    // fontWeight: '600',
    fontSize: size.large,
    color: colors.black,
  },
  age: {color: colors.blue, fontSize: size.small, fontFamily: family?.ArialCE},
  ageNumber: {
    color: colors.darkGray,
    fontSize: size.small,
    marginLeft:4,
    fontFamily: family?.ArialCE,
  },
  des: {
    color: colors.gray,
    fontSize: size.xxsmall,
    fontFamily: family?.ArialCE,
  },
  profileBio: {
    color: colors.gray,
    fontSize: size.xxsmall,
    marginTop: 5,
    fontFamily: family?.ArialCE,
    marginHorizontal: 20,
  },
  btn: {width: WP('40%'), marginHorizontal: -10},
  hr: {
    marginVertical: 20,
    borderTopColor: colors.lightGray,
    width: WP('100%'),
    borderTopWidth: 6,
  },
  hrMid: {
    borderRightColor: colors.lightPrimary,
    height: HP('6%'),
    borderRightWidth: 5,
  },
  dreamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  dreamtxt: {
    fontSize: size.xxlarge,
    // fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
    fontFamily: family?.ArialCE,
  },
  txtJournal: {
    textDecorationLine: 'underline',
    color: colors.primary,
    fontSize: size.tiny,
    // fontWeight: '600',
    fontFamily: family?.ArialCE,
  },
  check: {
    width: 12,
    height: 12,
  },
  checkCard: {
    backgroundColor: colors.white,
    width: 25,
    height: 25,
    alignContent: 'center',
    alignSelf: 'center',
    bottom: '70%',
    borderRadius: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
