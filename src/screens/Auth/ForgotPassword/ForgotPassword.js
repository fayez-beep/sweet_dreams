import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Keyboard,
} from 'react-native';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInputView from '../../../components/CustomTextInputView';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {colors, WP, size} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import styles from './styles';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {family} from '../../../utils';
import {forgotPassword} from '../../../redux/actions/authAction';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onSubmit = t => {
    const {email} = this.state;
    if (!email) {
      Toast.show({
        text1: t('str_Email_address_field_is_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: t('str_Please_enter_valid_email_address'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = {
        email: email,
      };
      Keyboard.dismiss();
      this?.props?.forgotPassword(payload, result => {
        if (result?.status == 1) {
          this.setState({email: ''});
        }
      });
    }
  };

  render() {
    const {email} = this.state;
    const {t} = this.props;
    return (
      <CustomBackground
        showLogo={false}
        titleText={t('str_Forgot_Password')}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <View style={[styles.container, {marginTop: 20}]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <View style={styles.textNormal}>
              <CustomTextInputView
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
                type={'email-address'}
                maxLength={35}
              />
              <CustomGradientButton
                title={t('str_GET_A_CODE')}
                onPress={() => this.onSubmit(t)}
                buttonStyle={{
                  borderRadius: 100,
                  marginTop: '5%',
                  width: WP('90%'),
                }}
                textStyle={{
                  fontSize: size.medium,
                  fontFamily: family?.ArialCE,
                }}
                colorstyle={true}
              />
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}

const actions = {forgotPassword};
export default compose(
  withTranslation(),
  connect(null, actions),
)(ForgotPassword);
