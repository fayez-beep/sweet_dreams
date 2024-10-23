import {Dimensions, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, HP, WP, size, family} from '../../../utils';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  textContainer: {
    height: 55,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 30,
    ...Shadows.shadow3,
    // paddingBottom: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  attachment: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  txtInput: {
    flex: 1,
    height: '100%',
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  clip: {tintColor: colors.timerColor, width: 25, height: 25},
  send: {width: 40, height: 40},
  listContainer: {marginBottom: 15, marginTop: 5},
  userImage: {
    borderWidth: 0,

    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 25,
  },
  listCard: {
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 15,
    width: width - 160,
    padding: 15,
    // ...Shadows.shadow3,
  },
  ImageUpload: {height: WP('40%'), width: WP('50%')},
  messagetxt: {fontSize: 12, marginTop: 5},
  timeContainer: {
    marginBottom: 10,

    alignItems: 'center',

    position: 'absolute',
  },
});

export default styles;
