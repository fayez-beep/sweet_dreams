import React, {Component, createRef} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ActionSheet from 'react-native-actions-sheet';
import {compose} from 'redux';
import {colors, WP, size, family} from '../utils';
import NavService from '../helpers/NavService';
import {appIcons} from '../assets';
import {openLink} from '../helpers/BrowserUrl';
import {logoutCurrentUser} from '../redux/actions/authAction';
import {withTranslation} from 'react-i18next';
import i18n from '../helpers/i18n';
import {ASSETS_URL} from '../config/WebService';
const {width} = Dimensions.get('window');

class Drawer extends Component {
  state = {
    startLanguage: 'sp',
    selectLanguage: [],
    ListOfLanguages: [
      {
        startLang: 'en',
        state_name: 'English',
        state_img: appIcons.america,
      },
      {
        startLang: 'sp',
        state_name: 'Spanish',
        state_img: appIcons.spanish,
      },
    ],
  };
  changeLanguage = value => {
    // console.log(value);
    i18n
      .changeLanguage(value)
      .then(() => this.setState({startLanguage: value}))
      .catch(err => console.log('error', err));
  };
  render() {
    const {t} = this.props;
    console.log(this?.props?.user,'drawer');
    const menuItems = [
      {
        icon: appIcons.tabhome,
        title: t('str_Home'),
        nav: 'BottomTabs',
      },
      {
        icon: appIcons.logo,
        title: t('str_Sweet_DreamZZZ'),
        nav: 'Subscription',
      },

      {
        icon: appIcons.setting,
        title: t('str_Settings'),
        nav: 'Settings',
      },
      {
        icon: appIcons.faq,
        title: t('str_FAQs'),
        nav: 'Faqs',
      },
      {
        icon: appIcons.termsConditions,
        title: t('str_Terms_&_Conditions'),
        // nav: TandC,
      },
      {
        icon: appIcons.logout,
        title: t('str_Logout'),
        nav: 'Sign Out',
      },
    ];
    // const {user} = this.props;
    const {selectLanguage, ListOfLanguages} = this.state;
    const actionSheetLanguageRef = createRef();
    const RenderItem = ({item, index}) => {
      const {title, icon, nav} = item;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (title === t('str_Logout')) {
              let payload ={
                is_social:this?.props?.user?.is_social
              }
              this.props.logoutCurrentUser(payload);
            } else if (title == t('str_Terms_&_Conditions')) {
              openLink(`https://www.google.com`);
            } else {
              this.props.navigation.navigate(nav);
            }
          }}
          style={{
            paddingHorizontal: 20,
            width: index == 0 ? '50%' : '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            alignContent: 'center',
            backgroundColor: index == 0 ? colors.primary : 'transparent',
            borderTopRightRadius: index == 0 ? 50 : 0,
            borderBottomRightRadius: index == 0 ? 50 : 0,
            padding: index == 0 ? 5 : 0,
          }}>
          <View
            style={{
              paddingVertical: 10,
              borderRadius: 7,
              marginBottom: 5,
            }}>
            <Image
              source={icon}
              style={{
                width: index == 1 ? 30 : 20,
                height: index == 1 ? 30 : 20,
                resizeMode: 'cover',
                tintColor:
                  index == 2
                    ? colors.darkGray
                    : index == 0
                    ? colors.white
                    : title == t('str_Logout')
                    ? colors.darkGray
                    : '',
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: index == 1 ? 2 : 8,
              color: index == 0 ? colors.white : colors.darkGray,
              fontSize: size.normal,
              fontFamily: family?.CherryCreamSodaRegular,
            }}>
            {title}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.bgApp,
          alignItems: 'center',
          paddingTop: getStatusBarHeight(),
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        {/* {language Action Sheet} */}
        <ActionSheet
          ref={actionSheetLanguageRef}
          containerStyle={{backgroundColor: 'transparent'}}>
          <View style={{padding: 10, paddingBottom: 20}}>
            <ActionSheetComponent
              changeLanguage={this.changeLanguage}
              title={t('str_SelectLanguage')}
              dataset={ListOfLanguages}
              onPress={async item => {
                actionSheetLanguageRef.current.hide();
                this.setState({
                  selectLanguage: [item?.state_name, item?.state_img],
                });
              }}
            />
            <TouchableOpacity
              onPress={() => actionSheetLanguageRef.current.hide()}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                paddingVertical: 12,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'rgb(0,88,200)',
                  fontSize: size.large,
                  // fontWeight: '600',
                  fontFamily: family?.ArialCE,
                }}>
                {t('str_Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>
        <View
          style={{
            // justifyContent: 'flex-start',
            // padding: 15,
            flexDirection: 'row',
            marginBottom: 30,
            paddingHorizontal: '20%',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              marginTop: 8,
              borderWidth: 3,
              borderRadius: 120 / 2,
              borderColor: colors.primary,
            }}
            // resizeMode="contain"
            source={
              this?.props?.user?.profile_image !== null
                ? {uri: ASSETS_URL + this?.props?.user?.profile_image}
                : appIcons.userPlaceholder
            }
          />

          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 8,
              // marginTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: size.large,
                  // fontWeight: '700',
                  color: colors.black,
                  fontFamily: family?.ArialCE,
                }}>
                {this?.props?.user?.full_name}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              {this?.props?.user?.email ? (
                <Image
                  source={appIcons.email}
                  resizeMode="contain"
                  style={{width: 16, height: 16, tintColor: colors.primary}}
                />
              ) : null}

              <Text
                style={{
                  color: colors.black,
                  fontSize: size.xsmall,
                  marginLeft: 5,
                  fontFamily: family?.ArialCE,
                }}>
                {this?.props?.user?.email || this?.props?.user?.phone_number}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: 25,
                width: WP('30%'),
                padding: 7,
                marginVertical: 5,
              }}
              onPress={() => {
                // NavigationService.closeDrawer()
                NavService.navigate('EditProfile', {data: this?.props?.user});
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: size.xxsmall,
                  textAlign: 'center',
                  // fontWeight: '400',
                  fontFamily: family?.ArialCE,
                }}>
                {t('str_Edit_Profile')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, marginTop: 10, width: '100%'}}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={menuItems}
            style={{
              height: '100%',
              // paddingHorizontal: 20,
            }}
            renderItem={props => <RenderItem {...props} />}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
const actions = {logoutCurrentUser};

export default compose(withTranslation(), connect(mapStateToProps, actions))(Drawer);

const ActionSheetComponent = ({
  changeLanguage,
  title = '',
  dataset = [],
  onPress = () => {},
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(241,241,241,0.9)',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: '#ccc',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: 'rgb(0,88,200)',
            textAlign: 'center',
            fontSize: size.large,
            // fontWeight: '500',
            fontFamily: family?.ArialCE,
          }}>
          {title}
        </Text>
      </View>
      <ScrollView style={{maxHeight: 200}} showsVerticalScrollIndicator={false}>
        {dataset.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onPress(item);
                changeLanguage(item?.startLang);
              }}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image
                source={item?.state_img}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  left: width / 3,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: size.normal,
                  fontFamily: family?.ArialCE,
                }}
                numberOfLines={1}>
                {item?.state_name?.length ? item?.state_name : item?.city_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
