import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import Card from '../../../components/Card';
import Search from '../../../components/Search';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {colors} from '../../../utils';
import {appIcons} from '../../../assets';
import {likeDetail} from '../../../redux/actions/appAction';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {ASSETS_URL} from '../../../config/WebService';

const {width} = Dimensions.get('screen');
class Like extends Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      data: [],
      selected_reaction: [],
      reaction_count: {
        'No Way!': 0,
        Sad: 0,
        'Ha Ha !': 0,
        'Yay !!!': 0,
        'Oh My !': 0,
        Confused: 0,
        Love: 0,
      },
    };
  }
  handleBackButtonClick(navigation) {
    // navigation?.navigate('UserAppStack', {
    //   index: 0,
    // });
    // navigation.reset()
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'AppStarter'}],
    // });
    navigation.goBack();
    return true;
  }

  getLikes = () => {
    const {reaction_count} = this.state;
    const {item} = this.props.route.params;
    const payload = {
      key: 'post_id',
      value: item.id,
    };
    this.props.likeDetail(payload, responseCallback => {
      if (responseCallback?.data) {
        let reactions = {};
        Object.keys(reaction_count).forEach(v => {
          reactions[v] = 0;
        });
        responseCallback?.data?.forEach(v => {
          reactions[v.reaction]++;
        });
        let selected = responseCallback.data.filter(
          v => v.reaction === 'No Way!',
        );
        this.setState({
          active: 0,
          data: responseCallback.data,
          reaction_count: reactions,
          selected_reaction: selected,
        });
      }
    });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getLikes();
    });
  }

  getReactionImage = reaction => {
    switch (reaction) {
      case 'No Way!':
        return appIcons.react1;
      case 'Sad':
        return appIcons.react2;
      case 'Ha Ha !':
        return appIcons.react3;
      case 'Yay !!!':
        return appIcons.react5;
      case 'Oh My !':
        return appIcons.ohmy;
      case 'Confused':
        return appIcons.react6;
      case 'Love':
        return appIcons.hearteye;
    }
  };

  render() {
    const images = [
      {id: '1', img: appIcons.react1, reaction: 'No Way!'},
      {id: '2', img: appIcons.react2, reaction: 'Sad'},
      {id: '3', img: appIcons.react3, reaction: 'Ha Ha !'},
      {id: '5', img: appIcons.react5, reaction: 'Yay !!!'},
      {id: '4', img: appIcons.ohmy, reaction: 'Oh My !'},
      {id: '6', img: appIcons.react6, reaction: 'Confused'},
      {id: '7', img: appIcons.hearteye, reaction: 'Love'},
    ];

    const {t} = this.props;
    const {active, data, reaction_count, selected_reaction} = this.state;

    return (
      <AppBackground
        back
        title={t('str_reaction')}
        marginHorizontal={false}
        bottomLine={false}>
        <View
          style={{
            height: 40,
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 10,
          }}>
          {images.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let selected = data.filter(v => v.reaction === item.reaction);
                  this.setState({
                    // active: item.id,
                    active: index,
                    selected_reaction: selected,
                  });
                }}
                activeOpacity={0.6}
                style={[
                  styles.tabBtn,
                  {
                    backgroundColor: index === active ? colors.l2 : 'white',
                  },
                ]}>
                <Text
                  style={{
                    color: 'black',
                    marginRight: 3,
                    fontWeight: index === active ? 'bold' : null,
                  }}>
                  {reaction_count[item.reaction]}
                </Text>
                <Image
                  source={item.img}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 35,
                  }}
                />
                {/* <Text
                  style={{
                    color: 'black',
                    marginLeft: 3,
                    fontWeight: index === active ? 'bold' : null,
                  }}>
                  {item.count}
                </Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1, paddingTop: 15}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={selected_reaction}
          refreshControl={
            <RefreshControl onRefresh={this.getLikes} refreshing={false} />
          }
          renderItem={({item}) => (
            <View style={styles.mainView}>
              <Image
                source={
                  item?.user?.profile_image
                    ? {uri: ASSETS_URL + item?.user?.profile_image}
                    : appIcons.userPlaceholder
                }
                style={styles.userImage}
              />
              {/* <View> */}
              <Text style={styles.name}>{item?.user?.full_name}</Text>
              {/* <Text style={styles.name}>{item?.reaction}</Text>
              </View> */}
              <Image
                source={this.getReactionImage(item?.reaction)} // images[active].img
                resizeMode="contain"
                style={{
                  width: 23,
                  height: 20,
                  marginLeft: 4,
                }}
              />
            </View>
          )}
        />
      </AppBackground>
    );
  }
}

const actions = {likeDetail};

export default compose(withTranslation(), connect(null, actions))(Like);
