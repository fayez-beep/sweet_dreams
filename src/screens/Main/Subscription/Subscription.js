import {
  Text,
  View,
  ImageBackground,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {appImages} from '../../../assets';
import NavService from '../../../helpers/NavService';
import styles from './styles';
import {buySubscription, subscriptions} from '../../../redux/actions/appAction';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {colors} from '../../../utils';
import Toast from 'react-native-toast-message';

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      subscription_plan: null,
    };
  }

  getSubscriptions = () => {
    this.props.subscriptions(responseCallback => {
      this.setState({data: responseCallback?.data});
    });
  };

  getSubscriptionPlan = subscription_plan => {
    switch (subscription_plan) {
      case 'Dreams Dictionary':
        return 'dream_dictionary';
      case 'Dreams Connection':
        return 'dream_connection';
      default:
        return 'dream_stickers';
    }
  };

  buySubscription = () => {
    const {t} = this.props;
    const {subscription_plan} = this.state;
    let temp = '';
    temp = this.getSubscriptionPlan(subscription_plan);
    if (subscription_plan) {
      const payload = {
        receipt: 'test',
        type: temp,
        source: Platform.OS === 'android' ? 'google' : 'apple',
      };
      this.props.buySubscription(payload, responseCallback => {
        console.log('buySubscriptionresponseCallback', responseCallback);
        NavService.goBack();
      });
    } else {
      Toast.show({
        text1: t('str_Select_Subscription'),
        type: 'success',
        visibilityTime: 3000,
      });
    }
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.getSubscriptions();
      },
    );
  }

  render() {
    const {t} = this.props;
    const {data, subscription_plan} = this.state;

    return (
      <AppBackground title={t('str_Subscription')} back={true}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.getSubscriptions}
            />
          }
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  {height: 260, borderColor: colors.primary},
                  item?.subscription_plan === subscription_plan
                    ? {borderWidth: 1}
                    : null,
                ]}
                onPress={() =>
                  this.setState({subscription_plan: item?.subscription_plan})
                }>
                <ImageBackground
                  source={appImages.subs1}
                  resizeMode="cover"
                  style={[styles.image]}>
                  <View style={styles.cloudCard}>
                    <Text numberOfLines={1} style={styles.cloudTitle}>
                      {item?.subscription_plan}
                    </Text>
                    <Text style={styles.cloudText} numberOfLines={3}>
                      {item?.description}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={styles.bottomButton}>
                  <Text style={styles.pricetxt}>
                    ${item?.price} / {t('str_Month')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <CustomGradientButton
          title={t('str_SUBSCRIBE')}
          colorstyle={true}
          onPress={() => this.buySubscription()}
        />
      </AppBackground>
    );
  }
}

const actions = {subscriptions, buySubscription};

function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(Subscription);
