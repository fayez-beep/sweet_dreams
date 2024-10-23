import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import Card from '../../../components/Card';
import Search from '../../../components/Search';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import ConfirmationModal from '../../../components/ConfirmationModal';
import {
  reportPost,
  hidePost,
  savePost,
  deletePost,
  likePost,
  postDetail,
} from '../../../redux/actions/appAction';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import {appIcons} from '../../../assets';
import {family} from '../../../utils';
import {size} from 'lodash';
import CustomGradientButton from '../../../components/CustomGradientButton';
import NavService from '../../../helpers/NavService';
import {compose} from 'redux';
import {connect} from 'react-redux';

const {width} = Dimensions.get('screen');
class PostDream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      reportOther: '',
      confirmationModalVisible: false,
      reportTypes: '',
      isModalVisible: false,
      showw: null,
      openToolTip: null,
      reportItem: null,
      item: this.props.route.params.item,
    };
  }

  deletePost = id => {
    const payload = {post_id: id};
    this.props.deletePost(payload, responseCallback => {
      console.log('response', responseCallback);
      NavService.goBack();
    });
  };

  reactPost = (id, reaction) => {
    const {item} = this.state;
    const payload = {post_id: id, reaction: reaction.title};
    this.props.likePost(payload, responseCallback => {
      let temp = JSON.stringify(item);
      temp = JSON.parse(temp);
      if (responseCallback?.message === 'Post Unliked.' && temp.isLike == 1) {
        temp.likes_count = temp.likes_count - 1;
        temp.isLike = 0;
        this.setState({item: temp});
      } else if (
        responseCallback?.message === 'Post Liked successfully.' &&
        temp.isLike == 0
      ) {
        temp.likes_count = temp.likes_count + 1;
        temp.isLike = 1;
        this.setState({item: temp});
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
      this.setState({isModalVisible: true, reportItem: null});
    });
  };

  handleRadioSelect = value => {
    this.setState({selectedValue: value});
  };

  ListHeaderComponent = () => {
    return (
      <>
        <Search />
        <View style={styles.container} />
      </>
    );
  };

  toggleModal = () => {
    this.setState(previousState => ({
      isModalVisible: !previousState.isModalVisible,
    }));
  };

  getPost = () => {
    const {item} = this.state;
    this.props.postDetail(item.id, response => {
      this.setState({item: response?.data});
    });
  };

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
      showw,
      openToolTip,
      item,
      reportItem,
    } = this.state;

    const {showName, show} = this.props.route.params;

    console.log({show});

    return (
      <AppBackground
        back
        Save={false}
        title={showName?.length > 0 ? showName : t('str_Journal')}
        marginHorizontal={false}
        bottomLine={false}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            this.setState({
              showw: null,
              openToolTip: null,
            });
          }}>
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
                : null
            }
            reportType={reportTypes}
            // subTitle={' You want to Delete Account?'}
            onAccept={(selected, something) => {
              if (selected === null) {
                Toast.show({
                  text1: `${t('str_violation')}`,
                  type: 'error',
                  visibilityTime: 3000,
                });
                return;
              }

              if (selected === 'Something Else' && something === '') {
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
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1, paddingTop: 15}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={[item]}
            renderItem={({item, index}) => (
              <Card
                dots={false}
                reportTypeCallback={value => {
                  this.setState({
                    reportTypes: value,
                    reportItem: {...item, index},
                  });
                }}
                selectedValue={this.state.selectedValue}
                curentFocus={this}
                // isJournal
                item={item}
                imgAvailable={true}
                // noComment={true}
                showPostDream={show ? show : false}
                show={showw}
                index={index}
                openToolTip={openToolTip}
                toggleToolTip={val => {
                  if (openToolTip === val) {
                    this.setState({
                      openToolTip: null,
                      showw: null,
                    });
                  } else {
                    this.setState({
                      openToolTip: val,
                      showw: null,
                    });
                  }
                }}
                toggleShow={val => {
                  this.setState({
                    showw: val,
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
                  this.deletePost(item.id);
                }}
                onReact={reaction => {
                  this.reactPost(item.id, reaction);
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
        </TouchableOpacity>
      </AppBackground>
    );
  }
}

const actions = {
  reportPost,
  hidePost,
  savePost,
  deletePost,
  likePost,
  postDetail,
};

export default compose(withTranslation(), connect(null, actions))(PostDream);
