import {Dimensions, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../utils';
const {width, height} = Dimensions.get('screen');
const appStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  directionRow: {
    flexDirection: 'row',
  },
  directionColumn: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignSelf: {
    alignSelf: 'center',
  },
  borderWidth: {
    borderWidth: 1,
  },
  borderBottom_1: {
    borderBottomWidth: 1,
  },
  borderBottomColor: {
    borderBottomColor: colors.skyBlue,
  },
  gap_5: {
    gap: 5,
  },
  gap_8: {
    gap: 10,
  },
  gap_10: {
    gap: 10,
  },
  gap_15: {
    gap: 15,
  },
  hD100: {
    height: height,
  },
  wD100: {
    width: width,
  },
  w100: {
    width: '100%',
  },
  w_100: {
    width: WP('100%'),
  },
  w_95: {
    width: WP('95%'),
  },
  w_90: {
    width: WP('90%'),
  },
  w_85: {
    width: WP('85%'),
  },
  w_80: {
    width: WP('80%'),
  },
  w_70: {
    width: WP('70%'),
  },
  w_60: {
    width: WP('60%'),
  },
  w_50: {
    width: WP('50%'),
  },
  w_42: {
    width: WP('42%'),
  },
  w_40: {
    width: WP('40%'),
  },
  w_35: {
    width: WP('35%'),
  },
  w_28: {
    width: WP('28%'),
  },
  w_25: {
    width: WP('25%'),
  },
  w_22: {
    width: WP('22%'),
  },
  margin1Percent: {
    marginTop: HP('1%'),
  },
  margin2Percent: {
    marginTop: HP('2%'),
  },
  margin3Percent: {
    marginTop: HP('3%'),
  },
  margin4Percent: {
    marginTop: HP('4%'),
  },
  margin5Percent: {
    marginTop: HP('5%'),
  },
  margin6Percent: {
    marginTop: HP('10%'),
  },
  fontBold: {
    fontWeight: 'bold',
  },
  seperator: {
    marginVertical: HP('1%'),
  },
  paddingVertical_1: {
    paddingVertical: HP('1%'),
  },
  paddingVertical_5: {
    paddingVertical: HP('1.5%'),
  },
  paddingVertical_2: {
    paddingVertical: HP('2%'),
  },
  paddingVertical_3: {
    paddingVertical: HP('3%'),
  },
  paddingVertical_4: {
    paddingVertical: HP('4%'),
  },
  paddingHorizontal_1: {
    paddingVertical: HP('1%'),
  },
  font9: {
    fontSize: size.xxxtiny,
  },
  font10: {
    fontSize: size.xxtiny,
  },
  font11: {
    fontSize: size.xtiny,
  },
  font12: {
    fontSize: size.tiny,
  },
  font13: {
    fontSize: size.xxsmall,
  },
  font14: {
    fontSize: size.xsmall,
  },
  font15: {
    fontSize: size.small,
  },
  font16: {
    fontSize: size.normal,
  },
  font17: {
    fontSize: size.medium,
  },
  font18: {
    fontSize: size.large,
  },
  font19: {
    fontSize: size.xlarge,
  },
  font20: {
    fontSize: size.xxlarge,
  },
  font22: {
    fontSize: size.h6,
  },
  font24: {
    fontSize: size.h5,
  },
  font25: {
    fontSize: size.h4,
  },
  font26: {
    fontSize: size.h3,
  },
  font28: {
    fontSize: size.h2,
  },
  font30: {
    fontSize: size.h1,
  },
  font32: {
    fontSize: size.title,
  },
  font34: {
    fontSize: size.xtitle,
  },
  font36: {
    fontSize: size.xxtitle,
  },
  font38: {
    fontSize: size.xxxtitle,
  },
  font50: {
    fontSize: size.huge,
  },
  colorPrimary: {
    color: colors.primary,
  },
  colorSecondary: {
    color: colors.secondary,
  },
  //EDIT
  DetailView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  userdetails: {
    marginTop: 10,
    alignItems: 'center',
  },

  //Font Family

  RedHatDisplayBlack: {
    fontFamily: family.RedHatDisplay_Black,
  },

  family_RedHatDisplay_Bold: {
    fontFamily: family.RedHatDisplay_Bold,
  },

  family_RedHatDisplay_BoldItalic: {
    fontFamily: family.RedHatDisplay_BoldItalic,
  },

  family_RedHatDisplay_ExtraBold: {
    fontFamily: family.RedHatDisplay_ExtraBold,
  },

  family_RedHatDisplay_ExtraBoldItalic: {
    fontFamily: family.RedHatDisplay_ExtraBoldItalic,
  },

  family_RedHatDisplay_Italic: {
    fontFamily: family.RedHatDisplay_Italic,
  },

  family_RedHatDisplay_Light: {
    fontFamily: family.RedHatDisplay_Light,
  },

  family_RedHatDisplay_LightItalic: {
    fontFamily: family.RedHatDisplay_LightItalic,
  },

  family_RedHatDisplay_Medium: {
    fontFamily: family.RedHatDisplay_Medium,
  },

  family_RedHatDisplay_MediumItalic: {
    fontFamily: family.RedHatDisplay_MediumItalic,
  },

  family_RedHatDisplay_Regular: {
    fontFamily: family.RedHatDisplay_Regular,
  },

  family_RedHatDisplay_SemiBold: {
    fontFamily: family.RedHatDisplay_SemiBold,
  },

  family_SemiBoldItalic: {
    fontFamily: family.SemiBoldItalic,
  },

  // FLATLIST ITEM SEPERATOR
  lineSeperator: {
    height: 1,
    bordorBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
});
export default appStyles;
