import {StyleSheet} from 'react-native';
import {colors, family} from '../../../utils';
import appStyles from '../../appStyles';
import Shadows from '../../../helpers/Shadows';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  tabCus: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: colors?.off,
    padding: 0,
  },
  gendercolorafter: {
    color: colors.gray,
    position: 'absolute',
    left: 20,
    ...appStyles.font13,
  },
  EventType: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
  placeHolderText:{
    color:'black'
  },
  calenderIcon: {
    height: 20,
    width: 20,
  },
  dateBtn: {
    borderRadius: 30,
    // marginTop: 10,
    justifyContent: 'space-between',
    ...Shadows.shadow3,
    ...appStyles.directionRow,
    alignItems: 'center',
    borderColor: colors.primary,
    height: 45,
    width: 140,
    margin: 10,
    paddingHorizontal: 15,
  },
  gendercolor: {
    color: colors.gray,
    left: 20,
    ...appStyles.family_RedHatDisplay_Regular,
    ...appStyles.font13,
    position: 'absolute',
  },
  tabText: {
    fontFamily: family.RedHatDisplay_Bold,
    textAlign: 'center',
    borderRadius: 10,
  },
  tabbar: {backgroundColor: 'transparent'},
  customCard: {
    backgroundColor: colors?.secondary,
    marginRight: 3,
    marginLeft: 3,
  },
  filterContainer: {
    borderRadius: 20,
    padding: 15,

    ...appStyles.margin2Percent,
    ...Shadows.shadow5,
    backgroundColor: colors?.white,
  },
  city: {
    backgroundColor: colors.secondary,
    width: 160,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  inputContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  searchbox: {
    backgroundColor: colors?.primary,
    flex: 1,
  },
  customTextStyles: {
    backgroundColor: colors?.primary,
  },
});

export default styles;
