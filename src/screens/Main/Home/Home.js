import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import Card from '../../../components/Card';
import Search from '../../../components/Search';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import ConfirmationModal from '../../../components/ConfirmationModal';
import {appIcons} from '../../../assets';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import CustomGradientButton from '../../../components/CustomGradientButton';
import {size} from 'lodash';
import {
  viewPost,
  reportPost,
  hidePost,
  savePost,
  deletePost,
  likePost,
  searchPosts,
} from '../../../redux/actions/appAction';
import {family} from '../../../utils';
import i18n from '../../../helpers/i18n';
import NavService from '../../../helpers/NavService';

const {width} = Dimensions.get('screen');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      reportOther: '',
      confirmationModalVisible: false,
      reportTypes: '',
      isModalVisible: false,
      show: null,
      openToolTip: null,
      data: [],
      isSearched: '',
      reportItem: null,
    };
  }

  handleRadioSelect = value => {
    this.setState({selectedValue: value});
  };

  toggleModal = () => {
    this.setState(previousState => ({
      isModalVisible: !previousState.isModalVisible,
    }));
  };

  getPost = () => {
    this.setState({data: [], isSearched: ''}, () => {
      const payload = {};
      this.props.viewPost(payload, response => {
        if (response?.data) {
          this.setState({data: response.data});
        }
      });
    });
  };

  getSearchPost = title => {
    this.setState({data: [], isSearched: title}, () => {
      const payload = {title};
      this.props.searchPosts(payload, response => {
        if (response?.data) {
          this.setState({data: response.data});
        }
      });
    });
  };

  deletePost = (id, index) => {
    const {data} = this.state;
    const payload = {post_id: id};
    this.props.deletePost(payload, responseCallback => {
      console.log('response', responseCallback);
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      temp.splice(index, 1);
      this.setState({data: temp});
    });
  };

  reactPost = (id, index, reaction) => {
    const {data} = this.state;
    const payload = {post_id: id, reaction: reaction.title};
    this.props.likePost(payload, responseCallback => {
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      if (
        responseCallback?.message === 'Post Unliked.' &&
        temp[index].isLike == 1
      ) {
        temp[index].likes_count = temp[index].likes_count - 1;
        temp[index].isLike = 0;
        this.setState({data: temp});
      } else if (
        responseCallback?.message === 'Post Liked successfully.' &&
        temp[index].isLike == 0
      ) {
        temp[index].likes_count = temp[index].likes_count + 1;
        temp[index].isLike = 1;
        this.setState({data: temp});
      }
      Toast.show({
        text1: `${responseCallback?.message}`,
        type: 'error',
        visibilityTime: 3000,
      });
    });
  };

  hidePost = (id, index) => {
    const {data} = this.state;
    const payload = {
      post_id: id,
    };
    this.props.hidePost(payload, responseCallback => {
      console.log('hide post response', responseCallback);
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      temp.splice(index, 1);
      this.setState({reportItem: null, data: temp});
    });
  };

  savePost = (id, index) => {
    const {data} = this.state;
    const payload = {
      post_id: id,
    };
    this.props.savePost(payload, responseCallback => {
      console.log('save post response', responseCallback);
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      temp[index].isSave = !temp[index].isSave;
      this.setState({reportItem: null, data: temp});
    });
  };

  reportPost = (id, reason) => {
    const payload = {
      post_id: id,
      reason: reason,
    };
    this.props.reportPost(payload, responseCallback => {
      console.log('report post response', responseCallback);
      this.setState({isModalVisible: true, reportItem: null});
    });
  };

  componentWillMount() {
    if (this.props.selectedtLanguage) {
      i18n.changeLanguage(this.props.selectedtLanguage);
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getPost();
    });
  }

  render() {
    const {t} = this.props;
    const {
      selectedValue,
      reportOther,
      confirmationModalVisible,
      reportTypes,
      isModalVisible,
      show,
      openToolTip,
      data,
      reportItem,
      isSearched,
    } = this.state;

    const tab = [
      {
        icon: appIcons.Aww,
        onPress: () => {},
      },
      {
        icon: appIcons.Aww,
        onPress: () => {},
      },
      {
        icon: appIcons.Aww,
        onPress: () => {},
      },
      {
        icon: appIcons.Aww,
        onPress: () => {},
      },
      {
        icon: appIcons.Aww,
        onPress: () => {},
      },
    ];
    return (
      <AppBackground
        menu
        title={t('str_Home')}
        notification
        marginHorizontal={false}
        bottomLine={false}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            this.setState({
              show: null,
              openToolTip: null,
            });
          }}>
          <>
            <ConfirmationModal
              curentFocus={this}
              selectedValue={selectedValue}
              handleRadioSelect={value => {
                this.handleRadioSelect(value);
              }}
              visible={confirmationModalVisible}
              toggleVisibility={() =>
                this.setState({
                  confirmationModalVisible: !confirmationModalVisible,
                  reportOther: '',
                  selectedValue: null,
                })
              }
              title={
                reportTypes?.label == `${t('str_Hide')}`
                  ? t('str_Hidee')
                  : reportTypes?.label == `${t('str_Report')}`
                  ? t('str_problem')
                  : reportTypes?.label == `${t('str_Save')}`
                  ? t('str_Saves')
                  : reportTypes?.label == `${t('str_unsave')}`
                  ? t('str_unSaves')
                  : null
              }
              reportType={reportTypes}
              // subTitle={' You want to Delete Account?'}
              onAccept={(selected, something) => {
                console.log({selected, something, reportTypes});
                if (selected === null) {
                  Toast.show({
                    text1: `${t('str_violation')}`,
                    type: 'error',
                    visibilityTime: 3000,
                  });
                  return;
                }

                if (selected === t('str_something_else') && something === '') {
                  Toast.show({
                    text1: `${t('str_reason_empty')}`,
                    type: 'error',
                    visibilityTime: 3000,
                  });
                  return;
                }
                this.setState(
                  {
                    confirmationModalVisible: !confirmationModalVisible,
                    reportOther: '',
                    selectedValue: null,
                  },
                  () => {
                    if (selected != undefined) {
                      let reportDetails =
                        selected === t('str_something_else')
                          ? something
                          : selected;

                      this.reportPost(reportItem?.id, reportDetails);
                    } else {
                      if (reportTypes?.value === '2') {
                        this.hidePost(reportItem?.id, reportItem?.index);
                      } else if (reportTypes?.value === '3') {
                        this.savePost(reportItem?.id, reportItem?.index);
                      }
                    }
                  },
                );
              }}
            />

            <Search
              onSearch={search => {
                if (search) {
                  this.getSearchPost(search);
                } else {
                  this.getPost();
                }
              }}
            />
            <View style={styles.container} />

            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: width * 0.265 + 10,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={data}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() =>
                    isSearched ? this.getSearchPost(isSearched) : this.getPost
                  }
                />
              }
              renderItem={({item, index}) => (
                <Card
                  reportTypeCallback={value => {
                    this.setState({
                      reportTypes: value,
                      reportItem: {...item, index},
                    });
                  }}
                  curentFocus={this}
                  selectedValue={this.state.selectedValue}
                  item={item}
                  imgAvailable={true}
                  show={show}
                  index={index}
                  openToolTip={openToolTip}
                  toggleToolTip={val => {
                    if (openToolTip === val) {
                      this.setState({
                        openToolTip: null,
                        show: null,
                      });
                    } else {
                      this.setState({
                        openToolTip: val,
                        show: null,
                      });
                    }
                  }}
                  toggleShow={val => {
                    this.setState({
                      show: val,
                      openToolTip: null,
                    });
                  }}
                  onEditDream={() => {
                    NavService.navigate('DreamPost', {
                      ...item,
                      dreamType: item.dream_type,
                      type: 'edit',
                    });
                  }}
                  onDeleteDream={() => {
                    this.deletePost(item.id, index);
                  }}
                  onReact={reaction => {
                    this.reactPost(item.id, index, reaction);
                  }}
                />
              )}
            />
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={this.toggleModal}
              onBackButtonPress={this.toggleModal}>
              <View style={{flex: 1, position: 'relative'}}>
                <ImageBackground
                  source={appIcons.cloud}
                  resizeMode="contain"
                  style={styles.image}>
                  <View>
                    <Text style={styles.cloudTitle}>{t('str_alert')}</Text>
                    <Text style={styles.cloudText}>{t('str_thankyou')}</Text>
                  </View>
                </ImageBackground>
                <View style={{position: 'relative', bottom: '40%'}}>
                  <CustomGradientButton
                    title={t('str_CONFIRM')}
                    onPress={() => this.toggleModal()}
                    buttonStyle={{borderRadius: 100, width: '50%'}}
                    textStyle={{
                      fontSize: size.medium,
                      fontFamily: family?.ArialCE,
                    }}
                    colorstyle={true}
                  />
                </View>
              </View>
            </Modal>
          </>
        </TouchableOpacity>
      </AppBackground>
    );
  }
}

const actions = {
  viewPost,
  reportPost,
  hidePost,
  savePost,
  deletePost,
  likePost,
  searchPosts,
};

function mapStateToProps({authReducer, appReducer}) {
  return {
    user: authReducer?.user,
    selectedtLanguage: appReducer?.selectedtLanguage,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(Home);
