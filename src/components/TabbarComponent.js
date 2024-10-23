import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import NavService from '../helpers/NavService';
import CustomButton from './CustomButton';
import Shadows from '../helpers/Shadows';
import {colors, size, family} from '../utils';
import {appIcons, appImages} from '../assets';
import LinearGradient from 'react-native-linear-gradient';
import {t} from 'i18next';

const {width} = Dimensions.get('screen');
export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardStatus: false,
      isVisible: false,
    };
  }
  componentDidMount() {
    this.showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboardStatus: true});
    });
    this.hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboardStatus: false});
    });
  }
  componentWillUnmount() {
    this.showSubscription.remove();
    this.hideSubscription.remove();
  }
  render() {
    const {isVisible, keyboardStatus} = this.state;
    const {state, navigation} = this.props;
    const togglePopUp = () => {
      this.setState({isVisible: !isVisible});
    };
    const navigateFromPopUp = nav => {
      togglePopUp();
      NavService.navigate(nav);
    };

    return (
      <ImageBackground
        source={appImages.tabbar}
        style={[
          {
            width: width,
            height: width * 0.275,
            position: 'absolute',
            bottom: 0,
            justifyContent: 'flex-end',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 5,
          },
          keyboardStatus ? styles.hideTabNavigation : null,
        ]}
        imageStyle={{
          width: width,
          height: width * 0.275,
        }}>
        <View
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
            justifyContent: 'space-around',
          }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              if (route.name === 'Home')
                navigation.navigate('BottomTabs', {screen: 'Home'});
              if (route.name === 'Journal')
                navigation.navigate('BottomTabs', {screen: 'Journal'});

              if (route.name === 'Chat')
                navigation.navigate('BottomTabs', {
                  screen: 'Chat',
                });
              if (route.name === 'Profile')
                navigation.navigate('BottomTabs', {screen: 'Profile'});
            };

            let imageSrc = appIcons.tabhome;
            if (route.name === 'Home') imageSrc = appIcons.tabhome;
            if (route.name === 'Journal') imageSrc = appIcons.tabjournal;
            if (route.name === 'Chat') imageSrc = appIcons.tabComment;
            if (route.name === 'Profile') imageSrc = appIcons.tabUser;

            if (route.name === 'tabBar4') {
              return <View key={index + 1} style={styles.tabs} />;
            }
            return (
              <TouchableOpacity
                key={index + 1}
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.tabs}>
                <Image
                  source={imageSrc}
                  style={{
                    height: 23,
                    width: 23,
                    tintColor: isFocused ? colors.primary : colors.gray,
                  }}
                  resizeMode="contain"
                />
                {isFocused ? (
                  <View
                    style={{
                      alignItems: 'center',
                      width: 30,
                      height: 30,
                      // left: 30,
                      // borderRadius: 16,
                      // borderBottomRightRadius: 16,
                      // borderBottomEndRadius: 16,

                      position: 'absolute',
                      top: -12,
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        width: 7,
                        height: 15,
                        borderRadius: 100,
                      }}
                    />
                    {/* <Image
                      source={appIcons.tabDot}
                      style={{width:14, height:14}}
                      resizeMode="cover"
                    /> */}
                  </View>
                ) : null}
                <Text
                  style={{
                    fontSize: size.xxtiny,
                    color: colors.darkGray,
                    marginVertical: 8,
                    fontFamily: family?.ArialCE,
                  }}>
                  {t(route?.name)}
                  {/* {route?.name} */}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => NavService.navigate('DreamType')}
          style={[
            {
              position: 'absolute',
              width: 70,
              height: 70,
              borderRadius: 120 / 2,
              backgroundColor: colors.primary,
              alignSelf: 'center',
              bottom: 45,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: colors.primary,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,

              elevation: 9,
            },
            keyboardStatus ? styles.hideTabNavigation : null,
          ]}>
          <LinearGradient
            colors={colors.gradient}
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                borderRadius: 120 / 2,
              },
            ]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1.4}}>
            <Image
              source={appIcons.plus}
              style={{
                height: 25,
                width: 25,
                tintColor: colors.white,
              }}
              resizeMode="contain"
            />
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: width * 0.4,
    borderRadius: 10,
  },
  buttonPerfectionNext: {
    backgroundColor: colors.secondary,
    marginLeft: 15,
  },
  tabs: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 5,
    height: 70,
  },
  hideTabNavigation: {
    width: 0,
    height: 0,
    position: 'absolute',
    bottom: 0,
  },
});
