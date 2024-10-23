import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomModal from './CustomModal';
import {colors, family, size} from '../utils';
import CustomButton from './CustomButton';
import {useTranslation} from 'react-i18next';
import RadioButton from './RadioButton';
import {CustomTextInputWithHeading} from './CustomTextInput';
import {appIcons, appImages} from '../assets';
import Img from './Img';
import {ImageBackground} from 'react-native';
import CustomGradientButton from './CustomGradientButton';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const ConfirmationModal = ({
  curentFocus,
  selectedValue,
  handleRadioSelect = () => {},
  visible = false,
  toggleVisibility = () => {},
  title = '',
  subTitle = '',
  onAccept = () => {},
  onPress,
  reportType,
}) => {
  const {t} = useTranslation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [something, setSomething] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  let options = [
    {id: 1, label: t('str_sexually_explicit')},
    {id: 2, label: t('str_promoted_violence')},
    {id: 3, label: t('str_harras')},
    {id: 4, label: t('str_suicidal')},
    {id: 5, label: t('str_false_info')},
    {id: 6, label: t('str_spam')},
    {id: 7, label: t('str_hate_speech')},
    {id: 8, label: t('str_terrorism')},
    {id: 9, label: t('str_something_else')},
  ];

  return (
    <CustomModal
      visible={visible}
      togglePopup={toggleVisibility}
      style={{height: 400}}>
      <Toast />
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          height:
            reportType?.label == `${t('str_Hide')}` ||
            reportType?.label == `${t('str_UnHide')}` ||
            reportType?.label == `${t('str_Save')}` ||
            reportType?.label == `${t('str_unsave')}`
              ? 200
              : reportType?.label == `${t('str_Report')}`
              ? 300
              : 0,
          // bottom: Platform.OS === 'ios' || isKeyboardOpen ? '35%' : '10%',
          bottom:
            Platform.OS === 'ios'
              ? isKeyboardOpen
                ? '35%'
                : '10%'
              : Platform.OS === 'android'
              ? isKeyboardOpen
                ? '33%'
                : '10%'
              : '10%',
        }}>
        {reportType?.label == `${t('str_Report')}` ? (
          // <View>
          //   <Img
          //     local
          //     src={appImages.subs1}
          //     resizeMode={'contain'}
          //     style={{
          //       // flex: 1,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       // paddingHorizontal: 60,
          //     }}
          //   />
          //   {/* <Text
          //     style={[
          //       styles.textTitle,
          //       {
          //         color: 'white',
          //         textAlign: 'center',
          //         fontSize:
          //           reportType == `${t('str_Hide')}`
          //             ? 20
          //             : `${t('str_Save')}`
          //             ? 20
          //             : size.small,
          //         marginTop:
          //           reportType == `${t('str_Hide')}`
          //             ? 20
          //             : `${t('str_Save')}`
          //             ? 20
          //             : 0,
          //       },
          //     ]}>
          //     {title}
          //   </Text> */}
          //   {/* <View style={styles.btnView}> */}
          //   <CustomButton
          //     title="Yes"
          //     onPress={() => {
          //       onAccept();
          //     }}
          //     // buttonStyle={[styles.btnContainer2]}
          //     textStyle={styles.textstyle}
          //   />

          //   <CustomButton
          //     title="No"
          //     onPress={() => {
          //       toggleVisibility();
          //     }}
          //     buttonStyle={[
          //       {
          //         borderColor: '#1E756D',
          //         backgroundColor: colors.background,
          //       },
          //       // styles.btnContainer1,
          //     ]}
          //     textStyle={styles.textstyle}
          //   />
          // </View>

          <View
            style={[
              styles.container,
              {
                height:
                  Platform.OS === 'ios'
                    ? selectedValue === t('str_something_else')
                      ? responsiveHeight(59)
                      : responsiveHeight(47)
                    : selectedValue === t('str_something_else')
                    ? responsiveHeight(65)
                    : responsiveHeight(53),

                marginBottom:
                  Platform.OS === 'ios' &&
                  selectedValue === t('str_something_else')
                    ? responsiveHeight(20)
                    : 1,
              },
            ]}>
            {/* <Img
            src={appImages.subs1}
            local
            style={{height: 100, width: 100}}
          /> */}
            <Text
              style={[
                styles.textTitle,
                {
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 20,
                  // marginTop: 20,
                },
              ]}>
              {title}
            </Text>
            {/* <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}> */}
            {reportType?.label === `${t('str_Report')}`
              ? options.map((value, index) => {
                  return (
                    <View key={index + 1}>
                      <RadioButton
                        key={index}
                        label={value.label}
                        selected={selectedValue === value.label}
                        onSelect={() => {
                          setSomething('');
                          handleRadioSelect(value.label);
                        }}
                      />
                    </View>
                  );
                })
              : null}
            {/* </ScrollView> */}
            {selectedValue === t('str_something_else') && (
              // <CustomTextInputWithHeading
              //   topFalse
              //   placeholder={t('str_write_something')}
              //   Onchange={value => curentFocus.setState({reportOther: value})}
              //   value={curentFocus.state.reportOther}
              //   multiline={true}
              //   textStyle
              //   maxLength={275}
              //   // style={{}}
              // />
              <View
                style={{
                  backgroundColor: colors.white,
                  elevation: 1,
                  height: 100,
                  borderColor: 'black',
                  marginHorizontal: 6,
                  borderWidth: 0.3,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <TextInput
                  multiline
                  maxLength={275}
                  onChangeText={txt => {
                    setSomething(txt);
                  }}
                  value={something}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  autoFocus
                  placeholderTextColor={colors.gray}
                  placeholder={t('str_write_something')}
                  style={{
                    padding: 0,
                    color: colors.black,
                  }}
                />
              </View>
            )}
            <View style={styles.btnView}>
              <CustomButton
                title={t('str_Cancel')}
                onPress={() => {
                  toggleVisibility();
                }}
                buttonStyle={[
                  {
                    borderColor: '#1E756D',
                    backgroundColor: colors.background,
                  },
                  styles.btnContainer1,
                ]}
                textStyle={styles.textstyle}
              />
              <CustomButton
                title={t('str-Submit')}
                onPress={() => {
                  onAccept(selectedValue, something);
                  setSomething('');
                }}
                buttonStyle={[styles.btnContainer2]}
                textStyle={styles.textstyle}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageBackground
              source={appImages.subs1}
              resizeMode="contain"
              style={styles.image}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.cloudTitle}>{t('str_alert')}</Text>
                <Text style={styles.cloudText}>
                  {reportType?.label == `${t('str_Hide')}`
                    ? t('str_Hidee')
                    : reportType?.label == `${t('str_UnHide')}`
                    ? t('str_Hideee')
                    : reportType?.label == `${t('str_unsave')}`
                    ? t('str_unSaves')
                    : `${t('str_Saves')}`}
                </Text>
              </View>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                bottom: 20,
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <CustomButton
                title={t('str_yes')}
                onPress={() => {
                  onAccept();
                }}
                buttonStyle={[styles.yes, {marginRight: 20}]}
                textStyle={styles.textstyle}
              />
              <CustomButton
                title={t('str_no')}
                onPress={() => {
                  toggleVisibility();
                }}
                buttonStyle={[styles.yes, {backgroundColor: colors.secondary}]}
                textStyle={styles.textstyle}
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </CustomModal>
  );
};
export default ConfirmationModal;

const styles = StyleSheet.create({
  cloudTitle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    // flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 80,
  },

  // container: {
  //   borderRadius: 10,
  //   ...Shadows.shadow3,
  //   padding: 20,
  //   bottom: 120,
  //   // alignSelf: 'center',
  //   backgroundColor: colors.white,
  // justifyContent:'center'
  // },
  container: {
    borderRadius: 10,
    ...Shadows.shadow3,
    // height: 430,
    paddingHorizontal: 10,
    // paddingVertical: 20,
    // padding: 20,
    // bottom: 120,
    // alignSelf: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  textTitle: {
    fontWeight: '500',
    fontSize: size.small,
    marginVertical: 5,
    color: 'black',
  },
  textstyle: {
    color: colors.white,
    fontSize: size.medium,
    fontWeight: '600',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cloudText: {
    color: colors.white,
    fontWeight: '700',
  },
  btnContainer1: {
    marginTop: 20,
    borderRadius: 100,
    height: 50,
    width: '47%',
    backgroundColor: colors.secondary,
  },
  btnContainer2: {
    marginTop: 20,
    width: '47%',
    borderRadius: 100,
    height: 50,
    backgroundColor: colors.primary,
  },
  yes: {
    width: '30%',
    height: 40,
  },
  input: {
    marginBottom: 20,
    width: '90%',
    color: colors.black,
  },
});
