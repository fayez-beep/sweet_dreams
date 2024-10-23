import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import Toast from 'react-native-toast-message';
import CustomBackground from '../../../components/CustomBackground';
import {CustomPhoneInput} from '../../../components/CustomTextInput';
import {colors, size, family} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import CustomGradientButton from '../../../components/CustomGradientButton';
import SocialSignin from '../../../components/SocialSignin';
import styles from './styles';

class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      formattedValue: '',
    };
  }

  onSubmit = async t => {
    const {phone_number, formattedValue} = this.state;
    if (!formattedValue) {
      Toast.show({
        text1: 'Please enter phone Number',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      console.log(phone_number, formattedValue);
      Keyboard.dismiss();
      await SocialSignin.signInWithPhoneNumber(
        `+${phone_number}`,
        formattedValue,
      );
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({
        phone_number: '',
        formattedValue: '',
      });
    });
  }

  render() {
    const {phone_number, formattedValue} = this.state;
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
            <CustomPhoneInput
              leftIcon={appIcons.phone}
              placeholder={t('str_Phone_Number')}
              placeholderTextColor={colors.gray}
              containerStyle={{
                borderColor: colors.offWhite,
                marginBottom: 15,
              }}
              borderStyles={{borderLeftWidth: 1}}
              value={formattedValue}
              formattedPhoneNumber={formattedValue}
              phoneNumber={phone_number}
              onChangePhoneInput={(phoneNumberFormat, phoneNumber) =>
                this.setState({
                  formattedValue: phoneNumberFormat,
                  phone_number: phoneNumber,
                })
              }
            />

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
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.textNormalWithColor}>{t('str_Signup')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {};
export default compose(withTranslation(), connect(null, actions))(PhoneLogin);
