/**
 * Boiler Plate React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  Platform,
  LogBox,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import store, {persistor} from './src/redux';
import Loader from './src/helpers/Loader';
import MainNavigation from './src/routes';
import {colors} from './src/utils';
import i18n from './src/helpers/i18n';
import {WEB_SOCKET_URL} from './src/config/WebService';
import {io} from 'socket.io-client';
import {saveSocket} from './src/redux/actions/appAction';
import { StripeProvider } from '@stripe/stripe-react-native';

const {width} = Dimensions.get('screen');
// ignore warnings
LogBox.ignoreAllLogs();

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.primary,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
      text2Style={{
        fontSize: 13,
        color: 'red',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.red,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
      text2Style={{
        fontSize: 10,
      }}
    />
  ),
  tomatoToast: ({text1, text2, props}) => (
    <View
      style={{
        height: 60,
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
      }}>
      <View
        style={{
          backgroundColor: 'red',
          height: 60,
          width: 7,
          position: 'absolute',
          left: 0,
          top: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <Text
        style={{
          fontSize: width * 0.035,
          color: colors.black,
          fontWeight: 'bold',
        }}>
        {text1}
      </Text>
      <Text style={{color: colors.gray, fontSize: width * 0.028}}>{text2}</Text>
    </View>
  ),
};

const App = () => {
  useEffect(() => {
    const socket = io(WEB_SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to server');
      Toast.show({
        text1: 'Socket Connected!',
        type: 'success',
        visibilityTime: 3000,
      });
      saveSocket(socket);
    });

    socket?.on('connect_error', error => {
      console.error('connect_error:', error);
      saveSocket(null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <StripeProvider publishableKey="">
      <GestureHandlerRootView
        style={[styles.container, styles.containerWhiteBackground]}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Loader />
              <MainNavigation />
              <Toast config={toastConfig} />
            </PersistGate>
          </Provider>
        </I18nextProvider>
      </GestureHandlerRootView>
      </StripeProvider>
    </Wrapper>
  );
};

export default App;

const Wrapper = ({children}) => {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={[styles.container, styles.containerWhiteBackground]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  return (
    <View style={[styles.container, styles.containerWhiteBackground]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWhiteBackground: {
    backgroundColor: colors.white,
  },
});
