import {StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, HP, WP, size, family} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import {responsiveWidth} from 'react-native-responsive-dimensions';
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-end',
    zIndex: 1000,
    position: 'relative',
  },
  mainView: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    ...Shadows.shadow3,
    margin: 3,
    // height: '60%',
  },
  mainView2: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  txtStyle: {
    color: colors.black,
    fontSize: size.xxsmall,
    fontFamily: family?.ArialCE,
  },
  img: {
    width: 20,
    height: 20,
  },
  imgstyle2: {
    width: 10,
    height: 10,
    left: 5,
    alignSelf: 'center',
  },
  selectionBox: {
    backgroundColor: colors.white,
    borderWidth: 0,
    width: 150,
    // position:'relative',
  },
  selectionBox1: {
    backgroundColor: colors.white,
    borderWidth: 0,
    position: 'absolute',
    top: 35,
    zIndex: 100,
    left: 25,
    width: 300,
  },
  filter: {
    color: colors.black,
    fontSize: size.large,
    marginTop: 10,
    fontWeight: '600',
    // right: 10,
    fontFamily: family?.ScriptMTBold,
  },
  tchStyle: {
    left: responsiveWidth(18),
  },
  tooltipItems: {
    backgroundColor: colors.red,
    width: 120,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  toolTip: {
    ...Shadows.shadow5,
  },
  tooltipItems1: {
    borderTopLeftRadius: 10,
    backgroundColor: colors.white,
    width: 120,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: family?.ArialCE,
  },
  tooltipTitle: {
    color: colors.black,
    width: '75%',
    fontFamily: family?.ArialCE,
  },
  tooltipTitle1: {
    color: colors.white,
    width: '75%',
  },
  trash: {
    width: 15,
    height: 15,
    tintColor: colors.white,
    resizeMode: 'contain',
    width: '25%',
  },
  edit: {
    tintColor: colors.green,
    width: 18,
    height: 18,
    resizeMode: 'contain',
    width: '25%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 5,
  },
  scary: {
    backgroundColor: colors.l2,
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    bottom: 5,
  },
  feel: {
    backgroundColor: colors.lightBlue,
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    bottom: 8,
  },
  select: {
    color: colors.black,
    fontFamily: family?.ArialCE,
    fontSize: size.xsmall,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: size.small,
    marginTop: 5,
    color: 'black',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
  },
});

export default styles;
