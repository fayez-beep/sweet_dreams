import {Text, StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import ChatListCard from '../../../components/ChatListCard';
import {homeData} from '../../../utils/dummyData';
import SwipeableRow from '../../../components/SwipeableRow';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Search from '../../../components/Search';
import {chatMessages, deleteChat} from '../../../redux/actions/appAction';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setNewItems: [homeData],
      data: [],
      filterData: [],
    };
  }

  getMessages = () => {
    this.setState({data: [], filterData: []}, () => {
      this.props.chatMessages(responseCallback => {
        console.log('chat messages response', JSON.stringify(responseCallback));
        if (responseCallback?.data) {
          this.setState({
            data: responseCallback.data,
            filterData: responseCallback.data,
          });
        }
      });
    });
  };

  filterChat = search => {
    const {data} = this.state;
    let temp = JSON.stringify(data);
    temp = JSON.parse(temp);
    temp = temp.filter(v =>
      v.full_name.toLowerCase().includes(search.toLowerCase()),
    );
    this.setState({filterData: temp});
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getMessages();
    });
  }

  render() {
    const {t} = this?.props;
    const {data, filterData} = this.state;

    const deleteItem = (chat, index) => {
      const payload = {
        receiver_id: chat?.id,
      };
      this.props.deleteChat(payload, responseCallback => {
        console.log('response', responseCallback);
        let temp = JSON.stringify(filterData);
        temp = JSON.parse(temp);
        temp.splice(index, 1);
        this.setState({filterData: temp});
      });
      // const getCurrentFavouriteItem = homeData;
      // getCurrentFavouriteItem.splice(index, 1);
      // this.setState({
      //   setNewItems: [getCurrentFavouriteItem],
      // });
    };

    return (
      <AppBackground
        title={t('str_Dreamzzz_Messages')}
        Save={false}
        menu={true}>
        <Search
          containerStyle={{width: '90%', alignSelf: 'center'}}
          onSearch={search => this.filterChat(search)}
        />
        <View style={{marginTop: 20}} />
        <FlatList
          data={filterData}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: '20%',
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.getMessages} />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <SwipeableRow
              onDelete={() => deleteItem(item, index)}
              renderVisibleComponent={() => <ChatListCard item={item} />}
            />
          )}
        />
      </AppBackground>
    );
  }
}
// export default Chat;
//

const actions = {chatMessages, deleteChat};

function mapStateToProps({authReducer, appReducer}) {
  return {
    user: authReducer?.user,
    selectedtLanguage: appReducer?.selectedtLanguage,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(Chat);
