import { View, ScrollView, Modal, Dimensions, Button, TouchableOpacity, Text } from 'react-native';
import React, { Component } from 'react';
import AppBackground from '../../../components/AppBackground';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { notifications, updateRequest } from '../../../redux/actions/appAction';
import { connect } from 'react-redux';
import RedeemPointsCard from '../../../components/RedeemPointsCard';
import styles from './styles';
import axios from 'axios';
import { ASSETS_URL, BASE_URL } from '../../../config/WebService';
import Toast from 'react-native-toast-message';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';


class RedeemPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    console.log(this.props.user.userToken)
    try {
      const response = await axios.get(`${BASE_URL}stickers/all_stickers`, {
        headers: {
          authorization: `Bearer ` + this.props.user.userToken
        }
      })
      console.log('RESPONSE_ : ', response.data.data)
      this.setState({ data: response.data.data })
    } catch (error) {
      console.log(error)
    }
  }

  redeem = async (sticker, card, type) => {
    console.log(this.props.user.userToken, sticker, card, type)
    try {
      const response = await axios.post(`${BASE_URL}stickers/purchase_sticker`, {
        sticker_id: sticker,
        card_id: card ? card : ''
      }, {
        headers: {
          authorization: `Bearer ` + this.props.user.userToken
        }
      })
      console.log('RESPONSE_ : ', response.data)
      Toast.show({
        type: 'success',
        text1: 'Redeem Sticker',
        text2: response?.data?.message || 'Sticker redeemed successfully.'
      })
      this.fetchData()
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Redeem Sticker',
        text2: 'Problem redeeming the sticker. Please buy or check your network.'
      })
    }
  }
  fetchPaymentIntentClientSecret = async () => {

    const response = await fetch(`${BASE_URL}create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {clientSecret} = await response.json();
    return clientSecret;
  };

    

  handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const {confirmPayment, loading} = useConfirmPayment();
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

  render() {
    const { t, user } = this.props;
    const { data } = this.state;
    return (
      <AppBackground title={t('Redeem Points')} Save={false} back={true} bottomLine={false}>
        <ScrollView style={styles.redeemScroll}>
          <View style={styles.redeemMain}>
            {data.map((item) => {
              return (
                <View key={item?.id} style={styles.listContainer}>
                  <RedeemPointsCard
                    image={{ uri: ASSETS_URL + item.sticker_image }}
                    points={item.sticker_name}
                    price={item?.price}
                    isRedeemed={item.isRedeemed}
                    isRedeemPoint={true}
                    isPurchaseSticker={item?.sticker_type !== 'free'}
                    cbRedeem={() => this.redeem(item.id, '', item?.sticker_type)}
                    cbPurchase={() => this.setState({ ...data, visible: !this.state.visible })}
                  />
                </View>
              )
            })}
          </View>
        </ScrollView>
        <Modal
          visible={this.state.visible}
          onRequestClose={() => this.setState({ ...this.state, visible: 'false' })}
          animationType='fade'
          transparent={true}
        >
          <View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
              borderRadius: 30
            }}
            >
              <CardField
                postalCodeEnabled={false}
                placeholders={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 30,
                }}
                onCardChange={cardDetails => {
                  console.log('cardDetails', cardDetails);
                }}
                onFocus={focusedField => {
                  console.log('focusField', focusedField);
                }} />
                <TouchableOpacity>
                  <Text>Confirm Purchase</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </AppBackground>
    );
  }
}

const actions = { notifications, updateRequest };

function mapStateToProps({ authReducer, appReducer }) {
  return {
    user: authReducer,
    selectedtLanguage: appReducer?.selectedtLanguage,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(RedeemPoints);
