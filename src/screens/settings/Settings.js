import React, {useState, useEffect} from 'react';
import {View, Text, Switch, BackHandler, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {openLink} from '../../helpers/BrowserUrl';
import AppBackground from '../../components/AppBackground';
import CustomGradientButton from '../../components/CustomGradientButton';
import {
  toggleNotifications,
  deleteAccount,
} from '../../redux/actions/appAction';
import {colors} from '../../utils';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.appReducer);
  const {user} = useSelector(state => state.authReducer);
  const [notification, setNotification] = useState(appState.notification);
  const {t} = useTranslation();
  const TandC = async () => {
    const url = `https://www.google.com`;
    openLink(url);
  };
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };

  const toggleNotification = () => {
    const payload = {
      notification: notification ? 0 : 1,
    };
    setNotification(prevNotification => !prevNotification);
    dispatch(
      toggleNotifications(payload, response => {
        if (response.status === 0) {
          setNotification(prevNotification => !prevNotification);
        }
      }),
    );
  };

  const deleteUser = () => {
    dispatch(
      deleteAccount(response => {
        console.log('response', response);
      }),
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  return (
    <AppBackground
      back
      title={t('str_Settings')}
      Save={false}
      marginHorizontal={false}>
      <View style={styles.container}>
        <View style={{marginTop: 10}}>
          {user?.is_social !== 1 ? (
            <CustomGradientButton
              title={t('str_CHANGE_PASSWORD')}
              colorstyle={true}
              styleWidth={true}
              linearHeight={styles.button}
              onPress={() => navigation.navigate('ChangePassword')}
              textStyle={styles.txt}
            />
          ) : null}
          <CustomGradientButton
            colorstyle={true}
            styleWidth={true}
            linearHeight={styles.button}
            title={t('str_PRIVACY_POLICY')}
            onPress={() => TandC()}
            textStyle={styles.txt}
          />
        </View>
        <View
          style={{
            borderColor: colors.lightGray,
            borderBottomWidth: 1,

            marginTop: 20,
          }}
        />
        <View style={styles.switchButton}>
          <Text style={styles.switchText}>{t('str_Enable_Notifications')}</Text>
          <Switch
            trackColor={{false: colors.gray, true: 'rgb(17,221,81)'}}
            thumbColor={'#fff'}
            ios_backgroundColor={colors.gray}
            onValueChange={toggleNotification}
            value={notification}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.9}]}}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={deleteUser}>
          <Text style={styles.btnTxt}>{t('str_Delete_Account')}</Text>
        </TouchableOpacity>
      </View>
    </AppBackground>
  );
};

export default Settings;
