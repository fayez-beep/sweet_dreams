import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {Component} from 'react';
import CustomText from '../../../components/CustomText';
import AppBackground from '../../../components/AppBackground';
import ProfileImage from '../../../components/ProfileImage';
import {appIcons} from '../../../assets';
import {WP} from '../../../utils';
import Card from '../../../components/Card';
import NavService from '../../../helpers/NavService';
import CustomGradientButton from '../../../components/CustomGradientButton';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {
  userProfile,
  viewPost,
  followUsers,
} from '../../../redux/actions/appAction';
import {compose} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {ASSETS_URL} from '../../../config/WebService';
import Utils from '../../../utils/Utils';

class ProfileHost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJournal: true,
      item: this?.props?.route?.params,
      show: null,
      openToolTip: null,
      userData: null,
      data: [],
    };
  }

  getUser = () => {
    const {item} = this.state;
    const payload = {user_id: item?.user?.id};
    this.setState({userData: []}, () => {
      this.props.userProfile(payload, data => {
        this.setState({userData: data});
        this.getHomeData();
      });
    });
  };

  getHomeData = () => {
    const {item} = this.state;
    this.setState({data: []}, () => {
      const payload = {user_id: item?.user?.id};
      this.props.viewPost(payload, response => {
        if (response?.data) {
          this.setState({data: response.data});
        }
      });
    });
  };

  followUser = () => {
    const {item, userData} = this.state;
    const payload = {follow_id: item?.user?.id};
    this.props.followUsers(payload, responseCallback => {
      console.log('followUserresponseCallback', responseCallback);
      let temp = JSON.stringify(userData);
      temp = JSON.parse(temp);
      if (temp.isFollowed == 2) {
        temp.isFollowed = 0;
      } else {
        temp.isFollowed = 1;
      }
      this.setState({userData: temp});
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

  render() {
    const {isJournal, item, show, openToolTip, userData, data} = this.state;
    const {t, user} = this.props;

    return (
      <AppBackground
        twocloudsss={true}
        appBackground={false}
        notification
        // backgroundChange={false}
        title={t('str_Other_Profile')}
        back={true}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            this.setState({
              show: null,
              openToolTip: null,
            });
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  this.getUser();
                }}
              />
            }
            ListHeaderComponent={
              <>
                <View style={styles.TopContainer}>
                  <View style={{width: WP('55%'), marginLeft: 10}}>
                    <ProfileImage
                      name={t('str_UserName')}
                      size={100}
                      imageUri={
                        userData?.user?.profile_image
                          ? ASSETS_URL + userData?.user?.profile_image
                          : appIcons.userPlaceholder
                      }
                      innerAsset={userData?.user?.profile_image ? false : true}
                    />
                    {userData?.user?.legal_name ? (
                      <View style={styles.checkCard}>
                        <Image
                          source={appIcons.check}
                          resizeMode="contain"
                          style={styles.check}
                        />
                      </View>
                    ) : null}
                    <View style={styles.detail}>
                      <Text style={styles.name}>
                        {userData?.user?.full_name}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.age}>{t('str_Age')}</Text>
                        <Text style={styles.ageNumber}>
                          {Utils.calculateAge(userData?.user?.date_of_birth)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {item?.user?.id == user?.user_id ? null : (
                    <View style={styles.btn}>
                      <CustomGradientButton
                        Otherprofile={true}
                        title={
                          userData?.isFollowed == 2
                            ? t('str_Following')
                            : userData?.isFollowed == 1
                            ? t('str_Pending')
                            : t('str_Follow')
                        }
                        styleWidth={true}
                        colorstyle={false}
                        textStyle={{textTransform: 'uppercase'}}
                        onPress={() => {
                          if (userData?.isFollowed != 1) {
                            this.followUser();
                          }
                        }}
                      />
                      <CustomGradientButton
                        Otherprofile={true}
                        onPress={() => {
                          if (userData?.user) {
                            NavService.navigate('Message', userData?.user);
                          }
                        }}
                        title="MESSAGE"
                        styleWidth={true}
                        colorstyle={true}
                      />
                    </View>
                  )}
                </View>
                <CustomText
                  style={styles.profileBio}
                  text={userData?.user?.bio}
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
                    <Text style={styles.txt}>{userData?.post}</Text>
                    <Text style={styles.txtHeading}>{t('str_Posts')}</Text>
                  </View>
                  <View style={styles.hrMid} />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.txt}>{userData?.followers}</Text>
                    <Text style={styles.txtHeading}>{t('str_Followers')}</Text>
                  </View>
                  <View style={styles.hrMid} />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.txt}>{userData?.following}</Text>
                    <Text style={styles.txtHeading}>{t('str_Following')}</Text>
                  </View>
                </View>
                <View style={styles.hr} />
                <View style={styles.dreamCard}>
                  <Text style={styles.dreamtxt}>{t('str_Dreams')}</Text>
                </View>
              </>
            }
            style={{flex: 1}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item, index}) => (
              <View style={{marginHorizontal: 20}}>
                <Card
                  dots={false}
                  item={item}
                  imgAvailable={false}
                  isJournal={isJournal}
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
                />
              </View>
            )}
          />
        </TouchableOpacity>
      </AppBackground>
    );
  }
}

const actions = {userProfile, viewPost, followUsers};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(ProfileHost);
