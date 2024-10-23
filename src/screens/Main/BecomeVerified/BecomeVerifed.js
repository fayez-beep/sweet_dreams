import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {CustomTextInputWithHeading} from '../../../components/CustomTextInput';
import {appIcons} from '../../../assets';
import {colors, size, family} from '../../../utils';
import NavService from '../../../helpers/NavService';
import ImagePicker from '../../../components/ImagePicker';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {becomeVerified} from '../../../redux/actions/appAction';
class BecomeVerifed extends Component {
  state = {
    name: '',
    profileImage: null,
  };

  onSubmit = () => {
    const {name, profileImage} = this.state;
    const {t} = this.props;

    if (!name) {
      Toast.show({
        text1: t('str_legal_name_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!profileImage) {
      Toast.show({
        text1: t('str_driver_license_required'),
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      const payload = new FormData();
      payload.append('legal_name', `${name}`);
      payload.append('driver_license', {
        uri: profileImage?.path,
        name: `Profile${Date.now()}.${profileImage?.mime.slice(
          profileImage?.path.lastIndexOf('/') + 1,
        )}`,
        type: profileImage?.mime,
      });
      this.props.becomeVerified(payload, response => {
        Toast.show({
          text1: t('str_legal_name_added'),
          type: 'success',
          visibilityTime: 3000,
        });
        NavService.goBack();
      });
    }
  };
  render() {
    const {t} = this.props;

    const {name, profileImage} = this.state;
    const updateImageInGallery = (path, mime, type) => {
      this.setState({profileImage: {path, mime, type}});
    };
    console.log(name, 'namename');

    return (
      <AppBackground Save={false} title="Become Verified" back={true}>
        <View style={{marginHorizontal: 50}}>
          <View style={{marginBottom: 50}}>
            <CustomTextInputWithHeading
              heading={t('str_Legal_Name')}
              placeholder={t('str_Enter_Name')}
              Onchange={value => this.setState({name: value})}
              value={name}
              customStyles={{
                marginTop: 70,
                marginBottom: 20,
                backgroundColor: colors.white,
                borderRadius: 30,
                paddingHorizontal: 10,
              }}
            />
          </View>
          <Text style={styles.heading}>{t("str_Upload_Driver's_License")}</Text>
          <View
            style={{
              flexDirection: 'row',
              // marginHorizontal: 20,
              marginVertical: 10,
            }}>
            {profileImage !== null && (
              <TouchableOpacity
                style={styles.ImageContainer}
                onPress={() => this.setState({profileImage: null})}>
                <Image
                  resizeMode="cover"
                  style={{width: 8, height: 8}}
                  source={appIcons.close}
                />
              </TouchableOpacity>
            )}
            {profileImage && (
              <View style={styles.profileImage}>
                <Image
                  source={{uri: profileImage?.path}}
                  style={{width: 40, height: 40}}
                />
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.TouchableOpacity,
                {marginHorizontal: profileImage ? 15 : 0},
              ]}>
              <ImagePicker
                style={{alignItems: 'center'}}
                onImageChange={(path, mime, type) => {
                  updateImageInGallery(path, mime, type);
                }}>
                <Image
                  source={appIcons.upload}
                  style={{width: 25, height: 25, tintColor: colors.primary}}
                />
              </ImagePicker>
            </TouchableOpacity>
          </View>
        </View>
        <CustomGradientButton
          title={t('str_APPLY')}
          colorstyle={true}
          onPress={this.onSubmit}
        />
      </AppBackground>
    );
  }
}
const actions = {becomeVerified};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(BecomeVerifed);
