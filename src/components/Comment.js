import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {appIcons} from '../assets';
import {colors, size} from '../utils';
import AppBackground from './AppBackground';
import {commentDetail, commentPost} from '../redux/actions/appAction';
import Card from './Card';
import {homeData, homeDatas} from '../utils/dummyData';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {ASSETS_URL} from '../config/WebService';
const vh = Dimensions.get('window').height * 0.01;

const Comment = ({route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [commentsList, setCommentsList] = useState([
    // {
    //   comment: 'New comment',
    //   name: 'John',
    //   date: new Date(),
    // },
    // {
    //   comment: 'New comment',
    //   name: 'Smith',
    //   date: new Date(),
    // },
  ]);
  const [comment, setComment] = useState('');

  const sendComment = () => {
    if (!comment) {
      Toast.show({
        type: 'error',
        text1: t('str_Please_enter_comment'),
      });
      return;
    }
    const payload = {
      post_id: item.id,
      comment: comment,
    };

    dispatch(
      commentPost(payload, responseCallback => {
        let commentListUpdated = [...commentsList];
        commentListUpdated.unshift(responseCallback.data);
        setCommentsList(commentListUpdated);
        setComment('');
      }),
    );
  };
  const _renderItem = ({item}) => {
    return (
      <View style={styles.bubbleContainer}>
        <View style={styles.innerContainer}>
          <Image
            // source={{
            //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQey3S6VQ4qIppedXehx8CQYDshaMBwU1UwpQ&usqp=CAU',
            // }}
            source={
              item?.user?.profile_image
                ? {uri: ASSETS_URL + item?.user?.profile_image}
                : appIcons.userPlaceholder
            }
            style={styles.userImage}
          />
          <View style={styles.messageContainer}>
            <Text
              style={[
                styles.message,
                {fontWeight: '600', fontSize: 1.8 * vh, marginBottom: 4},
              ]}>
              {item?.user?.full_name}
            </Text>
            <Text style={[styles.message, {textAlign: 'justify'}]}>
              {item?.comment}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const getComments = () => {
    const payload = {
      post_id: item.id,
    };
    dispatch(
      commentDetail(payload, responseCallback => {
        if (responseCallback?.data) {
          setCommentsList(responseCallback.data);
        }
      }),
    );
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <AppBackground
      back={true}
      title={t('str_comments')}
      marginHorizontal={false}>
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
          data={commentsList}
          renderItem={_renderItem}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getComments} />
          }
        />

        <View
          style={{
            height: 55,
            marginBottom: 10,
            backgroundColor: colors.white,
            borderRadius: 30,
            ...Shadows.shadow3,
            // paddingBottom: 12,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // marginHorizontal: 20,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{flex: 1, height: '100%', color: colors.black}}
            placeholder={t('str_Write_your_comment_here...')}
            placeholderTextColor={colors.darkGray}
            value={comment}
            onChangeText={text => setComment(text)}
          />

          <TouchableOpacity style={styles.button} onPress={() => sendComment()}>
            <Image source={appIcons.send} style={{width: 40, height: 40}} />
          </TouchableOpacity>
        </View>
      </View>
    </AppBackground>
  );
};
export default Comment;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: 70,
  },
  attachements: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 5,
    backgroundColor: colors.grey,
  },
  inputStyles: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    color: 'black',
  },
  button: {
    height: 40,
    justifyContent: 'center',
  },
  sendText: {
    fontSize: 2.5 * vh,
    color: colors.blue,
  },
  userImage: {
    width: 6 * vh,
    height: 6 * vh,
    borderRadius: 3 * vh,
    resizeMode: 'cover',
    backgroundColor: colors.grey,
  },
  bubbleContainer: {
    flexWrap: 'wrap',
  },
  ownContainer: {
    flexWrap: 'wrap-reverse',
  },
  messageContainer: {
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  ownMessageContainer: {
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  timeText: {
    fontSize: 1.6 * vh,
    marginTop: 2,
    marginLeft: 60,
    color: colors.darkGray,
  },
  ownTimeText: {
    alignSelf: 'flex-start',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownMessage: {
    color: colors.white,
    fontSize: 1.9 * vh,
  },
  message: {
    // fontSize: 1.7 * vh,
    fontSize: size.xsmall,
    color: colors.darkGray,
  },
});
