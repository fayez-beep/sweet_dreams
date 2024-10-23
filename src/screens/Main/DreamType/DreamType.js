import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {appIcons} from '../../../assets';
import {colors, HP, size, WP, family} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import CustomButton from '../../../components/CustomButton';
import CustomGradientButton from '../../../components/CustomGradientButton';
import NavService from '../../../helpers/NavService';
import Toast from 'react-native-toast-message';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
class DreamType extends Component {
  state = {
    item: '',
  };

  render() {
    const {t} = this?.props;
    const {item} = this.state;
    console.log(item, '==item');
    const submits = () => {
      if (!item) {
        return Toast.show({
          text1: t('str_Select_day_type'),
          type: 'error',
          visibilityTime: 900,
        });
      }
      NavService.navigate('DreamPost', {dreamType: item});
    };
    return (
      <AppBackground title={t('str_Dream_Type')} back={true}>
        <View style={styles.background}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              this.setState({
                item: 'day',
              })
            }
            style={[
              styles.cardSelector,
              {
                backgroundColor: colors.dayColor,
                borderColor: item == 'day' ? colors.gray : 'white',
              },
            ]}>
            <View>
              <Image
                source={appIcons.borderSun}
                resizeMode="contain"
                style={styles.card}
              />
            </View>
            <Image
              source={appIcons.dayy}
              resizeMode="contain"
              style={styles.card}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              this.setState({
                item: 'night',
              })
            }
            style={[
              styles.cardSelector,
              {
                backgroundColor: colors.nightColor,
                borderColor: item == 'night' ? colors.gray : 'white',
              },
            ]}>
            <Image
              source={appIcons.night}
              resizeMode="contain"
              style={styles.card}
            />

            {/* <Text style={[styles.txt, {}]}>{t('str_Night_Dream')}</Text> */}
            <View>
              <Image
                source={appIcons.newmoon}
                resizeMode="contain"
                style={styles.cards}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <CustomGradientButton
            title={t('str_Next')}
            colorstyle={true}
            onPress={() => submits()}
          />
        </View>
      </AppBackground>
    );
  }
}

export default compose(withTranslation(), connect())(DreamType);
