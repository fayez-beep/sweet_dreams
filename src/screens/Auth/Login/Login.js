import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInputView from '../../../components/CustomTextInputView';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {schema} from '../../../utils/validation';
import {colors, size} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import {loginCurrentUser} from '../../../redux/actions/authAction';
import styles from './styles';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {withTranslation} from 'react-i18next';
import {family} from '../../../utils';
import {compose} from 'redux';
import {getDeviceToken} from '../../../redux/actions/appAction';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = async t => {
    const {email, password} = this.state;
    if (!email) {
      Toast.show({
        text1: t('str_Email_address_field_is_required'),
        type: 'error',
        visibilityTime: 6000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: t('str_Please_enter_valid_email_address'),
        type: 'error',
        visibilityTime: 6000,
      });
    } else if (!password) {
      Toast.show({
        text1: t('str_Password_field_is_required'),
        type: 'error',
        visibilityTime: 6000,
      });
    }
    //  else if (!schema.validate(password)) {
    //   Toast.show({
    //     text1: t('str_Invalid_password'),
    //     type: 'error',
    //     visibilityTime: 3000,
    //   });
    // }
    else {
      const fcmToken = await getDeviceToken();

      let payload = {
        email: email,
        password: password,
        device_type: Platform.OS,
        device_token: fcmToken,
      };
      Keyboard.dismiss();
      this?.props?.loginCurrentUser(payload);
      // Toast.show({
      //   text1: t('str_Login_successful'),
      //   type: 'success',
      //   visibilityTime: 3000,
      // });
    }
  };
  forgotHandler = () => {
    this.props.navigation.navigate('ForgotPassword');
    Keyboard.dismiss();
    this.setState({
      email: '',
      password: '',
    });
  };
  render() {
    const {email, password} = this.state;
    const {t} = this.props;

    return (
      <CustomBackground
        showLogo={false}
        titleText={t('str_LOGIN')}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <View style={[styles.container, {marginTop: 20}]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <CustomTextInputView
              type={'email-address'}
              placeholder={t('str_Email')}
              label={t('str_Email')}
              leftIcon={appIcons.email}
              value={email}
              Onchange={value => this.setState({email: value})}
              containerStyle={{
                marginBottom: 20,
                width: '90%',
              }}
              maxLength={35}
            />
            <CustomTextInputView
              lock={'Lock'}
              placeholder={t('str_Password')}
              leftIcon={appIcons.lock}
              rightIcon={true}
              Onchange={value => this.setState({password: value})}
              label={t('str_Password')}
              value={password}
              containerStyle={{
                marginBottom: 20,
                width: '90%',
              }}
              maxLength={30}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => this.forgotHandler()}
              activeOpacity={0.8}>
              <Text style={styles.subText}>{t('str_Forgot_Password')}</Text>
            </TouchableOpacity>

            <CustomGradientButton
              title={t('str_LOGIN')}
              onPress={() => this.onSubmit(t)}
              buttonStyle={{borderRadius: 100, marginTop: '5%'}}
              textStyle={{
                fontSize: size.medium,
                fontFamily: family?.ArialCE,
              }}
              colorstyle={true}
            />
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
        </View>
      </CustomBackground>
    );
  }
}
const actions = {loginCurrentUser};
export default compose(withTranslation(), connect(null, actions))(Login);
