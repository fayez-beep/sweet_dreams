import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import moment from 'moment';
import {colors, family, size} from '../utils';
import {appIcons} from '../assets';
import {CustomSearchInput} from '../components/CustomTextInput';
import DateTimePicker from '../components/DateTimePicker';
import CustomText from '../components/CustomText';
import Checkbox from '../components/Checkbox';
import Img from '../components/Img';
import CustomGradientButton from '../components/CustomGradientButton';
import appStyles from '../screens/appStyles';
import Shadows from '../helpers/Shadows';
import styles from '../screens/Main/Filter/styles';
import Toast from 'react-native-toast-message';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {compose} from 'redux';

export class JournalFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: 0,
      isShowPopup: false,
      isShowSheet: false,
      modalType: null,
      isCheck: false,
      isCheck2: false,
      isCheck3: false,
      isCheck4: false,
      EventTypedata: ['Music Show', 'Wedding Event'],
      ZipCode: '',
      date: '',
      date1: '',
      cityData: ['Texsla', 'Washington'],
      state: '',
      city: '',
      isDatePickerVisible: false,
      isDatePickerVisible1: false,
      time: '',
      formattedValue: '',
      selectedDate: '',
      selectedDate1: '',
      selectedTime: '',
      search: '',
    };
  }

  handleConfirm = date => {
    if (this.state.selectFormat === 0) {
      const currentDate = moment();
      const selectedDate = moment(date);
      if (selectedDate.isAfter(currentDate)) {
        // Selected date is in the future
        Toast.show({
          text1: 'Please select a valid date',
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        const formattedDate = selectedDate.format('YYYY-MM-DD');
        this.setState({isDatePickerVisible: false, date: formattedDate});
      }
    } else {
      const time = moment(date).format('LT');
      this.setState({isDatePickerVisible: false, time: time});
    }
  };

  render() {
    const {
      isCheck,
      isCheck2,
      isCheck3,
      isCheck4,
      isDatePickerVisible,
      isDatePickerVisible1,
      selectedDate,
      selectedDate1,
      date,
      search,
      date1,
    } = this?.state;

    const {t} = this?.props;
    return (
      <View
        style={{
          marginTop: 0,
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.onClose();
          }}
          style={{alignSelf: 'flex-end', marginTop: 10}}>
          <Img
            tintColor={colors.red}
            src={appIcons.close}
            style={{height: 20, width: 20}}
            local
          />
        </TouchableOpacity>
        <View style={{marginTop: 10}}>
          <CustomSearchInput
            onChangeText={val => this.setState({search: val})}
            placeholderColor={colors.gray}
            placeholder={t('str_Search')}
            editable={true}
            leftIcon={appIcons.search}
            textInputStyles={{color: colors.black}}
            rightImage={appIcons.filter}
            containerStyle={{
              width: '100%',
              paddingHorizontal: 10,
              marginBottom: 10,
              ...Shadows.shadow5,
            }}
          />
        </View>
        <View style={styles?.filterContainer}>
          <View style={styles?.titleContainer}>
            <CustomText
              text={t('str_this_week')}
              font={family?.ArialCE}
              size={size.normal}
              color={colors.black}
            />
            <Checkbox
              isCheck={isCheck2}
              handleCheck={() => this.setState({isCheck2: !isCheck2})}
            />
          </View>
          <View style={styles?.titleContainer}>
            <CustomText
              text={t('str_last_Week')}
              font={family?.RedHatDisplay_SemiBold}
              size={size.normal}
              color={colors.black}
            />
            <Checkbox
              isCheck={isCheck3}
              handleCheck={() => this.setState({isCheck3: !isCheck3})}
            />
          </View>
          <View style={styles?.titleContainer}>
            <CustomText
              text={t('str_last_30_days')}
              font={family?.ScriptMTBold}
              size={size.normal}
              color={colors.black}
            />
            <Checkbox
              isCheck={isCheck4}
              handleCheck={() => this.setState({isCheck4: !isCheck4})}
            />
          </View>
          <View style={styles?.titleContainer}>
            <CustomText
              text={t('str_search_by_date')}
              font={family?.ScriptMTBold}
              size={size.normal}
              color={colors.black}
            />
            <Checkbox
              isCheck={isCheck}
              handleCheck={() => this.setState({isCheck: !isCheck})}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              ...appStyles.margin1Percent,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({selectFormat: 0});
                this.setState({isDatePickerVisible: true});
              }}
              style={[styles.dateBtn, {backgroundColor: '#E9E9E9'}]}>
              <Text
                style={[
                  styles.placeHolderText,
                  date === selectedDate && {color: colors.gray},
                ]}>
                {date ? date : t('str_from')}
              </Text>
              <Img
                tintColor={colors.primary}
                local
                style={styles.calenderIcon}
                src={appIcons.calendar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({selectFormat1: 0});
                this.setState({isDatePickerVisible1: true});
              }}
              style={[styles.dateBtn, {backgroundColor: '#E9E9E9'}]}>
              <Text
                style={[
                  styles.placeHolderText,
                  date1 === selectedDate1 && {color: colors.gray},
                ]}>
                {date1 ? date1 : t('str_till')}
              </Text>
              <Img
                tintColor={colors.primary}
                local
                style={styles.calenderIcon}
                src={appIcons.calendar}
              />
            </TouchableOpacity>
          </View>
          <DateTimePicker
            mode={'date'}
            androidVariant={'iosClone'}
            isDatePickerVisible={isDatePickerVisible}
            handleConfirm={date => {
              const confirmDate = moment(date).format('YYYY-MM-DD');
              this.setState({
                isDatePickerVisible: false,
                date: confirmDate,
              });
            }}
            hideDatePicker={() => this.setState({isDatePickerVisible: false})}
          />
          <DateTimePicker
            mode={'date'}
            androidVariant={'iosClone'}
            isDatePickerVisible={isDatePickerVisible1}
            handleConfirm={date => {
              const confirmDate = moment(date).format('YYYY-MM-DD');
              this.setState({
                isDatePickerVisible1: false,
                date1: confirmDate,
              });
            }}
            hideDatePicker={() => this.setState({isDatePickerVisible1: false})}
          />

          <CustomGradientButton
            title={t('str_apply_filter')}
            buttonStyle={{width: '100%', marginTop: 15}}
            colorstyle
            onPress={() => {
              this.props.onFilter({
                search,
                isCheck,
                isCheck2,
                isCheck3,
                isCheck4,
                date,
                date1,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default compose(withTranslation(), connect(null, null))(JournalFilters);
