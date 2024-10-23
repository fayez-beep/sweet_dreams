import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, Keyboard, BackHandler} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInputView from '../../../components/CustomTextInputView';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {colors} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import {schema} from '../../../utils/validation';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import styles from './styles';
import CustomGradientButton from '../../../components/CustomGradientButton';
import { resetPassword } from '../../../redux/actions/authAction';
import { keyboardAppearance } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
class ResetPassword extends Component {
  state = {
    password: '',
    ConfirmPassword: '',
  };

  onSubmit = t => {
    const {password, ConfirmPassword} = this.state;
    const email = this?.props?.route?.params?.email
    // console.log(email,'resent screen');
    if (!password) {
      Toast.show({
        text1: t('str_New_password_is_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    } 
    else if (!schema.validate(password)) {
      Toast.show({
        text1: t('str_password_validation_Message'),
        text2:t('str_contain_atleast_1_uppercase_1_lowercase_1_digit_and_1_special_character'),
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else if (!ConfirmPassword) {
      Toast.show({
        text1: t('str_Confirm_password_is_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    }  else if (password != ConfirmPassword) {
      Toast.show({
        text1: t('str_Password_and_Confirm_new_password_must_be_same'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload={
        email:email,
         password:password
      }
      Keyboard.dismiss()
      this?.props?.resetPassword(payload)

    }
  };

     //BACK HANDLER
     handleBackButtonClick(navigation) {
      navigation?.navigate('Login');
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
    }

  render() {
    const {password, ConfirmPassword} = this.state;
    const {t} = this.props;
    return (
      <CustomBackground
        showLogo={false}
        titleText={t('str_RESET_PASSWORD')}
        onBack={() => this.props.navigation.navigate('Login')}>
        <View style={styles.container}>
          <View style={[styles.container, {marginTop: 20}]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <View style={styles.textNormal}>
              <CustomTextInputView
                placeholder={t('str_New_Password')}
                Onchange={value => this.setState({password: value})}
                label={t('str_Password')}
                lock={'Lock'}
                leftIcon={appIcons.lock}
                rightIcon={true}
                value={password}
                containerStyle={{
                  width: '90%',
                }}
                maxLength={30}
              />
              <CustomTextInputView
                placeholder={t('str_Confirm_Password')}
                Onchange={value => this.setState({ConfirmPassword: value})}
                label={t('str_Confirm_Password')}
                leftIcon={appIcons.lock}
                rightIcon={true}
                lock={'Lock'}
                value={ConfirmPassword}
                containerStyle={{
                  width: '90%',
                }}
                maxLength={30}
              />

              <CustomGradientButton
                title={t('str-SUBMIT')}
                onPress={() => this.onSubmit(t)}
                buttonStyle={{borderRadius: 100, marginTop: '5%'}}
                textStyle={{fontSize: 17}}
                colorstyle={true}
              />
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {resetPassword}
export default compose(withTranslation(), connect(null, actions))(ResetPassword);
