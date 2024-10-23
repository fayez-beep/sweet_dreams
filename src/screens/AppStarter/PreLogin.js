import React, {Component} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withTranslation} from 'react-i18next';
import {colors, family, size, WP} from '../../utils';
import {openLink} from '../../helpers/BrowserUrl';
import CustomBackground from '../../components/CustomBackground';
import {appIcons, appLogos} from '../../assets/index';
import CustomGradientButton from '../../components/CustomGradientButton';
import SocialSignin from '../../components/SocialSignin';
import {socialSignin, Content} from '../../redux/actions/authAction';
import {getDeviceToken} from '../../redux/actions/appAction';
import styles from './styles';
import i18n from '../../helpers/i18n';

class PreLogin extends Component {
  state = {
    termsAndConditions: false,
    terms: false,
    policy: false,
    navigator: '',
    // above18: false,
  };
  // backAction() {
  //   Alert.alert('Hold on!', 'Are you sure you want exit the app?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //   ]);
  //   return true;
  // }

  // componentDidMount() {
  //   this.backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.backAction,
  //   );
  // }
  // componentWillUnmount() {
  //   this.backHandler.remove();
  // }

  componentWillMount() {
    if (this.props.selectedtLanguage) {
      i18n.changeLanguage(this.props.selectedtLanguage);
    }
  }

  render() {
    const {t} = this.props;
    const {termsAndConditions} = this.state;

    const loginHandler = async type => {
      // if (!above18) {
      //   Toast.show({
      //     text1: t('str_over_18_years'),
      //     type: 'error',
      //     visibilityTime: 3000,
      //   });
      // }
      if (!termsAndConditions) {
        Toast.show({
          text1: t('str_agree_terms'),
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        const fcmToken = await getDeviceToken();
        if (type == 'google') {
          const userDetails = await SocialSignin?.Google();
          if (userDetails) {
            let payload = {
              access_token: userDetails?.uid,
              provider: userDetails?.socialType,
              device_type: Platform.OS,
              device_token: fcmToken,
              email: userDetails?.userData?.email,
              screenName: 'socialSignin',
            };
            console.log(payload, 'payloadpayload');
            this.props.socialSignin(payload);
          }
        } else if (type == 'apple') {
          const userDetails = await SocialSignin.Apple();
          if (userDetails) {
            let payload = {
              access_token: userDetails?.uid,
              provider: userDetails?.socialType,
              device_type: Platform.OS,
              device_token: fcmToken,
              email: userDetails?.userData[0]?.email,
              screenName: 'socialSignin',
            };
            console.log(payload, 'payloadpayload');
            this.props.socialSignin(payload);
          }
        } else if (type == 'email') {
          navigation.navigate('Login');
          this.setState({termsAndConditions: ''});
          this.setState({above18: ''});
        } else {
          navigation.navigate('PhoneLogin');
          this.setState({termsAndConditions: ''});
          this.setState({above18: ''});
        }
      }
    };

    const methods = [
      {
        name: t('str_Google'),
        icon: appIcons.googlePlus,
        color: colors.google,
        onPress: () => loginHandler('google'),
      },
      {
        name: t('str_Phone'),
        icon: appIcons.phone,
        color: colors.gray,
        onPress: () => loginHandler('phone'),
      },
      {
        name: t('str_Apple'),
        icon: appIcons.apple,
        color: colors.white,
        onPress: () => loginHandler('apple'),
      },
    ];
    const {navigation} = this.props;

    const Redirect = () => {
      const url = `https://www.google.com`;
      openLink(url);
    };
    return (
      <CustomBackground
        back={false}
        showLogo={false}
        titleText={t('str_PreLogin')}>
        <View style={[styles.container, {padding: 20}]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <View>
            <CustomGradientButton
              icon={true}
              title={t('str_Sign_in_with_Email')}
              onPress={() => loginHandler('email')}
              buttonStyle={{
                borderRadius: 100,
                marginTop: '5%',
                width: WP('90%'),
                marginBottom: 10,
              }}
              textStyle={{fontSize: 16}}
              colorstyle={true}
              preLoginEmailButton
            />
            {methods.map((method, i) => {
              const {color, name, icon, onPress} = method;
              if (Platform.OS !== 'ios' && name === t('str_Apple')) return null;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={i}
                  activeOpacity={0.8}
                  style={[styles.buttonContainer, {backgroundColor: color}]}>
                  <Image
                    source={icon}
                    style={[
                      styles.buttonInnerImage,
                      {
                        tintColor:
                          name === t('str_Apple') ? colors.black : colors.white,
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.buttonInnerText,
                      {
                        color:
                          name === t('str_Apple') ? colors.black : colors.white,
                      },
                    ]}>
                    {t('str_Sign_in_with')} {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.textNormal}>
              {t(`str_Don't_have_an_account?`)}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Signup'),
                  this.setState({
                    email: '',
                  });
                this.setState({
                  password: '',
                });
              }}>
              <Text style={styles.textNormalWithColor}>{t('str_SiGNUP')}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{position: 'absolute', bottom: 30, alignContent: 'center'}}>
            {/* <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => this.setState({above18: !above18})}
                style={styles.CheckBox}>
                {above18 ? (
                  <Image
                    resizeMode="contain"
                    source={appIcons.check}
                    style={{width: 12, height: 12}}
                  />
                ) : null}
              </TouchableOpacity>
              <View style={styles.bottomText}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: size.tiny,
                    fontFamily: family.ArialCE,
                    color: colors.black,
                  }}>
                  {t('str_You_agree_that_you_are_18_or_older')}
                </Text>
              </View>
            </View> */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({termsAndConditions: !termsAndConditions})
                }
                style={styles.CheckBox}>
                {termsAndConditions ? (
                  <Image
                    resizeMode="contain"
                    source={appIcons.check}
                    style={{width: 12, height: 12}}
                  />
                ) : null}
              </TouchableOpacity>
              <View style={styles.bottomText}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: size.tiny,
                    // fontFamily: family.ArialCE,
                    color: colors.black,
                    marginTop: 2,
                    fontWeight: '700',
                    alignSelf: 'center',
                  }}>
                  {t('str_By_signing_up_you_agree_to_our')}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
              <TouchableOpacity onPress={() => Redirect()}>
                <Text style={styles.termsLink}>
                  {t('str_Terms_&_Conditions')}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 12,
                  color: colors.black,
                  fontSize: size.tiny,
                  fontFamily: family.ArialCE,
                }}>
                {' '}
                {t('str_and')}{' '}
              </Text>

              <TouchableOpacity onPress={() => Redirect()}>
                <Text style={styles.privacyLink}>
                  {t('str_PRIVACY_POLICY')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {socialSignin, Content};

function mapStateToProps({appReducer}) {
  return {
    selectedtLanguage: appReducer?.selectedtLanguage,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(PreLogin);
