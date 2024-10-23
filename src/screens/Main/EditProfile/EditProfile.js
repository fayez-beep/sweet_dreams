import React, {Component, createRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
import Modal from 'react-native-modal';
import ImagePicker from '../../../components/ImagePicker';
import ProfileImage from '../../../components/ProfileImage';
import NavService from '../../../helpers/NavService';
import {colors, size, family} from '../../../utils';
import {appIcons} from '../../../assets/index';
import {completeProfile} from '../../../redux/actions/authAction';
import {CustomTextInputWithHeading} from '../../../components/CustomTextInput';
import CustomGradientButton from '../../../components/CustomGradientButton';
import AppBackground from '../../../components/AppBackground';
import DateTimePicker from '../../../components/DateTimePicker';
import styles from './styles';
import {ASSETS_URL} from '../../../config/WebService';
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this?.props?.route?.params?.data?.full_name,
      dob: this?.props?.route?.params?.data?.date_of_birth,
      changeDate: new Date(),
      showDOB: false,
      desc: this?.props?.route?.params?.data?.bio,
      profileImage_Path: this?.props?.route?.params?.data?.profile_image,
      profileImage_Mime: null,
      selectLanguage: this?.props?.route?.params?.data?.language,
      isModalVisible: false,
      OverAge: true,
      Age: '',
      ListOfLanguages: [
        {
          state_name: 'English',
        },

        {
          state_name: 'Spanish',
        },
      ],
    };
  }

  onSubmit = () => {
    const {
      fullName,
      profileImage_Path,
      profileImage_Mime,
      dob,
      desc,
      selectLanguage,
      OverAge,
    } = this.state;
    const {t} = this.props;
    const lang = t('lang');
    if (!fullName) {
      Toast.show({
        text1: t('str_User_name_is_requried'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!dob) {
      Toast.show({
        text1: t('str-Please_enter_Date_of_Birth'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (desc?.trim()?.length === 0) {
      Toast.show({
        text1: t('str_Please_enter_Description'),
        type: 'error',
        visibilityTime: 3000,
      });
    }
    // else if (!selectLanguage) {
    //   Toast.show({
    //     text1: t('str_Please_enter_language'),
    //     type: 'error',
    //     visibilityTime: 3000,
    //   });
    // }
    else {
      if (OverAge) {
        const params = new FormData();
        if (profileImage_Mime)
          params.append('profile_image', {
            uri: profileImage_Path,
            name: `Profile${Date.now()}.${profileImage_Mime.slice(
              profileImage_Path.lastIndexOf('/') + 1,
            )}`,
            type: profileImage_Mime,
          });
        params.append('full_name', fullName);
        params.append('dob', dob);
        params.append('bio', desc);
        params.append('language', lang);

        this?.props?.completeProfile(
          params,
          result => {
            if (result?.status == 1) {
              NavService.navigate('BottomTabs', {
                screen: 'Profile',
              });
            }
          },
          {edit: true},
        );
      } else {
        this?.toggleModal();
      }
    }
  };

  underAgeValidate = birthday => {
    this.setState({OverAge: false});
    var optimizedBirthday = birthday.slice(6);
    var myAge = new Date().getFullYear() - optimizedBirthday;
    // console.log(myAge,'myAge');
    this.setState({Age: myAge});
    if (myAge < 18) {
      setTimeout(() => {
        this.toggleModal();
      }, 500);
    } else {
      this.setState({OverAge: true});
      return true;
    }
  };

  confirmAge = () => {
    const {Age} = this.state;
    Age >= 18 && this.setState({OverAge: true});
    this?.toggleModal();
  };

  toggleModal = () => {
    this.setState(previousState => ({
      isModalVisible: !previousState.isModalVisible,
    }));
  };

  componentDidMount() {
    const [month, day, year] = this.state.dob.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day); // Month is zero-based
    // setSelectedDate(parsedDate);
    this.setState({
      changeDate: parsedDate,
    });
  }
  render() {
    const {
      fullName,
      dob,
      showDOB,
      desc,
      selectLanguage,
      profileImage_Path,
      profileImage_Mime,
      isModalVisible,
      ListOfLanguages,
      changeDate,
    } = this.state;
    console.log(this?.state?.dob, 'show me=========');
    const updateImageInGallery = (path, mime) => {
      this.setState({profileImage_Path: path});
      this.setState({profileImage_Mime: mime});
    };
    const actionSheetLanguageRef = createRef();
    const {t} = this.props;

    return (
      <AppBackground title={t('str_Edit_Profile')} back={true}>
        <ScrollView>
          <View
            style={{alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
            {/* {language Action Sheet} */}
            <ActionSheet
              ref={actionSheetLanguageRef}
              containerStyle={{backgroundColor: 'transparent'}}>
              <View style={{padding: 10, paddingBottom: 20}}>
                <ActionSheetComponent
                  title={t('str_SelectLanguage')}
                  dataset={ListOfLanguages}
                  onPress={async item => {
                    actionSheetLanguageRef.current.hide();
                    this.setState({selectLanguage: item.state_name});
                  }}
                />
                <TouchableOpacity
                  onPress={() => actionSheetLanguageRef.current.hide()}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    paddingVertical: 12,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'rgb(0,88,200)',
                      fontSize: size.large,
                      fontFamily: family?.ArialCE,
                      // fontWeight: '600',
                    }}>
                    {t('str_Cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ActionSheet>
            <DateTimePicker
              date={changeDate}
              mode={'date'}
              androidVariant={'iosClone'}
              isDatePickerVisible={showDOB}
              handleConfirm={date => {
                const manupilatedDate = moment(date).format('MM-DD-YYYY');
                this.underAgeValidate(manupilatedDate);
                this.setState({
                  changeDate: date,
                  showDOB: false,
                  dob: manupilatedDate,
                });
              }}
              hideDatePicker={() => this.setState({showDOB: false})}
            />
            <View style={{marginTop: 20}}>
              <ImagePicker
                onImageChange={(path, mime, type) => {
                  updateImageInGallery(path, mime, type);
                }}>
                <ProfileImage
                  name={t('str_UserName')}
                  innerAsset={profileImage_Path == null ? true : false}
                  imageUri={
                    profileImage_Path !== null
                      ? profileImage_Path?.includes('file:///')
                        ? profileImage_Path
                        : ASSETS_URL + profileImage_Path
                      : appIcons.userPlaceholder
                  }
                />
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 35 / 2,
                    backgroundColor: colors.primary,
                    position: 'absolute',
                    bottom: -5,
                    right: -10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={appIcons.edit}
                    style={{width: 18, height: 18, resizeMode: 'contain'}}
                  />
                </View>
              </ImagePicker>
            </View>
            <View style={styles.inputContianer}>
              <CustomTextInputWithHeading
                heading={t('str_Full_Name')}
                placeholder={t('str_Full_Name')}
                Onchange={value => this.setState({fullName: value})}
                value={fullName}
                maxLength={30}
                textStyle
              />

              <CustomTextInputWithHeading
                onPress={() => this.setState({showDOB: true})}
                heading={t('str_Date_of_Birth')}
                placeholder={'dd/mm/yy'}
                Onchange={value => this.setState({dob: value})}
                value={dob}
                datePicker
                textStyle
              />

              <CustomTextInputWithHeading
                heading={t('str_Bio')}
                placeholder={t('str_write_something')}
                Onchange={value => this.setState({desc: value})}
                value={desc}
                multiline={true}
                textStyle
                maxLength={275}
                // onSubmitEditing={() => {
                //   Keyboard.dismiss();
                // }}
              />
              {/* <Text style={styles.lang}>{t('str_SelectLanguage')}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => actionSheetLanguageRef.current.show()}
                style={{width: '100%'}}>
                <CustomSelector
                  placeholder={t('str_SelectLanguage')}
                  value={selectLanguage}
                  isDropdown={true}
                />
              </TouchableOpacity> */}

              <View style={{marginVertical: 30}}>
                <CustomGradientButton
                  title={t('str_UPDATE')}
                  colorstyle={true}
                  onPress={() => this.onSubmit()}
                />
              </View>
            </View>
          </View>
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
                  <Text style={styles.cloudText}>
                    {t('str_Please_Confirm_That_You_Are_Over_18')}
                  </Text>
                </View>
              </ImageBackground>
              <View style={{position: 'relative', bottom: '40%'}}>
                <CustomGradientButton
                  title={t('str_CONFIRM')}
                  onPress={() => this.confirmAge()}
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
        </ScrollView>
      </AppBackground>
    );
  }
}

const actions = {completeProfile};
// export default withTranslation()(EditProfile);

export default compose(withTranslation(), connect(null, actions))(EditProfile);
// export default EditProfile
const ActionSheetComponent = ({
  title = '',
  dataset = [],
  onPress = () => {},
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(241,241,241,0.9)',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: '#ccc',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: 'rgb(0,88,200)',
            textAlign: 'center',
            fontSize: size.large,
            fontFamily: family?.ArialCE,
            // fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
      <ScrollView style={{maxHeight: 200}} showsVerticalScrollIndicator={false}>
        {dataset.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: size.normal,
                  fontFamily: family?.ArialCE,
                }}
                numberOfLines={1}>
                {item?.state_name?.length ? item?.state_name : item?.city_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
