import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {colors, size, family} from '../../../utils';
import {appIcons} from '../../../assets';
import {
  feelingName,
  nightDreamTopicName,
  TopicName,
} from '../../../utils/dummyData';
import PostDreamCard from '../../../components/PostDreamCard';
import CustomGradientButton from '../../../components/CustomGradientButton';
import ImagePicker from '../../../components/ImagePicker';
import PostSelector from '../../../components/PostSelector';
import NavService from '../../../helpers/NavService';
import Modal from 'react-native-modal';
import CustomTextInput from '../../../components/CustomTextInput';
import {postDream, editPost} from '../../../redux/actions/appAction';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ASSETS_URL} from '../../../config/WebService';
class DreamPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextValue: this.props.route.params.description
        ? this.props.route.params.description
        : '',
      TextCount: '',
      profileImage: null,
      isModalVisible: false,
      typeSelected: '',
      showItem: this.props.route.params.post_type
        ? this.props.route.params.post_type
        : this?.props?.t('str_Public'),
      title: this.props.route.params.title ? this.props.route.params.title : '',
      feeling: this.props.route.params.feeling
        ? this.props.route.params.feeling
        : this?.props?.t(`${feelingName[0].feeling}`),
      topic: this.props.route.params.topic
        ? this.props.route.params.topic
        : this.props.route.params.dreamType === 'day'
        ? this?.props?.t(`${TopicName[0].topic}`)
        : this?.props?.t(`${nightDreamTopicName[0].topic}`),
      image: this.props.route.params.image,
    };
  }

  GetValueFunction = ValueHolder => {
    const wordCount = ValueHolder.length;
    this.setState({
      TextValue: ValueHolder,
      TextCount: wordCount,
    });
  };
  handleTitle = value => {
    this.setState({
      title: value,
    });
  };

  // toggleModal = () => {
  //   // const isModalVisible  = this.state;
  //   // this.setState({ isModalVisible:true })
  //   // if(sele)
  //   if (this.state.showItem === t('str_Journal')) {
  //   }
  //   console.log({showItem: this.state.showItem});
  //   this.setState(previousState => ({
  //     isModalVisible: !previousState.isModalVisible,
  //   }));
  // };

  render() {
    const {
      TextValue,
      profileImage,
      isModalVisible,
      showItem,
      typeSelected,
      TextCount,
      inputEnabled,
      title,
      topic,
      feeling,
      image,
    } = this.state;
    const {t, user} = this?.props;
    const updateImageInGallery = (path, mime, type) => {
      this.setState({profileImage: {path, mime, type}});
    };
    const {dreamType, type, id} = this.props.route.params;
    const topics = dreamType === 'day' ? TopicName : nightDreamTopicName;

    const postHandler = () => {
      if (!title) {
        Toast.show({
          text1: t('str_Write_Post_Title'),
          type: 'error',
          visibilityTime: 5000,
        });
      } else if (!TextValue) {
        Toast.show({
          text1: t('str_Write_Post_Description'),
          type: 'error',
          visibilityTime: 5000,
        });
      } else if (!profileImage && type !== 'edit') {
        Toast.show({
          text1: t('str_Write_Post_Image'),
          type: 'error',
          visibilityTime: 5000,
        });
      } else {
        const form = new FormData();
        form.append('dream_type', dreamType);
        form.append('title', title);
        form.append('description', TextValue);
        form.append('post_type', showItem);
        form.append('topic', topic);
        form.append('feeling', feeling);
        if (id) {
          form.append('post_id', id);
        }
        if (profileImage) {
          form.append('image', {
            uri: profileImage?.path,
            name: `Profile${Date.now()}.${profileImage?.mime.slice(
              profileImage?.path.lastIndexOf('/') + 1,
            )}`,
            type: profileImage?.mime,
          });
        }
        if (type === 'edit') {
          this.props.editPost(form, responseCallback => {
            console.log('edit dream response: ', responseCallback);
            toggleModal();
          });
        } else {
          this.props.postDream(form, responseCallback => {
            console.log('post dream response: ', responseCallback);
            toggleModal();
          });
        }
      }
    };
    const toggleModal = () => {
      // const isModalVisible  = this.state;
      // this.setState({ isModalVisible:true })
      // if(sele)
      if (this.state.showItem === t('str_Journal')) {
        this.setState({isModalVisible: false});
        NavService.navigate('UserAppStack');
      }
      console.log({showItem: this.state.showItem});
      this.setState(previousState => ({
        isModalVisible: !previousState.isModalVisible,
      }));
    };

    return (
      <AppBackground
        title={type === 'edit' ? t('str_editdream') : t('str_postdream')}
        back={true}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.card}>
              <Image
                source={
                  user?.profile_image
                    ? {uri: ASSETS_URL + user?.profile_image}
                    : appIcons.userPlaceholder
                }
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  resizeMode: 'cover',
                }}
              />
              <View style={styles.topProfileDetail}>
                <Text style={styles.textDetail}>
                  {t('str_Share_your_Dream')}
                </Text>
                <Text style={styles.textDetailMention}>
                  {' '}
                  {t('str_@Mention_the_person')}
                </Text>
              </View>
              <PostSelector
                setshowItem={item => {
                  console.log({item});
                  this.setState({showItem: item});
                }}
                showItem={showItem}
              />
            </View>
            <View style={styles.textInputCard}>
              <TextInput
                // textAlignVertical="top"
                onChangeText={txt => this.handleTitle(txt)}
                style={{
                  marginHorizontal: 5,
                  color: colors.black,
                  fontWeight: 'bold',
                }}
                placeholderTextColor={colors.darkGray}
                placeholder={t('str_enter_title')}
                value={title}
                maxLength={30}
              />
              <View
                style={{
                  height: 0.2,
                  width: '100%',
                  backgroundColor: 'grey',
                  marginVertical: Platform.OS === 'ios' ? 4 : 0,
                }}
              />
              <TextInput
                value={TextValue}
                textAlignVertical="top"
                onChangeText={ValueHolder => this.GetValueFunction(ValueHolder)}
                style={{
                  marginHorizontal: 5,
                  color: colors.black,
                  flex: 1,
                  // backgroundColor:'red'
                }}
                multiline={true}
                placeholderTextColor={colors.darkGray}
                placeholder={t('str_desc')}
                maxLength={1000}
              />
            </View>
            {profileImage !== null ? (
              <View style={styles.bottomTextCard}>
                <TouchableOpacity
                  style={styles.ImageContainer}
                  onPress={() => this.setState({profileImage: null})}>
                  <Image
                    resizeMode="cover"
                    style={{width: 8, height: 8}}
                    source={appIcons.close}
                  />
                </TouchableOpacity>
                <Image
                  resizeMode="cover"
                  style={{width: 60, height: 60}}
                  source={{uri: profileImage.path}}
                />
              </View>
            ) : image ? (
              <View style={styles.bottomTextCard}>
                <Image
                  resizeMode="cover"
                  style={{width: 60, height: 60}}
                  source={{uri: ASSETS_URL + image}}
                />
              </View>
            ) : null}
            <View style={styles.ImageSelectorContainer}>
              <Text style={styles.TextStyle}>
                {TextCount ? TextCount : 0} <Text>/1000</Text>
              </Text>
              <TouchableOpacity>
                <ImagePicker
                  onImageChange={(path, mime, type) => {
                    updateImageInGallery(path, mime, type);
                  }}>
                  <Image
                    source={appIcons.gallery}
                    style={{width: 34, height: 34}}
                  />
                </ImagePicker>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textTopicContainer}>
            <Text
              style={{
                marginHorizontal: 20,
                fontSize: size.large,
                color: colors.black,
                fontFamily: family?.ArialCE,
              }}>
              {t('str_Topic')}
            </Text>
            <ScrollView
              style={{flexDirection: 'row'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {topics.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index + 1}
                    activeOpacity={0.7}
                    onPress={() =>
                      this.setState({topic: this?.props?.t(`${item.topic}`)})
                    }
                    style={[
                      styles.TopicCard,
                      {
                        backgroundColor:
                          index == 0
                            ? colors.l1
                            : index == 1
                            ? colors.l2
                            : index == 2
                            ? colors.l3
                            : index == 3
                            ? colors.l4
                            : index == 4
                            ? colors.l1
                            : colors.lightPrimary,
                        alignContent: 'center',
                        alignItems: 'center',
                        borderWidth:
                          this?.props?.t(`${item.topic}`) === topic ? 1 : 0,
                        borderColor:
                          index == 0
                            ? colors.t1
                            : index == 1
                            ? colors.t2
                            : index == 2
                            ? colors.t3
                            : index == 3
                            ? colors.t4
                            : index == 4
                            ? colors.t1
                            : colors.lightPrimary,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          index == 0
                            ? colors.t1
                            : index == 1
                            ? colors.t2
                            : index == 2
                            ? colors.t3
                            : index == 3
                            ? colors.t4
                            : index == 4
                            ? colors.t1
                            : colors.lightPrimary,
                        fontSize: size.xsmall,
                        fontFamily: family?.ArialCE,
                      }}>
                      {this?.props?.t(`${item?.topic}`)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.FeelingText}>{t('str_Feeling')}</Text>

            <FlatList
              style={{marginHorizontal: 8}}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 10,
                flexDirection: 'row',
              }}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              data={feelingName}
              renderItem={({item}) => (
                <PostDreamCard
                  item={{...item, feeling: this?.props?.t(`${item.feeling}`)}}
                  onPress={item =>
                    this.setState({feeling: this?.props?.t(`${item.feeling}`)})
                  }
                  colored={
                    this?.props?.t(`${item.feeling}`) !== feeling ? true : false
                  }
                />
              )}
            />
          </View>
          {/* <View style={{marginHorizontal: 5}}>
            <Text style={styles.FeelingText}>{t('str_Type')}</Text>
            <FlatList
              style={{marginHorizontal: 8}}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 10,
                flexDirection: 'row',
              }}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              data={typeName}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.TypeCard,
                    {
                      borderColor:
                        typeSelected == item?.type
                          ? colors.blue
                          : colors.darkGray,
                      backgroundColor:
                        typeSelected == item?.type
                          ? colors.blue
                          : 'transparent',
                    },
                  ]}
                  onPress={() => this.setState({typeSelected: item?.type})}>
                  <Text
                    style={{
                      fontFamily: family?.ArialCE,
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: size.xxsmall,
                      paddingHorizontal: 5,
                      color:
                        typeSelected == item?.type
                          ? colors.white
                          : colors.darkGray,
                    }}>
                    {item?.type}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View> */}
          <Modal isVisible={isModalVisible}>
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
              {showItem == t('str_Public') ? (
                <View style={{flex: 1, position: 'relative'}}>
                  <ImageBackground
                    source={appIcons.cloud}
                    resizeMode="contain"
                    style={styles.image}>
                    <View style={styles.PublicCard}>
                      <Text style={styles.cloudTitle}>
                        {t('str_Be_Advised')}
                      </Text>
                      <Text style={styles.cloudText} numberOfLines={2}>
                        {t('str_Please_Refrain_from')} {'\n'}
                        {t('str_Profanities_and_obscenities')}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.ModalButton1}>
                    <CustomGradientButton
                      colorstyle={true}
                      title={t('str_OK')}
                      onPress={() => {
                        this.setState(previousState => ({
                          isModalVisible: !previousState.isModalVisible,
                        }));
                        NavService.navigate('UserAppStack');
                      }}
                      buttonStyle={{borderRadius: 100, width: '50%'}}
                      textStyle={{fontSize: 17}}
                    />
                  </View>
                </View>
              ) : showItem == t('str_Journal') ? null : showItem ==
                t('str_Followers') ? (
                <View style={styles.FollowersCard}>
                  <ImageBackground
                    source={appIcons.cloud2}
                    resizeMode="contain"
                    style={[styles.image]}>
                    <View style={[styles.PublicCard]}>
                      <View
                        style={[styles.FollowersCardHeader, {marginTop: 70}]}>
                        <Text
                          style={[
                            styles.cloudTitle,
                            {marginLeft: 60, color: colors.blue},
                          ]}>
                          {t('str_Invite_User')}
                        </Text>
                        <TouchableOpacity onPress={() => toggleModal()}>
                          <Image
                            source={appIcons.close}
                            style={styles.close}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                      <CustomTextInput
                        placeholder={t('str_Enter_Email')}
                        containerStyle={styles.ContainerStyle}
                      />
                      <CustomTextInput
                        placeholder={t('str_Enter_Phone_Number')}
                        containerStyle={styles.ContainerStyle}
                      />
                      <Text
                        style={[
                          styles.cloudText,
                          {marginVertical: 15, fontSize: 14},
                        ]}
                        numberOfLines={2}>
                        {t('str_They_will_not_know_that_you')} {'\n'}{' '}
                        {t('str_have_invited_them_to_join_this_app')}
                      </Text>
                    </View>
                    {/* <View style={styles.InviteCard}> */}
                    <CustomGradientButton
                      styleWidth={true}
                      colorstyle={true}
                      title={t('str_INVITE')}
                      onPress={() => {
                        this.setState(previousState => ({
                          isModalVisible: !previousState.isModalVisible,
                        }));
                        NavService.navigate('UserAppStack');
                      }}
                      buttonStyle={{width: '80%'}}
                      textStyle={{
                        fontSize: size.medium,
                        fontFamily: family?.ArialCE,
                      }}
                      linearHeight={{height: 60}}
                    />
                    {/* </View> */}
                  </ImageBackground>
                </View>
              ) : (
                <View style={styles.anomysCard}>
                  <ImageBackground
                    source={appIcons.cloud1}
                    resizeMode="contain"
                    style={styles.image}>
                    <View style={styles.anomysHeader}>
                      <View style={styles.anomysTopHeader}>
                        <Text
                          style={[
                            styles.cloudTitle,
                            {marginLeft: 30, color: colors.blue},
                          ]}>
                          {t('str_Anonymous_Posting')}
                        </Text>
                        <TouchableOpacity onPress={() => toggleModal()}>
                          <Image
                            source={appIcons.close}
                            style={styles.closeAnnomys}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.cloudText} numberOfLines={3}>
                        {t(
                          'str_Your_post_will_not_show_your_username_or_picture',
                        )}
                        {'\n'}{' '}
                        {t(
                          'str_other_users_will_view_the_dreams_you_will_post',
                        )}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.AnnymsButton}>
                    <CustomGradientButton
                      styleWidth={true}
                      colorstyle={true}
                      title={t('str_OK')}
                      onPress={() => {
                        this.setState(previousState => ({
                          isModalVisible: !previousState.isModalVisible,
                        }));
                        NavService.navigate('UserAppStack');
                      }}
                      buttonStyle={styles.ButtonStyle1}
                      textStyle={{fontSize: 17}}
                      linearHeight={{height: 60}}
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </Modal>
          <CustomGradientButton
            title={type === 'edit' ? t('str_UPDATE') : t('str_POST')}
            colorstyle={true}
            onPress={() => {
              // showItem === t('str_Followers')
              //   ? NavService.navigate('UserAppStack')
              //   : toggleModal();
              postHandler();
            }}
          />
        </ScrollView>
      </AppBackground>
    );
  }
}

const actions = {postDream, editPost};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(DreamPost);
