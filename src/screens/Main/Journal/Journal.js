import React, {Component, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SectionList,
  Image,
  RefreshControl,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {HP, WP, colors} from '../../../utils';
import {appIcons} from '../../../assets';
import {Tooltip} from 'react-native-elements';
import NavService from '../../../helpers/NavService';
import {CustomSearchInput} from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import {
  journalPosts,
  searchJournal,
  filterJournals,
  deletePost,
} from '../../../redux/actions/appAction';
import {compose} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {ASSETS_URL} from '../../../config/WebService';
import CustomModal from '../../../components/CustomModal';
import JournalFilters from '../../../components/JournalFilters';

// import {t} from 'i18next';

const {width} = Dimensions.get('screen');
class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJournal: true,
      data: [],
      days: ['Daily', 'Monthly'],
      selectLanguage: 'Monthly',
      userSelect: '',
      toolTipVisibility: false,
      selected: false,
      modalVisible: false,
      filters: null,
      isRefreshed: false,
    };
  }

  ListHeaderComponent = t => {
    const {isJournal, ListOfLanguages, days} = this.state;
    const [userselect, Setuser] = useState('');
    return (
      <View style={{backgroundColor: colors.bgApp, marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => {
            this.setState({modalVisible: true});
          }}>
          <CustomSearchInput
            placeholderColor={colors.gray}
            placeholder={t('str_Search')}
            editable={false}
            leftIcon={appIcons.search}
            textInputStyles={{}}
            rightImage={appIcons.filter}
            containerStyle={{width: '98%', paddingHorizontal: 10}}
          />
        </TouchableOpacity>

        {/* <Search /> */}
        <View
          style={
            {
              // flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'flex-end',
              // position: 'relative',
            }
          }>
          {/* <Text style={styles.filter}>Notes</Text> */}
          {/* <TouchableOpacity>
            <Tooltips
              height={80}
              width={100}
              containerStyle={styles.toolTip}
              popover={
                <View style={styles.toolView}>
                  <TouchableOpacity style={styles.tooltipItems1}>

                    <Text style={styles.tooltipTitle}>Daily</Text>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tooltipItems} onPress={() => {
                    this.setState({ toolTipVisibility: false });
                    setTimeout(() => {
                      removeItem(item.id)
                    }, 850)
                  }}>

                    <Text style={styles.tooltipTitle1}>Monthly</Text>

                  </TouchableOpacity>
                </View>
              }
              withPointer={false}
              backgroundColor={colors.white}>
              <View style={{ flexDirection: 'row', backgroundColor: colors.white, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 5 }}>
                <Text>
                  Select Option
                </Text>
                <Image
                  source={appIcons.dropdown2}
                  style={styles.img}
                  resizeMode={'contain'}
                />
              </View>
            </Tooltip>
          </TouchableOpacity> */}
          {/* <SelectList
            onSelect={() => item => {
              Setuser(item);
            }}
            setSelected={item => {
              console.log('item', item);
              Setuser(item);
            }}
            data={days}
            arrowicon={
              <Image style={styles.imgstyle2} source={appIcons.dropdown} />
            }
            search={false}
            boxStyles={styles.selectionBox} //override default styles
            dropdownStyles={styles.selectionBox1}
            dropdownTextStyles={styles.select}
            inputStyles={styles.select}
            placeholder={''}
          /> */}
        </View>
      </View>
    );
  };

  filterJournals = filter => {
    const {filters} = this.state;
    if (filter) {
      let payload = {
        title: filter?.search,
      };
      if (filter?.isCheck) {
        payload = {
          ...payload,
          from_date: filter?.date,
          to_date: filter?.date1,
        };
      }
      if (filter?.isCheck2) {
        payload = {...payload, this_week: true};
      }
      if (filter?.isCheck3) {
        payload = {...payload, last_week: true};
      }
      if (filter?.isCheck4) {
        payload = {...payload, last_30_days: true};
      }
      this.setState(
        prevState => ({
          filter: payload,
          data: [
            {title: 'Today', data: []},
            {title: 'Yesterday', data: []},
            {title: 'Earlier', data: []},
          ],
          isRefreshed: !prevState.isRefreshed,
        }),
        () => {
          this.props.filterJournals(payload, responseCallback => {
            if (responseCallback?.data) {
              let today = {title: 'Today', data: []};
              let yesterday = {title: 'Yesterday', data: []};
              let earlier = {title: 'Earlier', data: []};
              responseCallback?.data?.forEach(v => {
                if (moment().diff(v?.created_at, 'days') <= 0) {
                  today.data.push(v);
                } else if (moment().diff(v?.created_at, 'days') === 1) {
                  yesterday.data.push(v);
                } else {
                  earlier.data.push(v);
                }
              });
              this.setState({data: [{...today}, {...yesterday}, {...earlier}]});
            }
          });
        },
      );
    } else {
      this.setState(
        prevState => ({
          filter: payload,
          data: [
            {title: 'Today', data: []},
            {title: 'Yesterday', data: []},
            {title: 'Earlier', data: []},
          ],
          isRefreshed: !prevState.isRefreshed,
        }),
        () => {
          this.props.filterJournals(filters, responseCallback => {
            if (responseCallback?.data) {
              let today = {title: 'Today', data: []};
              let yesterday = {title: 'Yesterday', data: []};
              let earlier = {title: 'Earlier', data: []};
              responseCallback?.data?.forEach(v => {
                if (moment().diff(v?.created_at, 'days') <= 0) {
                  today.data.push(v);
                } else if (moment().diff(v?.created_at, 'days') === 1) {
                  yesterday.data.push(v);
                } else {
                  earlier.data.push(v);
                }
              });
              this.setState({data: [{...today}, {...yesterday}, {...earlier}]});
            }
          });
        },
      );
    }
  };

  toggleVisibility = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  };

  deletePost = item => {
    const {filters, data} = this.state;
    const payload = {post_id: item?.id};
    this.props.deletePost(payload, responseCallback => {
      let temp =
        data[0].data.length + data[1].data.length + data[2].data.length;
      if (temp <= 1) {
        NavService.navigate('BottomTabs', {screen: 'Home'});
      } else {
        if (filters) {
          this.filterJournals();
        } else {
          this.getJournalPosts();
        }
      }
    });
  };

  getJournalPosts = () => {
    this.setState(
      prevState => ({
        data: [
          {title: 'Today', data: []},
          {title: 'Yesterday', data: []},
          {title: 'Earlier', data: []},
        ],
        isRefreshed: !prevState.isRefreshed,
      }),
      () => {
        const payload = {};
        this.props.journalPosts(payload, responseCallback => {
          if (responseCallback?.data) {
            let today = {title: 'Today', data: []};
            let yesterday = {title: 'Yesterday', data: []};
            let earlier = {title: 'Earlier', data: []};
            responseCallback?.data?.forEach(v => {
              if (moment().diff(v?.created_at, 'days') <= 0) {
                today.data.push(v);
              } else if (moment().diff(v?.created_at, 'days') === 1) {
                yesterday.data.push(v);
              } else {
                earlier.data.push(v);
              }
            });
            this.setState({data: [{...today}, {...yesterday}, {...earlier}]});
          }
        });
      },
    );
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getJournalPosts();
    });
  }

  render() {
    const {t, user} = this?.props;
    const {modalVisible, isRefreshed} = this.state;
    let currentDate = new Date();
    currentDate = currentDate.toISOString();

    const {data, selected, filters} = this.state;
    const removeItem = id => {
      const deleteCard = data.filter(item => item.id !== id);
      this.setState({data: deleteCard});
    };
    const RenderItem = ({item, index}) => {
      // var date1 = new Date(item.date);
      // var date2 = new Date(currentDate);
      // let diff = date2 - date1;
      // var differenceInDays = diff / (1000 * 3600 * 24);
      // console.log({differenceInDays: Math.ceil(differenceInDays)});

      const tooltipRef = useRef(null);
      return (
        <>
          <View style={{marginVertical: 10}}>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('PostDream', {
                  show: true,
                  item,
                });
              }}
              style={[
                styles.mainView,
                {
                  backgroundColor: selected ? colors.lightGray : colors.white,
                },
              ]}>
              <View style={styles.mainView2}>
                <Text style={[styles.txtStyle, {width: 75}]}>
                  {t('str_title')}
                </Text>
                <Text style={[styles.txtStyle, {width: 25}]}>:</Text>
                <Text style={[styles.txtStyle, {width: 125}]}>
                  {item.title}
                </Text>
                {item?.user_id === user?.user_id ? (
                  <View style={styles.tchStyle}>
                    <Tooltip
                      ref={tooltipRef}
                      width={120}
                      containerStyle={styles.toolTip}
                      popover={
                        <TouchableOpacity
                          style={styles.tooltipItems}
                          onPress={() => {
                            tooltipRef.current.toggleTooltip();
                            this.deletePost(item);
                            Toast.show({
                              text1: t(`str_Post_removed_successfully`),
                              type: 'success',
                              visibilityTime: 3000,
                            });
                            setTimeout(() => {
                              removeItem(item.id);
                            }, 850);
                          }}>
                          <View style={styles.row}>
                            <Image
                              source={appIcons.trash2}
                              style={styles.trash}
                            />
                            <Text style={styles.tooltipTitle1}>
                              {t('str_Remove')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      }
                      withPointer={false}
                      backgroundColor={colors.white}>
                      <Image
                        source={appIcons.dots}
                        style={styles.img}
                        resizeMode={'contain'}
                      />
                    </Tooltip>
                  </View>
                ) : null}
              </View>

              <View style={styles.mainView2}>
                <Text style={[styles.txtStyle, {width: 75}]}>
                  {t('str_date')}
                </Text>
                <Text style={[styles.txtStyle, {width: 25}]}>:</Text>
                <Text style={[styles.txtStyle, {width: 125}]}>
                  {moment(item.created_at).format('DD MMM, YYYY')}
                </Text>
              </View>
              {item?.image ? (
                <Image
                  source={{uri: ASSETS_URL + item.image}}
                  resizeMode="contain"
                  style={{
                    alignSelf: 'center',
                    marginTop: 5,
                    marginBottom: 10,
                    backgroundColor: colors.lightGray,
                    width: WP('80%'),
                    height: HP('18%'),
                    borderRadius: 30,
                    zIndex: 0,
                  }}
                />
              ) : null}

              <View style={styles.mainView2}>
                <Text style={[styles.txtStyle, {width: 75}]}>
                  {t('str_topic')}
                </Text>
                <Text style={[styles.txtStyle, {width: 25}]}>:</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.scary}>
                  <Text
                    style={[
                      styles.txtStyle,
                      {width: 110, textAlign: 'center', color: colors.t2},
                    ]}>
                    {item.topic}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mainView2}>
                <Text style={[styles.txtStyle, {width: 75}]}>
                  {t('str_feelings')}
                </Text>
                <Text style={[styles.txtStyle, {width: 25}]}>:</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.feel}>
                  <Text
                    style={[
                      styles.txtStyle,
                      {width: 110, textAlign: 'center'},
                    ]}>
                    {item.feeling}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </>
      );
    };
    return (
      <AppBackground
        menu={true}
        title={t('str_Journal')}
        notification
        bottomLine={false}
        Save
        savePost
        appBackground={true}
        marginHorizontal={false}>
        <SectionList
          extraData={isRefreshed}
          style={{flex: 1, zIndex: 0}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: width * 0.265 + 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                if (filters) {
                  this.filterJournals();
                } else {
                  this.getJournalPosts();
                }
              }}
            />
          }
          ListHeaderComponent={() => this.ListHeaderComponent(t)}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          sections={data}
          renderItem={({item, index}) => {
            return <RenderItem item={item} index={index} />;
          }}
          renderSectionHeader={({section: {title, data}}) =>
            data?.length ? <Text style={styles.header}>{title}</Text> : null
          }
        />
        <CustomModal
          style={{backgroundColor: 'white', padding: 0, margin: 0}}
          visible={modalVisible}
          togglePopup={this.toggleVisibility}>
          <JournalFilters
            onFilter={filters => {
              this.toggleVisibility();
              if ((!filters?.date1 || !filters?.date) && filters?.isCheck) {
                Toast.show({
                  text1: t('str_start_end_date'),
                  type: 'success',
                  visibilityTime: 3000,
                });
              } else {
                this.filterJournals(filters);
              }
            }}
            onClose={this.toggleVisibility}
          />
        </CustomModal>
      </AppBackground>
    );
  }
}

function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}

const actions = {journalPosts, searchJournal, filterJournals, deletePost};

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(Journal);
