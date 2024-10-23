import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';
import AppBackground from '../../../components/AppBackground';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {CustomTextInputWithHeading} from '../../../components/CustomTextInput';
import NavService from '../../../helpers/NavService';
import {schema} from '../../../utils/validation';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {changePassword} from '../../../redux/actions/appAction'
class ChangePassword extends Component {
  state = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };

  render() {
    const {t} = this?.props;
    const {old_password, new_password, confirm_password} = this.state;
    const updateImageInGallery = (path, mime, type) => {
      this.setState({profileImage: {path, mime, type}});
    };
    const strongRegex =
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})';
    submit = t => {
      if (!old_password)
        return Toast.show({
          text1: t('str_Current_password_is_required'),
          type: 'error',
          visibilityTime: 3000,
        });
      // if (!schema.validate(cpassword))
      //   return Toast.show({
      //     type: 'error',
      //     text1: t('str_Current_password_must_be_8_characters_long'),
      //     text2: 'Contain uppercase,lowercase,numeric and special character',
      //     visibilityTime: 3000,
      //   });
      if (!new_password)
        return Toast.show({
          text1: t('str_New_password_is_required'),
          type: 'error',
          visibilityTime: 3000,
        });
      if (!schema.validate(new_password))
        return Toast.show({
          type: 'error',
          text1: t('str_New_Password_must_be_8_characters_long'),
          text2: t('str_contain_atleast_1_uppercase_1_lowercase_1_digit_and_1_special_character'),
          visibilityTime: 3000,
        });
      if (old_password == new_password)
        return Toast.show({
          text1: t("str_Current_password_and_new_password_can't_be_same"),
          type: 'error',
          visibilityTime: 3000,
        });
      if (!confirm_password)
        return Toast.show({
          text1: t('str_Confirm_new_password_is_required'),
          type: 'error',
          visibilityTime: 3000,
        });
      if (!schema.validate(confirm_password))
        return Toast.show({
          type: 'error',
          text1: t('str_Confirm_new_password_is_required'),
          text2: t(
            'str_Contain_uppercase,_lowercase,_numeric_and_special_character',
          ),
          visibilityTime: 3000,
        });
      if (new_password !== confirm_password)
        return Toast.show({
          text1: t('str_Password_and_Confirm_new_password_must_be_same'),
          type: 'error',
          visibilityTime: 3000,
        });
      else {

        let payload ={
          old_password: old_password ,
           new_password:new_password,
            confirm_password:confirm_password
        }
        Keyboard.dismiss()
        this?.props?.changePassword(payload)
      //   Toast.show({
      //     text1: t('str_Password_change_successfully'),
      //     type: 'success',
      //     visibilityTime: 3000,
      //   });
      }
      // NavService.goBack();
    };
    return (
      <AppBackground title={t('str_Change_Password')} back={true}>
        <ScrollView>
          <View style={{marginHorizontal: 40}}>
            <CustomTextInputWithHeading
              heading={t('str_Current_Password')}
              placeholder={t('str_Enter_current_password')}
              Onchange={value => this.setState({old_password: value})}
              value={old_password}
              isPassword={true}
              maxLength={30}
            />
            <CustomTextInputWithHeading
              heading={t('str_New_Password')}
              placeholder={t('str_Enter_a_new_password')}
              Onchange={value => this.setState({new_password: value})}
              value={new_password}
              isPassword={true}
              maxLength={30}
            />
            <CustomTextInputWithHeading
              heading={t('str_Confirm_New_Password')}
              placeholder={t('str_Enter_a_new_password')}
              Onchange={value => this.setState({confirm_password: value})}
              value={confirm_password}
              isPassword={true}
              maxLength={30}
            />
          </View>
          <CustomGradientButton
            buttonStyle={{width: '87%'}}
            title={t('str_SAVE')}
            colorstyle={true}
            onPress={() => submit(t)}
          />
        </ScrollView>
      </AppBackground>
    );
  }
}
const actions = {changePassword }
export default compose(withTranslation(), connect(null,actions))(ChangePassword);

