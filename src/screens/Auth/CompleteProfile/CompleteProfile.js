import React, {Component, createRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
  BackHandler,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
import Modal from 'react-native-modal';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import CustomBackground from '../../../components/CustomBackground';
import ImagePicker from '../../../components/ImagePicker';
import ProfileImage from '../../../components/ProfileImage';
import {colors, size, family} from '../../../utils';
import {appIcons} from '../../../assets/index';
import {completeProfile} from '../../../redux/actions/authAction';
import {CustomTextInputWithHeading} from '../../../components/CustomTextInput';
import CustomGradientButton from '../../../components/CustomGradientButton';
import DateTimePicker from '../../../components/DateTimePicker';
import styles from './styles';
import NavService from '../../../helpers/NavService';

class CompleteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this?.props?.route?.params?.full_name,
      dob: '',
      showDOB: false,
      desc: '',
      profileImage: null,
      selectLanguage: '',
      isModalVisible: false,
      OverAge: false,
      Age: '',
      ListOfLanguages: [
        {
          state_name: 'English',
        },

        {
          state_name: 'Spanish',
        },
      ],
      setKeyboardStatus: false,
      changeDate: new Date(),
    };
  }

  onSubmit = () => {
    const {fullName, profileImage, dob, desc, selectLanguage, OverAge} =
      this.state;
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
    } else if (desc.trim().length === 0) {
      Toast.show({
        text1: t('str_Please_enter_Description'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      if (OverAge) {
        const params = new FormData();
        if (profileImage?.mime)
          params.append('profile_image', {
            uri: profileImage?.path,
            name: `Profile${Date.now()}.${profileImage?.mime.slice(
              profileImage?.path.lastIndexOf('/') + 1,
            )}`,
            type: profileImage?.mime,
          });
        params.append('full_name', fullName);
        params.append('dob', dob);
        params.append('bio', desc);
        params.append('language', lang);

        this?.props?.completeProfile(params);
      } else {
        this?.toggleModal();
      }
    }
  };

  toggleModal = () => {
    this.setState(previousState => ({
      isModalVisible: !previousState.isModalVisible,
    }));
  };
  underAgeValidate = birthday => {
    // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
    var optimizedBirthday = birthday.slice(6);

    //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
    // var myBirthday = new Date(optimizedBirthday);

    // console.log(myBirthday,'ss===s');
    // set current day on 01:00:00 hours GMT+0100 (CET)
    var myAge = new Date().getFullYear() - optimizedBirthday;
    this.setState({Age: myAge});
    // calculate age comparing current date and borthday
    // var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);
    if (myAge < 18) {
      // console.log('smaller', myAge);
      setTimeout(() => {
        this.toggleModal();
      }, 500);
    } else {
      // console.log('greater', myAge);
      this.setState({OverAge: true});
      return true;
    }
  };
  confirmAge = () => {
    const {Age} = this.state;
    Age >= 18 && this.setState({OverAge: true});
    this?.toggleModal();
  };

  //BACK HANDLER
  handleBackButtonClick(navigation) {
    // navigation?.navigate('AppStarter', {
    //   index: 0,
    // });
    // navigation.reset()
    console.log({navigation});
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'AppStarter'}],
    // });
    navigation.navigate('AppStarter');
    return true;
  }
  componentDidMount() {
    BackHandler?.addEventListener('hardwareBackPress', () =>
      this?.handleBackButtonClick(this.props?.navigation),
    );

    return () => {
      BackHandler?.removeEventListener('hardwareBackPress', () =>
        this?.handleBackButtonClick(this.props?.navigation),
      );
    };

    // const {setKeyboardStatus} = this.state;
    // const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
    //   this.setState({setKeyboardStatus: true});
    // });
    // const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
    //   this.setState({comment: ''});
    //   this.setState({setKeyboardStatus: false});
    // });
    // return () => {
    //   showSubscription.remove();
    //   hideSubscription.remove();
    // };
  }

  render() {
    const {t} = this.props;
    const {
      fullName,
      dob,
      showDOB,
      desc,
      selectLanguage,
      setKeyboardStatus,
      profileImage,
      isModalVisible,
      ListOfLanguages,
      changeDate,
    } = this.state;
    console.log(setKeyboardStatus, 'setKeyboardStatus');

    const updateImageInGallery = (path, mime, type) => {
      console.log(path, mime, type);
      this.setState({profileImage: {path, mime, type}});
    };
    const actionSheetLanguageRef = createRef();

    return (
      <CustomBackground
        showLogo={false}
        titleText={t('str_Create_Profile')}
        onBack={() => {
          // this.props.navigation.reset({
          //   index: 0,
          //   routes: [{name: 'AppStarter'}],
          // });
          this.props.navigation.navigate('AppStarter');
        }}>
        {/* <KeyboardAvoidingView behavior="padding"> */}
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}
          // style={
          //   setKeyboardStatus == true
          //     ? {bottom: '30%', alignItems: 'center', alignSelf: 'center'}
          //     : {alignItems: 'center', alignSelf: 'center', marginTop: 50}
          // }
        >
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
                    fontSize: 18,
                    // fontWeight: '600',
                    fontFamily: family?.ArialCE,
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
                showDOB: false,
                dob: manupilatedDate,
                changeDate: date,
              });
            }}
            theme="light"
            // fadeToColor="red"
            textColor={colors.primary}
            hideDatePicker={() => this.setState({showDOB: false})}
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
          <View style={{marginTop: 20}}>
            <ImagePicker
              onImageChange={(path, mime, type) => {
                // console.log('onImageChange', mime, path, type);
                updateImageInGallery(path, mime, type);
              }}>
              <ProfileImage
                name={'UserName'}
                innerAsset={profileImage == null ? true : false}
                imageUri={
                  profileImage !== null
                    ? profileImage?.path
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
              textStyle
              maxLength={30}
            />

            <CustomTextInputWithHeading
              onPress={() => this.setState({showDOB: true})}
              heading={t('str_Date_of_Birth')}
              placeholder={t('str_dd/mm/yy')}
              Onchange={value => this.setState({dob: value})}
              value={dob}
              datePicker
              textStyle
            />

            <CustomTextInputWithHeading
              heading={t('str_Tell_us_what_your_dreams_are?')}
              placeholder={t('str_write_something')}
              Onchange={value => this.setState({desc: value})}
              value={desc}
              multiline={true}
              textStyle
              maxLength={275}
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
                title={t('str_Create_Profile')}
                onPress={() => this.onSubmit()}
                buttonStyle={{borderRadius: 100, marginTop: '5%'}}
                textStyle={{fontSize: 17}}
                colorstyle={true}
              />
            </View>
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
      </CustomBackground>
    );
  }
}

const actions = {completeProfile};
export default compose(
  withTranslation(),
  connect(null, actions),
)(CompleteProfile);

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
            fontSize: 18,
            fontWeight: '500',
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
              <Text style={{color: '#000', fontSize: 16}} numberOfLines={1}>
                {item?.state_name?.length ? item?.state_name : item?.city_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
