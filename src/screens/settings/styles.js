import {StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  switchButton: {
    marginVertical: 25,
    // marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 14,
  },
  switchText: {
    fontSize: size.small,
    fontWeight: '600',
    color: colors.darkGray,
    fontFamily: family?.ArialCE,
  },
  button: {height: 62},
  txt: {fontSize: size.normal},
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: size.small,
    fontWeight: '600',
    color: colors.white,
    fontFamily: family?.ArialCE,
  },
});

export default styles;
