import {Text, StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import NotificationCard from '../../../components/NotificationCard';
import {homeData} from '../../../utils/dummyData';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {notifications, updateRequest} from '../../../redux/actions/appAction';
import {connect} from 'react-redux';
import NavService from '../../../helpers/NavService';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getNotifications = () => {
    this.setState({data: []}, () => {
      this.props.notifications(responseCallback => {
        console.log(
          'getNotificationsresponseCallback',
          JSON.stringify(responseCallback?.data),
        );
        this.setState({data: responseCallback?.data});
      });
    });
  };

  updateFollowRequest = (id, status, index) => {
    const {data} = this.state;
    const payload = {
      request_id: id,
      status: status,
    };
    this.props.updateRequest(payload, responseCallback => {
      console.log('updateRequestresponseCallback', responseCallback);
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      temp.splice(index, 1);
      this.setState({data: temp});
    });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getNotifications();
    });
  }

  render() {
    const {t, user} = this.props;
    const {data} = this.state;
    return (
      <AppBackground title={t('str_Notification')} Save={false} back={true}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.getNotifications}
            />
          }
          renderItem={({item, index}) => (
            <NotificationCard
              name={item?.type}
              des={item?.message}
              tim={item?.created_at}
              img={item?.user?.profile_image}
              onPress={() => {
                if (item?.type === 'Report-Post') {
                  NavService.navigate('PostDream', {
                    showName: t('str_postdream'),
                    item: {id: item?.post_id},
                  });
                } else if (item?.type === 'Post-Like') {
                  NavService.navigate('Like', {item: {id: item?.post_id}});
                } else if (item?.type === 'Post-Comment') {
                  NavService.navigate('Comment', {item: {id: item?.post_id}});
                }
              }}
              onAccept={() => {
                this.updateFollowRequest(item?.post_id, 'accepted', index);
              }}
              onReject={() => {
                this.updateFollowRequest(item?.post_id, 'rejected', index);
              }}
            />
          )}
        />
      </AppBackground>
    );
  }
}

const actions = {notifications, updateRequest};

function mapStateToProps({authReducer, appReducer}) {
  return {
    user: authReducer?.user,
    selectedtLanguage: appReducer?.selectedtLanguage,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(Notification);
