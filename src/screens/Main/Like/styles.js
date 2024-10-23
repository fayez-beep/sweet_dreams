import {StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';
import Shadows from '../../../helpers/Shadows';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  userImage: {
    marginHorizontal: 12,
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  mainView: {
    backgroundColor: colors.l2,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Shadows.shadow3,
    marginVertical: 10,
  },
  name: {
    alignSelf: 'center',
    fontFamily: family?.ArialCE,
    color: colors.black,
    fontSize: size.small,
  },
  tabBtn: {
    height: '100%',
    width: '14.2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
