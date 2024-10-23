import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, HP, WP, size, family} from '../../../utils';

const styles = StyleSheet.create({
  container: {alignItems: 'center', alignSelf: 'center', marginTop: 50},
  InputCard: {
    marginHorizontal: 40,
  },
  lang: {
    alignSelf: 'flex-start',
    fontSize: size.xsmall,
    fontWeight: '500',
    color: colors.skyBlue,
    marginTop: 10,
    marginLeft:8,
    fontFamily: family?.ArialCE,
  },
  edit: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  editCrad: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: colors.primary,
    left: 90,
    bottom: 15,
    // right: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
