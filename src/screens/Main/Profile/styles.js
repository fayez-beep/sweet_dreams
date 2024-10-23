import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, HP, WP, size, family} from '../../../utils';

const styles = StyleSheet.create({
  txt: {
    color: colors.primary,
    fontSize: size.xlarge,
    fontFamily: family?.ArialCE,
  },
  txtHeading: {
    fontSize: size.normal,
    color: colors.darkGray,
    fontFamily: family?.ArialCE,
  },
  TopContainer: {flexDirection: 'row', marginTop: 20},
  detail: {marginHorizontal: 20, marginTop: 5},
  name: {
    // fontWeight: '600',
    fontSize: size.large,
    color: colors.black,
    marginTop: 5,

    fontFamily: family?.ArialCE,
  },
  age: {
    color: colors.blue,
    fontSize: size.small,
    fontFamily: family?.ArialCE,
  },
  ageNumber: {
    color: colors.darkGray,
    fontSize: size.small,
    fontFamily: family?.ArialCE,
  },
  des: {
    color: colors.gray,
    fontSize: size.xxsmall,
    marginTop: 5,

    fontFamily: family?.ArialCE,
  },
  profileBio: {
    color: colors.gray,
    fontSize: size.xxsmall,
    marginTop: 5,
    fontFamily: family?.ArialCE,
    marginHorizontal: 25,
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
  },
  dreamtxt: {
    fontSize: size.xxlarge,
    // fontWeight: '500',
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  txtJournal: {
    textDecorationLine: 'underline',
    color: colors.primary,
    fontSize: size.tiny,
    // fontWeight: '600',
    fontFamily: family?.ArialCE,
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
});

export default styles;
