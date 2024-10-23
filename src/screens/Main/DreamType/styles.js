import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Shadows from '../../../helpers/Shadows';
import {colors, HP, WP, size, family} from '../../../utils';

const styles = StyleSheet.create({
  background: {
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardSelector: {
    width: WP('90%'),
    height: HP('25%'),
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 40,
    ...Shadows.shadow0,
    paddingHorizontal: 30,
    marginVertical: 20,
    borderWidth: 2,
  },
  newsun: {
    width: WP('35%'),
    height: HP('100%'),
  },
  card: {
    width: WP('37%'),
    height: HP('16%'),
  },
  cards: {
    width: WP('37%'),
    height: HP('12%'),
  },
  txt: {
    fontSize: size.h5,
    // fontWeight: '700',
    color: colors.primary,
    fontFamily: family?.ArialCE,
  },
});

export default styles;
