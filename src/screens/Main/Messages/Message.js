import React, {Component, useState} from 'react';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import Shadows from '../../../helpers/Shadows';
import {colors, HP, size, WP, family} from '../../../utils';
import {appIcons} from '../../../assets';
import ImagePicker from '../../../components/ImagePicker';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {chatAttachment} from '../../../redux/actions/appAction';
import {ASSETS_URL} from '../../../config/WebService';
const {width} = Dimensions.get('window');

class Message extends Component {
  // const {t}=this.props
  constructor(props) {
    super(props);
    this.state = {
      key: false,
      item: this.props.route.params,
      messages: [],
    };
  }

  listenToMessages = () => {
    const {socket, user} = this.props;
    const {item} = this.state;
    socket?.emit('get_messages', {
      sender_id: user?.user_id,
      receiver_id: item?.id,
    });

    socket?.on('response', response => {
      if (response?.object_type === 'get_message') {
        let temp = response?.data.sort((a, b) => a.created_at - b.created_at);
        this.setState({messages: [...temp]});
      }
      if (response?.object_type === 'get_messages') {
        let temp = response?.data.sort((a, b) => a.created_at - b.created_at);
        this.setState({messages: [...temp]});
      }
    });

    socket?.on('error', data => {
      console.log('socket error', data);
    });
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.listenToMessages();
      },
    );
  }

  render() {
    const {messages} = this.state;
    const data = this.props.route.params?.data;

    let messageInput = React.createRef(null);
    let message = React.createRef('');

    const {key, item} = this.state;

    const {t} = this?.props;

    const sendAttachment = attachment => {
      const form = new FormData();
      form.append('attachment', {
        uri: attachment?.path,
        name: `attachment_${Date.now()}.${attachment?.mime.slice(
          attachment?.path.lastIndexOf('/') + 1,
        )}`,
        type: attachment?.mime,
      });
      this.props.chatAttachment(form, response => {
        if (response?.data?.attachUrl) {
          sendMessage(response?.data?.attachUrl, 'attachment');
        }
      });
    };

    const sendMessage = (message, type) => {
      const {socket, user} = this.props;
      const {item} = this.state;
      socket?.emit('send_message', {
        sender_id: user?.user_id,
        receiver_id: item?.id,
        type,
        message,
      });
      message.current = '';
      messageInput?.clear();
    };

    return (
      <AppBackground
        imgUri={item?.profile_image}
        title={item?.full_name}
        back={true}
        Save={false}
        profile={true}
        childrenContainerStyle={{
          marginHorizontal: 0,
          marginBottom: 0,
        }}>
        <FlatList
          key={key}
          data={messages}
          initialNumToRender={messages.length}
          inverted
          showsVerticalScrollIndicator={false}
          style={{flex: 1, marginBottom: 10}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 3,
            marginHorizontal: 20,
            flexDirection: 'column-reverse',
          }}
          renderItem={({item}) => (
            <MessageList item={item} receiverData={data} />
          )}
        />

        <View style={styles.textContainer}>
          <TextInput
            ref={input => {
              messageInput = input;
            }}
            style={styles.txtInput}
            placeholder={t('str_Type_a_message')}
            placeholderTextColor={colors.darkGray}
            value={message}
            // maxLength={64}
            onChangeText={text => {
              console.log(text);
              message.current = text;
            }}
          />
          <TouchableOpacity
            style={{marginHorizontal: 10}}
            activeOpacity={0.8}
            onPress={() => {
              this.setState({key: !key});
            }}>
            <ImagePicker
              onImageChange={(path, mime) => {
                this.setState({key: !key});
                sendAttachment({path, mime});
              }}>
              <Image
                source={appIcons.clip}
                style={styles.clip}
                resizeMode="contain"
              />
            </ImagePicker>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              sendMessage(message.current, 'text');
              // sendNewMessage('text');
            }} // onPress={() => {
            //   console.log(messages, 'Abcdddd');
            //   const currentmessage = messages.unshift({
            //     message,
            //     type: 'message',
            //     createdAt: moment().format('h:mm a'),
            //     isMine: true,
            //   });
            //   this.setState({message: currentmessage});
            // }}
          >
            <Image source={appIcons.send} style={styles.send} />
          </TouchableOpacity>
        </View>
      </AppBackground>
    );
  }
}
// export default withTranslation()(Message);

const MessageList = ({item, receiverData}) => {
  const {message, created_at, type, sender_id, profile_image} = item;
  const {user} = useSelector(state => state.authReducer);
  const isMine = sender_id == user?.user_id ? true : false;

  return (
    <View
      style={[
        styles.listContainer,
        {
          flexDirection: isMine ? 'row-reverse' : 'row',
        },
      ]}>
      <Image
        source={
          profile_image
            ? {uri: ASSETS_URL + profile_image}
            : appIcons.userPlaceholder
        }
        style={[
          styles.userImage,
          {
            marginRight: isMine ? 0 : 10,
            marginLeft: isMine ? 10 : 0,
            borderColor: isMine ? colors.primary : colors.blue,
          },
        ]}
        resizeMode="contain"
      />
      {type === 'attachment' ? (
        <Image
          source={{uri: ASSETS_URL + message}}
          style={[styles.attachment]}
        />
      ) : (
        <View
          style={[
            {
              // backgroundColor: isMine ? colors.primary : colors.blue,
              borderTopRightRadius: isMine ? 0 : 50,
              borderBottomRightRadius: isMine ? 40 : 50,
              borderBottomLeftRadius: isMine ? 40 : 40,
              borderTopLeftRadius: isMine ? 40 : 0,
            },
          ]}>
          <LinearGradient
            colors={isMine ? colors.gradient : colors.bluegradient}
            style={[
              styles.listCard,
              {
                borderTopRightRadius: isMine ? 0 : 50,
                borderBottomRightRadius: isMine ? 40 : 50,
                borderBottomLeftRadius: isMine ? 40 : 40,
                borderTopLeftRadius: isMine ? 40 : 0,
              },
            ]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1.4}}>
            {type == 'image' ? (
              <Image
                source={{uri: message}}
                style={styles.ImageUpload}
                resizeMode="contain"
              />
            ) : (
              <Text
                style={{
                  color: isMine ? colors.white : colors.white,
                  fontSize: size.small,
                  fontFamily: family?.ArialCE,
                }}>
                {message}
              </Text>
            )}
          </LinearGradient>
        </View>
      )}

      <View
        style={[
          styles.timeContainer,
          {
            bottom: -20,
            left: isMine ? '20%' : '20%',
          },
        ]}>
        <Text
          style={[
            styles.messagetxt,
            {
              color: colors.gray,
            },
          ]}>
          {moment(created_at).format('hh:mm A DD MMM, YYYY')}
        </Text>
      </View>
    </View>
  );
};

const actions = {chatAttachment};

function mapStateToProps({authReducer, appReducer}) {
  return {
    user: authReducer?.user,
    socket: appReducer?.socket,
    selectedtLanguage: appReducer?.selectedtLanguage,
  };
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, actions),
)(Message);
