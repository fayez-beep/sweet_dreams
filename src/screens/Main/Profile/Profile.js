import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
// import {homeData} from '../../../utils/dummyData';
import ProfileImage from '../../../components/ProfileImage';
import {appIcons} from '../../../assets';
import {WP, family, size} from '../../../utils';
import Card from '../../../components/Card';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import CustomGradientButton from '../../../components/CustomGradientButton';
import AppBackground from '../../../components/AppBackground';
import {userProfile, viewPost} from '../../../redux/actions/appAction';
import {
  deletePost,
  likePost,
  hidePost,
  savePost,
  reportPost,
} from '../../../redux/actions/appAction';
import styles from './styles';
import Utils from '../../../utils/Utils';
import {ASSETS_URL} from '../../../config/WebService';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Toast from 'react-native-toast-message';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalVisible: false,
      isJournal: false,
      profileInfo: [],
      showw: null,
      openToolTip: null,
      data: [],
      show: null,
      reportItem: null,
      reportTypes: '',
      selectedValue: null,
      isModalVisible: false,
    };
  }

  handleRadioSelect = value => {
    this.setState({selectedValue: value});
  };

  toggleModal = () => {
    this.setState(previousState => ({
      isModalVisible: !previousState.isModalVisible,
    }));
  };

  getUser = () => {
    const {user} = this.props;
    const payload = {user_id: user?.user_id};
    this.setState({profileInfo: []}, () => {
      this.props.userProfile(payload, data => {
        this.setState({profileInfo: data});
        this.getPosts();
      });
    });
  };

  getPosts = () => {
    const {user} = this.props;
    this.setState({data: []}, () => {
      const payload = {user_id: user?.user_id};
      this.props.viewPost(payload, response => {
        if (response?.data) {
          this.setState({data: response.data});
        }
      });
    });
  };

  deletePost = (id, index) => {
    const {data} = this.state;
    const payload = {post_id: id};
    this.props.deletePost(payload, responseCallback => {
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      temp.splice(index, 1);
      this.setState({data: temp});
    });
  };

  reactPost = (id, index, reaction) => {
    const {data} = this.state;
    const payload = {post_id: id, reaction: reaction.title};
    this.props.likePost(payload, responseCallback => {
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      if (
        responseCallback?.message === 'Post Unliked.' &&
        temp[index].isLike == 1
      ) {
        temp[index].likes_count = temp[index].likes_count - 1;
        temp[index].isLike = 0;
        this.setState({data: temp});
      } else if (
        responseCallback?.message === 'Post Liked successfully.' &&
        temp[index].isLike == 0
      ) {
        temp[index].likes_count = temp[index].likes_count + 1;
        temp[index].isLike = 1;
        this.setState({data: temp});
      }
      Toast.show({
        text1: `${responseCallback?.message}`,
        type: 'error',
        visibilityTime: 3000,
      });
    });
  };

  hidePost = (id, index) => {
    const {data} = this.state;
    const payload = {
      post_id: id,
    };
    this.props.hidePost(payload, responseCallback => {
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      if (temp[index].isHide == 0) {
        temp[index].isHide = 1;
      } else {
        temp[index].isHide = 0;
      }
      this.setState({reportItem: null, data: temp});
    });
  };

  savePost = (id, index) => {
    const {data} = this.state;
    const payload = {
      post_id: id,
    };
    this.props.savePost(payload, responseCallback => {
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      temp[index].isSave = !temp[index].isSave;
      this.setState({reportItem: null, data: temp});
    });
  };

  reportPost = (id, reason) => {
    const payload = {
      post_id: id,
      reason: reason,
    };
    this.props.reportPost(payload, responseCallback => {
      this.setState({isModalVisible: true, reportItem: null});
    });
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.getUser();
      },
    );
  }

  componentWillUnmount() {
    this.focusListener();
  }

  render() {
    const {
      profileInfo,
      isModalVisible,
      openToolTip,
      data,
      show,
      selectedValue,
      confirmationModalVisible,
      reportTypes,
      reportItem,
    } = this.state;
    const {t} = this.props;
    return (
      <AppBackground
        twocloudsss={true}
        appBackground={false}
        // backgroundChange={true}
        title={t('str_Profile')}
        menu={true}
        notification={true}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            this.setState({
              showw: null,
              openToolTip: null,
            });
          }}>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={styles.TopContainer}>
                  <View style={{width: WP('55%'), marginLeft: 8}}>
                    <ProfileImage
                      name={'UserName'}
                      size={100}
                      imageUri={
                        profileInfo?.user?.profile_image !== null
                          ? ASSETS_URL + profileInfo?.user?.profile_image
                          : appIcons.userPlaceholder
                      }
                      innerAsset={
                        profileInfo?.user?.profile_image == null ? true : false
                      }
                    />
                    <View style={styles.detail}>
                      <Text style={styles.name}>
                        {profileInfo?.user?.full_name}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Text style={styles.age}>{t('str_Age')}:</Text>
                        <Text style={styles.ageNumber}>
                          {Utils.calculateAge(profileInfo?.user?.date_of_birth)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.btn}>
                    <CustomGradientButton
                      profile={true}
                      title={
                        profileInfo?.user?.legal_name
                          ? t('str_Verified')
                          : t('str_Become_Verified')
                      }
                      styleWidth={true}
                      colorstyle={false}
                      onPress={() => {
                        if (!profileInfo?.user?.legal_name) {
                          NavService.navigate('BecomeVerifed');
                        }
                      }}
                    />

                    <CustomGradientButton
                      profile={true}
                      onPress={() =>
                        NavService.navigate('EditProfile', {
                          data: profileInfo?.user,
                        })
                      }
                      title={t('str_Edit_Profile')}
                      styleWidth={true}
                      colorstyle={true}
                    />
                  </View>
                </View>
                <CustomText
                  style={styles.profileBio}
                  text={profileInfo?.user?.bio}
                  expandable
                />
                <View style={styles.hr} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'space-between',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.txt}>{profileInfo?.post}</Text>
                    <Text style={styles.txtHeading}>{t('str_Posts')}</Text>
                  </View>
                  <View style={styles.hrMid} />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.txt}>{profileInfo?.followers}</Text>
                    <Text style={styles.txtHeading}>{t('str_Followers')}</Text>
                  </View>
                  <View style={styles.hrMid} />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.txt}>{profileInfo?.following}</Text>
                    <Text style={styles.txtHeading}>{t('str_Following')}</Text>
                  </View>
                </View>
                <View style={styles.hr} />
                <View style={styles.dreamCard}>
                  <Text style={styles.dreamtxt}>{t('str_My_Dreams')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => NavService.navigate('Journal')}>
                    <Text style={styles.txtJournal}>
                      {t('str_VIEW_JOURNAL')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            }
            style={{flex: 1}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 70,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item, index}) => (
              <View style={{marginHorizontal: 20}}>
                <Card
                  reportTypeCallback={value => {
                    this.setState({
                      reportTypes: value,
                      reportItem: {...item, index},
                    });
                  }}
                  curentFocus={this}
                  selectedValue={this.state.selectedValue}
                  item={item}
                  imgAvailable={true}
                  show={show}
                  index={index}
                  openToolTip={openToolTip}
                  toggleToolTip={val => {
                    if (openToolTip === val) {
                      this.setState({
                        openToolTip: null,
                        show: null,
                      });
                    } else {
                      this.setState({
                        openToolTip: val,
                        show: null,
                      });
                    }
                  }}
                  toggleShow={val => {
                    this.setState({
                      show: val,
                      openToolTip: null,
                    });
                  }}
                  onEditDream={() => {
                    NavService.navigate('DreamPost', {
                      ...item,
                      dreamType: item.dream_type,
                      type: 'edit',
                    });
                  }}
                  onDeleteDream={() => {
                    this.deletePost(item.id, index);
                  }}
                  onReact={reaction => {
                    this.reactPost(item.id, index, reaction);
                  }}
                />
                {/* <Card
                  item={item}
                  imgAvailable={false}
                  isJournal={isJournal}
                  show={showw}
                  index={index}
                  openToolTip={openToolTip}
                  toggleToolTip={val => {
                    if (openToolTip === val) {
                      this.setState({
                        openToolTip: null,
                        showw: null,
                      });
                    } else {
                      this.setState({
                        openToolTip: val,
                        showw: null,
                      });
                    }
                  }}
                  toggleShow={val => {
                    this.setState({
                      showw: val,
                      openToolTip: null,
                    });
                  }}
                /> */}
              </View>
            )}
          />
        </TouchableOpacity>
        <ConfirmationModal
          curentFocus={this}
          selectedValue={selectedValue}
          handleRadioSelect={value => {
            this.handleRadioSelect(value);
          }}
          visible={confirmationModalVisible}
          toggleVisibility={() =>
            this.setState({
              confirmationModalVisible: !confirmationModalVisible,
              reportOther: '',
              selectedValue: null,
            })
          }
          title={
            reportTypes?.label == `${t('str_Hide')}`
              ? t('str_Hidee')
              : reportTypes?.label == `${t('str_UnHide')}`
              ? t('str_Hideee')
              : reportTypes?.label == `${t('str_Report')}`
              ? t('str_problem')
              : reportTypes?.label == `${t('str_Save')}`
              ? t('str_Saves')
              : null
          }
          reportType={reportTypes}
          // subTitle={' You want to Delete Account?'}
          onAccept={(selected, something) => {
            console.log({selected, something, reportTypes});
            if (selected === null) {
              Toast.show({
                text1: `${t('str_violation')}`,
                type: 'error',
                visibilityTime: 3000,
              });
              return;
            }

            if (selected === t('str_something_else') && something === '') {
              Toast.show({
                text1: `${t('str_reason_empty')}`,
                type: 'error',
                visibilityTime: 3000,
              });
              return;
            }
            this.setState(
              {
                confirmationModalVisible: !confirmationModalVisible,
                reportOther: '',
                selectedValue: null,
              },
              () => {
                if (selected != undefined) {
                  let reportDetails =
                    selected === t('str_something_else') ? something : selected;

                  this.reportPost(reportItem?.id, reportDetails);
                } else {
                  if (reportTypes?.value === '2') {
                    this.hidePost(reportItem?.id, reportItem?.index);
                  } else if (reportTypes?.value === '3') {
                    this.savePost(reportItem?.id, reportItem?.index);
                  }
                }
              },
            );
          }}
        />
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}>
          <View style={{flex: 1, position: 'relative'}}>
            <ImageBackground
              source={appIcons.cloud}
              resizeMode="contain"
              style={styles.image}>
              <View>
                <Text style={styles.cloudTitle}>{t('str_alert')}</Text>
                <Text style={styles.cloudText}>{t('str_thankyou')}</Text>
              </View>
            </ImageBackground>
            <View style={{position: 'relative', bottom: '40%'}}>
              <CustomGradientButton
                title={t('str_CONFIRM')}
                onPress={() => this.toggleModal()}
                buttonStyle={{borderRadius: 100, width: '50%'}}
                textStyle={{
                  fontSize: size.medium,
                  fontFamily: family?.ArialCE,
                }}
                colorstyle={true}
              />
            </View>
          </View>
        </Modal>
      </AppBackground>
    );
  }
}
const actions = {
  userProfile,
  viewPost,
  deletePost,
  likePost,
  hidePost,
  savePost,
  reportPost,
};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(Profile);
