import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {appIcons} from '../../../assets';
import FaqCard from '../../../components/FaqCard';
import {homeData} from '../../../utils/dummyData';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {t} from 'i18next';
class Faqs extends Component {
  handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
  }
  componentDidMount() {
    BackHandler?.addEventListener('hardwareBackPress', () =>
      this?.handleBackButtonClick(this.props?.navigation),
    );

    return () => {
      BackHandler?.removeEventListener('hardwareBackPress', () =>
        this?.handleBackButtonClick(this.props?.navigation),
      );
    };
  }
  render() {
    // const {t} = this?.props;

    return (
      <AppBackground title={t('str_FAQs')} back={true}>
        <FlatList
          style={styles.container}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={homeData}
          renderItem={({item}) => <FaqCard item={item} />}
        />
      </AppBackground>
    );
  }
}

// export default withTranslation()(Faqs);
// export default Faqs
export default compose(withTranslation(), connect())(Faqs);
