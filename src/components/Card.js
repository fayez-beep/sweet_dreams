import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import NavService from '../helpers/NavService';
import Shadows from '../helpers/Shadows';
import {colors, HP, size, WP, family} from '../utils';
import {appIcons, appImages} from '../assets';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import ConfirmationModal from './ConfirmationModal';
import CustomText from './CustomText';
import Img from './Img';
import moment from 'moment';
import {ASSETS_URL} from '../config/WebService';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('screen');

const Card = ({
  curentFocus,
  selectedValue,
  handleRadioSelect = () => {},
  onPress = () => {},
  item,
  dots = true,
  imgAvailable = false,
  isJournal = false,
  noComment = false,
  reportTypeCallback = () => {},
  onReact = () => {},
  onEditDream = () => {},
  onDeleteDream = () => {},
  confirmationModalVisible,
  toggleVisibility = () => {},
  showPostDream = false,
  unsave = false,
  show,
  index,
  toggleShow,
  openToolTip,
  toggleToolTip,
}) => {
  const {user} = useSelector(state => state.authReducer);
  const [like, setLike] = useState('');
  // const [show, setShow] = useState(false);
  const [emoji, setEmoji] = useState(appIcons.hearteye);
  const {t} = useTranslation();
  var images = [
    {id: 'react1', img: appIcons.react1, title: 'No Way!'},
    {id: 'react2', img: appIcons.react2, title: 'Sad'},
    {id: 'react3', img: appIcons.react3, title: 'Ha Ha !'},
    {id: 'react4', img: appIcons.react5, title: 'Yay !!!'},
    {id: 'react5', img: appIcons.ohmy, title: 'Oh My !'},
    {id: 'react6', img: appIcons.react6, title: 'Confused'},
    {id: 'react7', img: appIcons.hearteye, title: 'Love'},
  ];
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  let data = [
    {label: `${t('str_Report')}`, value: '1', img: appIcons.info},
    {
      label: item?.isSave ? `${t('str_unsave')}` : `${t('str_Save')}`,
      value: '3',
      img: appIcons.bookmark,
    },
    // {label: `${t('str_edit')}`, value: '4', img: appIcons.edit},
    // {label: `${t('str_delete')}`, value: '5', img: appIcons.trash},
  ];
  if (item?.user?.id == user?.id) {
    data = [
      ...data,
      {
        label: `${item?.isHide === 1 ? t('str_UnHide') : t('str_Hide')}`,
        value: '2',
        img: appIcons.hide,
      },
      {label: `${t('str_edit')}`, value: '4', img: appIcons.edit},
      {label: `${t('str_delete')}`, value: '5', img: appIcons.trash},
    ];
  }
  if (showPostDream) {
    console.log({showPostDream});
    data.push({
      label: `${t('str_postdream')}`,
      value: '4',
      img: appIcons.uploadGray,
    });
  }
  const dataJournal = [
    {label: `${t('str_Post')}`, value: '1', img: appIcons.edit},
    {label: `${t('str_Remove')}`, value: '2', img: appIcons.trash},
  ];
  const [ModalOpen, setModalOpen] = useState(false);

  return (
    <View style={{position: 'relative'}}>
      {openToolTip === index && (
        <View
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            zIndex: 1000,
          }}>
          {isJournal
            ? dataJournal.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index + 1}
                    activeOpacity={0.9}
                    style={{
                      // padding: 5,
                      paddingHorizontal: 10,
                      width: '100%',
                      flexDirection: 'row',
                      borderTopColor: colors.gray,
                      borderTopWidth: 0.2,
                      borderColor: colors.gray,
                      borderWidth: 0.3,
                      alignItems: 'center',
                      backgroundColor:
                        index == 0 || index == 4 ? colors.white : colors.red,
                    }}
                    onPress={() => {
                      // setModalOpen(!ModalOpen);
                      toggleToolTip(null);
                      {
                        item?.label == `${t('str_Post')}`
                          ? Toast.show({
                              text1: t('str_Post_posted_successfully'),
                              type: 'success',
                              visibilityTime: 3000,
                            })
                          : Toast.show({
                              text1: t(`str_Post_removed_successfully`),
                              type: 'success',
                              visibilityTime: 3000,
                            });
                      }
                    }}>
                    <Image
                      source={item?.img}
                      resizeMode="contain"
                      style={{
                        width: 18,
                        height: 18,
                        tintColor: index == 0 ? colors.green : colors.white,
                      }}
                    />
                    <Text
                      style={{
                        paddingVertical: 10,
                        fontSize: size.xxsmall,
                        fontFamily: family?.ArialCE,
                        color: index == 0 ? colors.green : colors.white,
                        marginHorizontal: 10,
                      }}>
                      {item?.label}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index + 1}
                    activeOpacity={0.9}
                    style={{
                      borderColor: colors.gray,
                      borderWidth: 0.3,
                      paddingHorizontal: 10,
                      width: '100%',
                      flexDirection: 'row',
                      borderTopColor: colors.gray,
                      borderTopWidth: 0.2,
                      alignItems: 'center',
                      backgroundColor:
                        index == 0 || index == 4
                          ? colors.white
                          : index == 2 || index == 3
                          ? colors.lightGray
                          : colors.blue,
                    }}
                    onPress={() => {
                      toggleToolTip(null);

                      if (item.value === '4') {
                        setModalOpen(false);
                        onEditDream();
                        // console.log('4 pressed');
                        // Toast.show({
                        //   text1: t('str_post_dream_success'),
                        //   type: 'success',
                        //   visibilityTime: 3000,
                        // });
                        // NavService.navigate('UserAppStack', {
                        //   screen: 'Home',
                        // });
                        return;
                      } else if (item.value === '5') {
                        // setModalOpen(false);
                        onDeleteDream();
                        return;
                      }
                      reportTypeCallback(item);
                      setModalOpen(!ModalOpen);
                      setTimeout(() => {
                        curentFocus?.setState({confirmationModalVisible: true});
                      }, 350);
                      // {
                      //   item?.label == `${t('str_Hide')}`
                      //     ? Toast.show({
                      //       text1: t(`str_Your_post_has_been_Hidden`),
                      //       type: 'success',
                      //       visibilityTime: 3000,
                      //     })
                      //     : item?.label == `${t('str_Save')}`
                      //       ? Toast.show({
                      //         text1: t(`str_Post_saved_successfully`),
                      //         type: 'success',
                      //         visibilityTime: 3000,
                      //       })
                      //       : Toast.show({
                      //         text1: t(`str_Post_reported_successfully`),
                      //         type: 'success',
                      //         visibilityTime: 3000,
                      //       });
                      // }
                    }}>
                    <Image
                      source={item?.img}
                      resizeMode="contain"
                      style={{
                        width: 18,
                        height: 18,
                        tintColor:
                          index == 0 || index == 4
                            ? colors.red
                            : index == 2 || index == 3
                            ? colors.darkGray
                            : colors.white,
                      }}
                    />
                    <Text
                      style={{
                        paddingVertical: 10,
                        fontSize: size.xxsmall,
                        fontFamily: family?.ArialCE,

                        color:
                          index == 0 || index == 4
                            ? colors.red
                            : index == 2 || index == 3
                            ? colors.darkGray
                            : colors.white,
                        marginHorizontal: 10,
                      }}>
                      {item?.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
        </View>
      )}

      <View style={styles.card}>
        <View style={[styles.header]}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  if (item?.user_id === user?.user_id) {
                    NavService.navigate('Profile', {screen: 'Profile'});
                  } else {
                    NavService.navigate('ProfileHost', item);
                  }
                }}>
                <Img
                  src={
                    item?.user?.profile_image &&
                    item?.post_type !== 'Anonymous' &&
                    item?.post_type !== 'Anónima'
                      ? item?.user?.profile_image
                      : appIcons.userPlaceholder
                  }
                  local={
                    item?.user?.profile_image &&
                    item?.post_type !== 'Anonymous' &&
                    item?.post_type !== 'Anónima'
                      ? false
                      : true
                  }
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginRight: 50,
                  }}>
                  <Text style={styles.name}>
                    {item?.post_type === 'Anonymous' ||
                    item?.post_type === 'Anónima'
                      ? t('str_Anonymous')
                      : item?.user?.full_name}
                  </Text>
                  <Text style={styles.time}>
                    {moment(item?.created_at).format('hh:mm A DD MMM, YYYY')}{' '}
                  </Text>
                  {!isJournal && (
                    <Image
                      source={
                        item?.dream_type === 'day'
                          ? appIcons.borderSun
                          : appIcons.halfmoon
                      }
                      style={styles.moonIcon}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.post,
                    {
                      color: colors.black,
                      fontSize: size.tiny,
                      marginTop: 6,
                      marginBottom: 4,
                    },
                  ]}
                  numberOfLines={2}>
                  {item?.title}
                </Text>
              </View>
            </View>
            <Text
              style={[styles.post, {width: '100%'}]}
              // numberOfLines={2}
              ellipsizeMode="tail">
              {/* <Text
                style={{
                  color: colors.blue,
                  fontSize: size.xxsmall,
                  fontWeight: '300',
                  fontFamily: family?.ArialCE,
                }}>
                @{item?.user?.full_name}{' '}
              </Text> */}
              <CustomText
                intialLength={40}
                style={[styles.post, {fontSize: size.small, width: '100%'}]}
                expandable
                text={item?.description}
              />

              <Text style={{color: colors.primary, fontSize: size.xxsmall}}>
                {' '}
                {item?.topic}, {item?.feeling}
              </Text>
            </Text>
          </View>
          {dots ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                // setModalOpen(!ModalOpen);
                // console.warn(ModalOpen);
                toggleToolTip(index);
              }}>
              <Image source={appIcons.dots} style={styles.dot} />
            </TouchableOpacity>
          ) : null}
        </View>
        {item?.image ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              console.log('pressed');
              toggleShow(null);
              toggleToolTip(null);
              NavService.navigate('PostDream', {
                showName: t('str_postdream'),
                item,
              });
            }}
            style={{
              flex: 1,
              marginTop: 10,
              zIndex: 0,
            }}>
            <Image
              source={{uri: ASSETS_URL + item?.image}}
              style={styles.postImage}
              // resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <View style={{marginTop: 30}} />
        )}
        {show === index && (
          <View
            style={{
              position: 'absolute',
              bottom: 45,
              left: 0,
              right: 0,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.apple,
                height: HP('8%'),
                // width: WP('88%'),
                alignSelf: 'center',
                borderRadius: 50,
                marginTop: 5,
                flexDirection: 'row',
                paddingHorizontal: 10,
              }}>
              {images?.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index + 1}
                    style={{
                      justifyContent: 'center',
                      paddingHorizontal: 0,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      toggleShow(null);
                      // setEmoji(value?.img);
                      onReact(value);
                      // setShow(!show);
                    }}>
                    <Image
                      source={value?.img}
                      style={{
                        width: 35,
                        height: 35,
                        marginHorizontal: 3,
                      }}
                      resizeMode={'contain'}
                    />
                    <Text
                      style={{
                        fontSize: width < 400 ? size.xxxxtiny : size.xxtiny,
                        color: colors.black,
                      }}>
                      {value.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <View style={styles.footer}>
          <TouchableOpacity
            onLongPress={() => {
              toggleShow(index);
              // setShow(true)
            }}
            onPress={() => {
              toggleShow(null);
              toggleToolTip(null);
              NavService.navigate('Like', {item});
            }}
            activeOpacity={0.9}
            style={{
              marginHorizontal: 6,
              backgroundColor: colors.lightpink,
              flexDirection: 'row',
              borderRadius: 15,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}>
            <Image
              source={emoji}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
                // marginTop: 3,
              }}
            />
            <Image
              source={appIcons.react1}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
                marginLeft: -1.5,
              }}
            />
            <Image
              source={appIcons.react2}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
                marginLeft: -1.5,
              }}
            />
            <Text style={[styles.likes, {marginTop: 4, marginLeft: 5}]}>
              {!like ? item?.likes_count : item?.likes_count + 1}{' '}
              {t('str_reactions')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              backgroundColor: colors.lightBlue,
              paddingHorizontal: 9,
              paddingVertical: 4,
              alignItems: 'center',
              borderRadius: 15,
              alignContent: 'center',
            }}
            onPress={() => {
              toggleShow(null);
              toggleToolTip(null);
              noComment ? '' : NavService.navigate('Comment', {item});
            }}>
            <Image
              source={appIcons.comment}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
                // marginLeft: 20,
              }}
            />
            <Text style={[styles.likes]}>
              {item?.comments_count} {t('str_comments')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderColor: colors.lightGray,
          borderBottomWidth: 1,
          marginHorizontal: 30,
          marginTop: 20,
          marginBottom: 20,
        }}
      />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    ...Shadows.shadow3,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    margin: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  textContainer: {
    justifyContent: 'center',
    marginTop: 4,
  },
  time: {
    fontSize: size.xtiny,
    color: colors.gray,
    marginTop: 2,
    fontFamily: family?.ArialCE,
  },
  name: {
    fontSize: size.small,
    // fontWeight: '600',
    marginHorizontal: 10,
    color: colors.black,
    fontFamily: family?.ArialCE,
  },
  dot: {
    width: 15,
    height: 18,
    resizeMode: 'contain',
    tint: colors.black,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    paddingTop: 10,
  },
  videoStyle: {
    width: '100%',
    height: 200,
    backgroundColor: colors.gray,
  },
  likes: {
    marginLeft: 10,
    fontSize: size.xtiny,
    color: colors.gray,
    fontFamily: family?.ArialCE,
  },
  post: {
    width: WP('60%'),
    marginHorizontal: 10,
    flex: 1,
    fontSize: size.xxtiny,
    // fontWeight: '300',
    color: colors.black,
    justifyContent: 'center',
    fontFamily: family?.ArialCE,
  },
  menu: {
    backgroundColor: colors.gray,
    width: width * 0.25,
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: 'absolute',
    right: 11,
    top: 15,
    alignItems: 'center',
    zIndex: 1000,
  },
  menuText: {
    fontSize: size.xxtiny,
    color: colors.black,
    // fontWeight: '300',
    lineHeight: 20,
    fontFamily: family?.ArialCE,
  },
  postImage: {
    width: WP('80%'),
    height: HP('18%'),
    borderRadius: 30,
    zIndex: 0,
  },
  moonIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
});
