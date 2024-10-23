import React, {Component} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';

// import appStyles from '../screens/appStyles.js';
import styles from './styles';
// import {makeStyles, styles} from './styles';
import {connect} from 'react-redux';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import CustomModal from '../CustomModal';
import {colors, family, size} from '../../utils';
import {appIcons, appImages} from '../../assets';
class ModalPopup extends Component {
  state = {
    isVisible: false,
    showModal: false,
  };

  render() {
    // const {theme} = this.props;
    // const styles = makeStyles(theme) || [];
    const {
      togglePopup,
      isVisible,
      onBackButtonPress,
      onBackdropPress,
      modalActive,
      title,
      onYesPress,
      onNoPress,
      desc,
      sucessText,
      unsuccessText,
      congratulation,
      value,
      onGoBack,
      onClose,
      modalTitle,
      modalIcon,
      onQrCode,
      bannerimage,
      QrcodePress,
      QrcodValueonChangeText,
      QrcodValue,
      customHeader,
      crossColor,
    } = this.props;
    const user = this.props.user;
    console.log(user, 'userrrr');
    console.log('valueinModal', value);
    const renderView = () => {
      if (value == 'Confirmation') {
        return (
          <View
            style={[
              // appStyles.gap_10,
              // appStyles.alignCenter,
              // appStyles.paddingVertical_2,

              {borderRadius: 10},
            ]}>
            {modalIcon}
            <CustomText style={styles.desc} text={desc} />
            <View
              style={
                [
                  // appStyles.directionRow,
                  // {...appStyles.paddingVertical_1},
                ]
              }>
              <CustomButton
                onPress={onYesPress}
                title={sucessText}
                buttonStyle={[styles.press, {backgroundColor: theme.secondary}]}
                textStyle={[styles.btnstext, {color: theme.white}]}
              />
              <CustomButton
                onPress={onNoPress}
                title={unsuccessText}
                buttonStyle={[styles.press2, {backgroundColor: theme.primary}]}
                textStyle={[styles.btnstext2, {color: theme.white}]}
              />
            </View>
          </View>
        );
      } else if (value == 'MRequestSend') {
        // return Alert.alert('asdas');
        return (
          <View style={[{gap: 10, paddingVertical: 10}]}>
            <Img
              local
              src={bannerimage}
              resizeMode={'contain'}
              style={{
                height: 120,
                marginHorizontal: 10,
                marginVertical: 5,
                borderRadius: 10,
              }}
            />
            <CustomText style={styles.desc} text={desc} />

            {/* <View
              style={[
                appStyles.directionRow,
                {justifyContent: 'center', alignItems: 'center', gap: 5},
              ]}>

            </View> */}
            <View
              style={
                [
                  // appStyles.directionRow,
                  // {...appStyles.paddingVertical_1, alignSelf: 'center'},
                ]
              }>
              <CustomButton
                onPress={onYesPress}
                title={sucessText}
                buttonStyle={[styles.press, {backgroundColor: theme.primary}]}
                textStyle={[styles.btnstext, {color: theme.white}]}
              />
              <CustomButton
                onPress={onNoPress}
                title={unsuccessText}
                buttonStyle={[styles.press2, {backgroundColor: theme.primary}]}
                textStyle={[styles.btnstext2, {color: theme.white}]}
              />
            </View>
          </View>
        );
      }
    };
    return (
      <CustomModal
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackButtonPress}
        visible={isVisible}
        animationIn="slideInRight"
        animationOut="slideOutLeft"
        togglePopup={togglePopup}
        value={value}>
        <View style={[styles.main]}>
          <View style={[styles?.header, customHeader]}>
            <CustomText
              text={modalTitle}
              font={family?.RedHatDisplay_Bold}
              color={colors?.white}
              size={size?.small}
            />
            <TouchableOpacity
              onPress={onClose}
              style={{position: 'absolute', right: 18}}></TouchableOpacity>
          </View>
          {modalActive || renderView()}
        </View>
      </CustomModal>
    );
  }
}

export default ModalPopup;
// const actions = {toggleAppTheme};
// function mapStateToProps({appReducer, authReducer}) {
//   return {
//     theme: appReducer?.appTheme,
//     user: authReducer?.user,
//   };
// }
// export default connect(
//   mapStateToProps,
//   actions,
// )(function (props) {
//   const {colors} = useTheme();

//   return <ModalPopup {...props} theme={colors} />;
// });
