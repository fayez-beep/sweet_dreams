import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, BackHandler} from 'react-native';
import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import CustomBackground from '../../../components/CustomBackground';
import {appIcons, appLogos} from '../../../assets/index';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {colors} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import styles from './styles';
import {family} from '../../../utils';
import {useDispatch} from 'react-redux';
import {size} from '../../../utils';
import {
  otpVerify,
  resendOTP,
  resendOTP_forget_password,
} from '../../../redux/actions//authAction';

const Otp = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {screenName, user_id, email, userName} = route.params;

  const {t} = useTranslation();
  let timer;
  const [code, setCode] = useState();
  const [timerCode, setTimerCode] = useState(59);
  const [resend, setResend] = useState(false);

  const onSubmit = t => {
    if (code?.length > 0) {
      if (screenName == 'verification') {
        let payload = {
          user_id: user_id,
          otp: code,
          type: screenName,
        };
        dispatch(otpVerify(payload, 'verification', userName));
      } else if (screenName === 'forgot') {
        let payload = {
          user_id: user_id,
          otp: code,
          type: screenName,
        };
        dispatch(otpVerify(payload, 'forgot'));
      }
    } else {
      Toast.show({
        text1: t('str_OTP_code_is_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  const startInterval = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode(timerCode => {
        if (timerCode > 0) {
          return timerCode - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
  };
  const handleReset = () => {
    if (resend) {
      setTimerCode(59);
      setResend(false);
      setCode();
      startInterval();
      if (screenName == 'verification') {
        let payload = {
          user_id: user_id,
        };
        dispatch(resendOTP(payload, screenName));
      } else {
        let payload = {
          email: email,
        };
        dispatch(resendOTP_forget_password(payload, screenName));
      }

      // Toast.show({
      //   text1: t(
      //     'str_We_have_resend_OTP_verification_code_at_our_email_address',
      //   ),
      //   type: 'error',
      //   visibilityTime: 3000,
      // });
    }
    // else {
    //   Toast.show({
    //     text1: t('str_Please_wait_untill_timer_finishes'),
    //     type: 'error',
    //     visibilityTime: 3000,
    //   });
    // }
  };
  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(timer);
    };
  }, []);

  //BACK HANDLER
  function handleBackButtonClick() {
    // navigation.navigate('AppStarter');
    navigation.reset({
      index: 0,
      routes: [{name: 'AppStarter'}],
    });
    return true;
  }
  useEffect(() => {
    BackHandler?.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler?.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <CustomBackground
      showLogo={false}
      titleText={t('str_VERIFICATION')}
      onBack={() => {
        // navigation.replace('AppStarter')
        navigation.reset({
          index: 0,
          routes: [{name: 'AppStarter'}],
        });
      }}>
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
          <View style={styles.timerContainer}>
            <Image source={appIcons.clock} style={styles.clock} />
            <Text style={styles.timerText}>
              {moment.utc(timerCode * 1000).format('mm:ss')}
            </Text>
          </View>
          <CustomGradientButton
            title={t('str_Done')}
            onPress={() => onSubmit(t)}
            buttonStyle={{borderRadius: 100, marginTop: '5%'}}
            textStyle={{fontSize: size.medium}}
            colorstyle={true}
          />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.textNormal}>{t("str_Didn't_Receive_Code?")}</Text>
          <TouchableOpacity
            disabled={resend ? false : true}
            onPress={() => handleReset()}>
            <Text style={styles.textNormalWithColor}>{t('str_Resend')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomBackground>
  );
};

export default Otp;
