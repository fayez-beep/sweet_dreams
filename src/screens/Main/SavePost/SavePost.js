import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import Card from '../../../components/Card';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {
  likePost,
  savePost,
  hidePost,
  deletePost,
  reportPost,
  viewSavedPost,
} from '../../../redux/actions/appAction';
import ConfirmationModal from '../../../components/ConfirmationModal';
import NavService from '../../../helpers/NavService';

const {width} = Dimensions.get('screen');

class SavePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      reportOther: '',
      confirmationModalVisible: false,
      reportTypes: '',
      show: null,
      openToolTip: null,
      data: [],
      reportItem: null,
      isModalVisible: false,
    };
  }

  handleRadioSelect = value => {
    this.setState({selectedValue: value});
  };

  getSavedPosts = () => {
    this.setState({data: []}, () => {
      this.props.viewSavedPost(responseCallback => {
        if (responseCallback?.data) {
          this.setState({data: responseCallback?.data});
        }
      });
    });
  };

  toggleModal = () => {
    this.setState(previousState => ({
      isModalVisible: !previousState.isModalVisible,
    }));
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

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getSavedPosts();
    });
  }

  render() {
    const {t} = this.props;
    const {
      selectedValue,
      reportOther,
      confirmationModalVisible,
      reportTypes,
      show,
      openToolTip,
      data,
      reportItem,
    } = this.state;
    return (
      <AppBackground
        back
        Save={false}
        title={t('str_SavedPost')}
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
                onRefresh={this.getSavedPosts}
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
                unsave={true}
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
        </TouchableOpacity>
      </AppBackground>
    );
  }
}

function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}

const actions = {
  likePost,
  savePost,
  hidePost,
  deletePost,
  reportPost,
  viewSavedPost,
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(SavePost);
