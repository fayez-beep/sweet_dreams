import React, {useEffect, useState} from 'react';
import {View, Image, Keyboard, Platform, BackHandler} from 'react-native';
import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import CustomBackground from '../../../components/CustomBackground';
import {appLogos} from '../../../assets/index';
import CustomGradientButton from '../../../components/CustomGradientButton';
import Shadows from '../../../helpers/Shadows';
import {family, size, colors} from '../../../utils';
import {socialSignin} from '../../../redux/actions//authAction';
import {
  loaderStart,
  loaderStop,
  getDeviceToken,
} from '../../../redux/actions/appAction';
import styles from './styles';

const PhoneOtp = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {screenName, data, phoneNumber} = route.params;
  const {t} = useTranslation();
  let timer;
  const [code, setCode] = useState();

  const onSubmit = async t => {
    if (code?.length > 0) {
      if (screenName == 'phone') {
        try {
          Keyboard.dismiss();
          dispatch(loaderStart());
          const fcmToken = await getDeviceToken();
          const result = await data?.confirm(code);
          let payload = {
            access_token: result?.user?.uid,
            provider: 'phone',
            device_type: Platform.OS,
            device_token: fcmToken,
            phone_number: result?.user?.phoneNumber,
          };
          dispatch(socialSignin(payload));
        } catch (error) {
          Toast.show({
            text1: 'OTP is invalid',
            type: 'error',
            visibilityTime: 3000,
          });
        } finally {
          dispatch(loaderStop());
        }
      }
    } else {
      Toast.show({
        text1: t('str_OTP_code_is_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

  //BACK HANDLER
  // function handleBackButtonClick() {
  //   navigation.navigate('Login');
  //   return true;
  // }
  // useEffect(() => {
  //   BackHandler?.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler?.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, []);
  return (
    <CustomBackground
      showLogo={false}
      titleText={t('str_VERIFICATION')}
      back
      // onBack={() => navigation.replace('Login')}
    >
      <View style={styles.container}>
        <View style={[styles.container, {marginTop: 20}]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>

          <OTPInputView
            code={code}
            pinCount={6}
            onCodeChanged={otp => {
              setCode(otp);
            }}
            style={styles.otpInput}
            // autoFocusOnLoad
            codeInputFieldStyle={{
              fontFamily: family?.ArialCE,
              borderColor: colors.white,
              backgroundColor: colors.white,
              ...Shadows.shadow3,
              color: colors.blue,
              borderRadius: 100,
              padding: 10,
            }}
          />
          <CustomGradientButton
            title={t('str_Done')}
            onPress={() => onSubmit(t)}
            buttonStyle={{borderRadius: 100, marginTop: '5%'}}
            textStyle={{fontSize: size.medium}}
            colorstyle={true}
          />
        </View>
      </View>
    </CustomBackground>
  );
};

export default PhoneOtp;
