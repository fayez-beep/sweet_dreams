import {StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
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
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
});

export default styles;
