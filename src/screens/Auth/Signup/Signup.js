import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Keyboard,
} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInputView from '../../../components/CustomTextInputView';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {schema} from '../../../utils/validation';
import {appIcons, appLogos} from '../../../assets/index';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {colors} from '../../../utils';
import styles from './styles';
import {family, size} from '../../../utils';
import {signUpUser} from '../../../redux/actions/authAction';
class Signup extends Component {
  state = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    above18: false,
  };

  onSubmit = t => {
    const {fullName, phoneNumber, email, password, confirmPassword, above18} =
      this.state;
    console.log({above: above18});

    if (!fullName.trim()) {
      Toast.show({
        text1: t('str_User_name_is_requried'),
        type: 'error',
        visibilityTime: 4000,
      });
    } else if (!email.trim()) {
      Toast.show({
        text1: t('str_Email_address_field_is_required'),
        type: 'error',
        visibilityTime: 4000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: t('str_Please_enter_valid_email_address'),
        type: 'error',
        visibilityTime: 6000,
      });
    }
    //  else if (!phoneNumber.trim()) {
    //   Toast.show({
    //     text1: t('str_Phone_number_is_required'),
    //     type: 'error',
    //     visibilityTime: 3000,
    //   });
    // } else if (phoneNumber.length < 11) {
    //   Toast.show({
    //     text1: t('str_Phone_number_is_not_valid'),
    //     type: 'error',
    //     visibilityTime: 3000,
    //   });
    // }
    else if (!password.trim()) {
      Toast.show({
        text1: t('str_Password_field_is_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!schema.validate(password)) {
      Toast.show({
        text1: t('str_password_validation_Message'),
        text2: t(
          'str_contain_atleast_1_uppercase_1_lowercase_1_digit_and_1_special_character',
        ),
        type: 'tomatoToast',
        visibilityTime: 10000,
      });
    } else if (!confirmPassword.trim()) {
      Toast.show({
        text1: t('str_Confirm_password_is_required'),
        type: 'error',
        visibilityTime: 4000,
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        text1: t('str_Password_and_Confirm_new_password_must_be_same'),
        type: 'error',
        visibilityTime: 4000,
      });
    } else if (!above18) {
      Toast.show({
        text1: t('str_over_18_years'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = {
        full_name: fullName,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      };
      Keyboard.dismiss();
      this?.props?.signUpUser(payload);
    }
  };

  render() {
    const {fullName, email, phoneNumber, password, confirmPassword, above18} =
      this.state;
    const {t} = this.props;
    return (
      <CustomBackground
        showLogo={false}
        titleText={t('str_SIGNUP')}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <View style={[styles.container, {marginTop: 20}]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <CustomTextInputView
              placeholder={t('str_Full_Name')}
              label={t('str_Full_Name')}
              leftIcon={appIcons.user}
              value={fullName}
              Onchange={value => this.setState({fullName: value})}
              containerStyle={{
                marginBottom: 20,
                width: '90%',
                color: colors.black,
              }}
              maxLength={30}
            />
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
                color: colors.black,
              }}
              maxLength={35}
            />
            {/* <CustomTextInputView
              type={'phone-pad'}
              placeholder={t('str_Phone_Number')}
              label={t('str_Phone_Number')}
              leftIcon={appIcons.phone}
              value={phoneNumber}
              Onchange={number => {
                const cleanNumber = number.replace(
                  /[- #*;,.<>\{\}\[\]\\\/]/gi,
                  '',
                );
                this.setState({phoneNumber: cleanNumber});
              }}
              containerStyle={{
                marginBottom: 20,
                width: '90%',
                color: colors.black,
              }}
            /> */}
            <CustomTextInputView
              placeholder={t('str_Password')}
              Onchange={value => this.setState({password: value})}
              leftIcon={appIcons.lock}
              rightIcon={true}
              label={t('str_Password')}
              lock={'Lock'}
              value={password}
              containerStyle={{
                width: '90%',
              }}
              maxLength={30}
            />
            <CustomTextInputView
              lock={'Lock'}
              placeholder={t('str_Confirm_Password')}
              leftIcon={appIcons.lock}
              rightIcon={true}
              Onchange={value => this.setState({confirmPassword: value})}
              label={t('str_Confirm_Password')}
              value={confirmPassword}
              containerStyle={{
                width: '90%',
              }}
              maxLength={30}
            />
            <View style={styles.checkboxContainer}>
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
                    // fontFamily: family.ArialCE,
                    color: colors.black,
                    fontWeight: '700',
                    alignSelf: 'center',
                    marginTop: 1.5,
                  }}>
                  {t('str_You_agree_that_you_are_18_or_older')}
                </Text>
              </View>
            </View>
            <CustomGradientButton
              title={t('str_SIGNUP')}
              onPress={() => this.onSubmit(t)}
              buttonStyle={{borderRadius: 100, marginTop: '5%'}}
              textStyle={{fontSize: 17}}
              colorstyle={true}
            />
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.textNormal}>
              {t('str_Already_have_an_account?')}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AppStarter')}>
              <Text style={styles.textNormalWithColor}>
                {t('str_Login_Now')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {signUpUser};
export default compose(withTranslation(), connect(null, actions))(Signup);
