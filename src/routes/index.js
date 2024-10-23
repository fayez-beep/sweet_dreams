// @app
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
// @navigations
import AuthNavigation from './stacks/authNavigation';
import AppNavigation from './stacks/appNavigation';
import {_AppLayout} from '../redux/actions';
// Nav Service
import NavService from '../helpers/NavService';
import {openSettings, requestNotifications} from 'react-native-permissions';
import Toast from 'react-native-toast-message';

class MainNavigation extends Component {
  componentDidMount() {
    Orientation.lockToPortrait();
    this.requestNotificationPermission();
    // requestUserPermission();
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }
  requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      requestNotifications(['alert', 'sound', 'badge', 'carPlay']).then(
        ({status, settings}) => {
          if (status === 'granted') {
          } else if (status === 'denied') {
            Toast.show({
              text1: 'Please open notification setting to recieve notification',
              type: 'error',
              visibilityTime: 5000,
            });
            openSettings();
          } else if (status === 'blocked') {
            Toast.show({
              text1: 'Please open notification setting to recieve notification',
              type: 'error',
              visibilityTime: 5000,
            });
            openSettings();
          }
        },
      );
    }

    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });
    console.log(authStatus, 'authhStatussss');
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await this.registerForNotifications();
    }
  };
  registerForNotifications = async () => {
    const isRegisted = messaging().isDeviceRegisteredForRemoteMessages;
    if (isRegisted) {
      await messaging().registerDeviceForRemoteMessages(); // calls await messaging().registerDeviceForRemoteMessages()
      this.recieveInitialNotificationMessages();
      this.receiveForegroundMessages();
      this.recieveBackgroundMessages();
    }
  };
  recieveInitialNotificationMessages = () => {
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        console.log('notification state quit: ', remoteMessage);
        await this.onNewNotification(remoteMessage, true);
      });
  };

  recieveBackgroundMessages = () => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('notification state background: ', remoteMessage); // background click
      this.onNewNotification(remoteMessage, true);
    });
  };

  receiveForegroundMessages = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('notification state foreground: ', remoteMessage); // background click
      const notification = remoteMessage?.data;
      Toast.show({
        text1: notification?.title,
        text2: notification?.body,
        type: 'success',
        visibilityTime: 8000,
        onPress: () => {
          // if (notification?.notification_route === '') {
          // }
        },
      });
    });
  };

  onNewNotification = (remoteMessage, isAppOpen) => {
    const {data} = remoteMessage;
    console.log('isAppOpenisAppOpen', isAppOpen);
    if (data?.notification_route === '') {
    }
  };

  render() {
    const loggedInUser = this.props?.user;
    return (
      <NavigationContainer ref={ref => NavService.setTopLevelNavigator(ref)}>
        <View style={styles.container}>
          {/* IF USER PROFILE STORE IS NOT EMPTY */}
          {loggedInUser ? (
            <AppNavigation initialRoute={undefined} />
          ) : (
            // <AppNavigation initialRoute={undefined} />
            <AuthNavigation initialRoute={undefined} />
          )}
          {/* IF USER PROFILE STORE IS EMPTY */}
        </View>
      </NavigationContainer>
    );
  }
}
function mapStateToProps({authReducer: {user}}) {
  return {
    user: user,
  };
}

export default connect(mapStateToProps)(MainNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
