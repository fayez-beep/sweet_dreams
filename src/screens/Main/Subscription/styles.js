import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, HP, WP, size, family} from '../../../utils';

const styles = StyleSheet.create({
  image: {
    height: 260,
    width: '100%',
    justifyContent: 'center',
  },
  cloudTitle: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: family?.ArialCE,
    fontSize: size.xsmall,
    marginBottom: 15,
  },
  cloudText: {
    color: colors.white,
    fontSize: size.tiny,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: family?.ArialCE,
  },
  pricetxt: {
    color: colors.black,
    paddingHorizontal: 20,
    fontSize: size.small,
    fontFamily: family?.ArialCE,
  },
  bottomButton: {
    position: 'relative',
    bottom: '26%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 30,
  },
  cloudCard: {
    marginHorizontal: 40,
  },
  flex: {flex: 0.5},
});

export default styles;
