import { Text, StyleSheet, View, FlatList, RefreshControl, ScrollView } from 'react-native';
import React, { Component } from 'react';
import AppBackground from '../../../components/AppBackground';
import NotificationCard from '../../../components/NotificationCard';
import { homeData } from '../../../utils/dummyData';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { notifications, updateRequest } from '../../../redux/actions/appAction';
import { connect } from 'react-redux';
import NavService from '../../../helpers/NavService';
import RedeemPointsCard from '../../../components/RedeemPointsCard';
import styles from './styles';
import { appImages } from '../../../assets';
import axios from 'axios';
import { BASE_URL } from '../../../config/WebService';
import store from '../../../redux';

const stickers = [
  {
    image: appImages.redeem1,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem2,
    price: '1.00',
    isRedeemed: true
  },
  {
    image: appImages.redeem3,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem4,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem5,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem6,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem7,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem8,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem9,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem10,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem11,
    price: '1.00',
    isRedeemed: false
  },
  {
    image: appImages.redeem12,
    price: '1.00',
    isRedeemed: false
  },
]

class PurchaseSticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  
  componentDidMount() {
   
  }
  
  purchase = async() => {
    
  }

  render() {
    const { t, user } = this.props;
    const { data } = this.state;
    return (
      <AppBackground title={t('Purchase Stickers')} Save={false} back={true} bottomLine={false}>
        <ScrollView style={styles.redeemScroll}>
          <View style={styles.redeemMain}>
            {stickers.map((item) => {
              return (
                <View style={styles.listContainer}>
                  <RedeemPointsCard
                    image={item.image}
                    price={item.price}
                    isPurchaseSticker={true}
                  />
                </View>
              )
            })}
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

const actions = { notifications, updateRequest };

function mapStateToProps({ authReducer, appReducer }) {
  return {
    user: authReducer?.user,
    selectedtLanguage: appReducer?.selectedtLanguage,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(PurchaseSticker);
