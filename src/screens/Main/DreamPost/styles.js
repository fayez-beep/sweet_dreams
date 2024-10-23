import {Platform, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, HP, WP, size , family} from '../../../utils';

const styles = StyleSheet.create({
  TextStyle: {
    color: colors.darkGray,
    marginTop: 15,
    fontFamily: family?.ArialCE,
  },
  cloudTitle: {
    color: colors.red,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 19,
    marginBottom: 20,
    fontFamily: family?.ArialCE,
  },
  cloudText: {
    color: colors.darkGray,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 22,
    fontFamily: family?.ArialCE,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    height: HP('41%'),
    marginHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    zIndex: 1000,
    position: 'relative',
    alignContent: 'flex-end',
    // justifyContent:'space-between'
  },
  topProfileDetail: {
    flexDirection: 'column',
    marginTop: 10,
  },
  textDetail: {
    color: colors.darkGray,
    fontSize: size.xxsmall,
    marginHorizontal: 4,
    fontFamily: family?.ArialCE,
  },
  textDetailMention: {
    color: colors.blue,
    fontSize: size.tiny,
    fontFamily: family?.ArialCE,
  },
  textInputCard: {
    marginHorizontal: 5,
    flex: 1,
    overflow: 'hidden',
    fontFamily: family?.ArialCE,
  },
  bottomTextCard: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    position: 'relative',
  },
  ImageContainer: {
    width: 20,
    height: 20,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: colors.lightGray,
  },
  ImageSelectorContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  textTopicContainer: {
    marginHorizontal: 5,
    marginTop: 15,
  },
  TopicCard: {
    marginVertical: 10,
    marginHorizontal: 5,
    // width: WP('27%'),
    padding: 13,
    borderRadius: 5,
  },
  FeelingText: {
    marginHorizontal: 20,
    fontSize: size.large,
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  TypeCard: {
    marginVertical: 10,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
    // padding: 13,
    paddingVertical: 10,
    width: 95,
    borderRadius: 25,
    borderWidth: 1,
    // paddingHorizontal:4
  },
  PublicCard: {
    marginHorizontal: 40,

    alignContent: 'center',
  },

  ModalButton1: {
    position: 'relative',
    bottom: '42%',
  },
  FollowersCard: {flex: 1, }, 
  FollowersCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    // marginVertical: 15,
 
  },
  anomysCard: {
    flex: 1,
    position: 'relative',
  },
  anomysHeader: {
    marginHorizontal: 40,

    alignContent: 'center',
  },
  anomysTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeAnnomys: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
  AnnymsButton: {
    position: 'relative',
    bottom: '39%',
  },
  ButtonStyle1: {
    borderRadius: 100,
    width: '80%',
  },
  InviteCard: {
    // position: 'relative',
    // bottom: '20%',
  },
 
  ContainerStyle: {
    width: '100%',
    color: colors.black,
    padding: Platform.OS == 'ios' ? 16 : 0,
    paddingHorizontal: Platform.OS == 'ios' ? 12 : 10,
    borderRadius: 30,
    backgroundColor: colors.textColor,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
});

export default styles;
