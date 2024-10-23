import React, {Component, createRef} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import ActionSheet from 'react-native-actions-sheet';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import CustomBackground from '../../components/CustomBackground';
import CustomSelector from '../../components/TextWithActionSheet';
import CustomGradientButton from '../../components/CustomGradientButton';
import i18n from '../../helpers/i18n';
import NavService from '../../helpers/NavService';
import {appLogos} from '../../assets/index';
import {colors, size, family} from '../../utils';
import {toggleCurrentSelectedLanguage} from '../../redux/actions/appAction';
import {openLink} from '../../helpers/BrowserUrl';
import styles from './styles';

class LanguageSelector extends Component {
  state = {
    startLanguage: 'sp',
    selectLanguage: [],
    ListOfLanguages: [
      {
        startLang: 'en',
        state_name: 'English',
        // state_img: appIcons.america,
      },
      {
        startLang: 'sp',
        state_name: 'Espanol',
        // state_img: appIcons.spanish,
      },
    ],
  };
  handler = t => {
    const {selectLanguage} = this.state;

    if (selectLanguage.length <= 0) {
      Toast.show({
        text1: t('str_Select_Language_is_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      const lang = selectLanguage[0] === 'Espanol' ? 'sp' : 'en';
      this.props.toggleCurrentSelectedLanguage(lang);
      NavService.navigate('AppStarter');
    }
  };
  changeLanguage = value => {
    // console.log(value);
    i18n
      .changeLanguage(value)
      .then(() => this.setState({startLanguage: value}))
      .catch(err => console.log('error', err));
  };
  render() {
    // console.log(this?.props?.user, 'user=====');
    const {navigation, t} = this.props;
    const {selectLanguage, ListOfLanguages} = this.state;
    const actionSheetLanguageRef = createRef();
    const Redirect = () => {
      const url = `https://www.google.com`;
      openLink(url);
    };
    return (
      <CustomBackground
        back={false}
        showLogo={false}
        titleText={t('str_SelectLanguage')}>
        <View style={[styles.container, {padding: 20}]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
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
                    selectLanguage: [item?.state_name],
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
                    fontFamily: family?.ArialCE,
                    fontSize: size?.large,
                  }}>
                  {t('str_Cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetLanguageRef.current.show()}
            style={{width: '100%'}}>
            <CustomSelector
              icon
              placeholder={t('str_SelectLanguage')}
              value={selectLanguage}
              isDropdown={true}
              textAlign={'center'}
              languageSelectorScreen
            />
          </TouchableOpacity>

          <CustomGradientButton
            title={t('str_Next')}
            onPress={() => this.handler(t)}
            buttonStyle={{borderRadius: 100, marginTop: '20%'}}
            textStyle={{fontSize: 17}}
            colorstyle={true}
          />
          <View
            style={{position: 'absolute', bottom: 30, alignContent: 'center'}}>
            <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
              <TouchableOpacity onPress={() => Redirect()}>
                <Text style={styles.termsLink}>
                  {t('str_Terms_&_Conditions')}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 12,
                  color: colors.black,
                  fontSize: size.tiny,
                  fontFamily: family.ArialCE,
                }}>
                {' '}
                {t('str_and')}{' '}
              </Text>

              <TouchableOpacity onPress={() => Redirect()}>
                <Text style={styles.privacyLink}>
                  {t('str_PRIVACY_POLICY')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}

function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
const mapStateToDispatch = {toggleCurrentSelectedLanguage};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapStateToDispatch),
)(LanguageSelector);

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
            fontFamily: family?.ArialCE,
            fontSize: size?.large,
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
              {/* <Image
                source={item?.state_img}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  left: width / 3,
                }}
                resizeMode={'contain'}
              /> */}
              <Text
                style={{
                  color: '#000',
                  fontFamily: family?.ArialCE,
                  fontSize: size?.normal,
                }}
                numberOfLines={1}>
                {item?.state_name?.length ? item?.state_name : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
