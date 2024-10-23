import {Platform} from 'react-native';
import {requestNotifications, openSettings} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import store from '../../index';
import ActionTypes from '../../constants';
function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  return {
    type: 'LOADER_START',
  };
}
export function saveSocket(socket) {
  dispatch({type: 'SAVE_SOCKET', payload: socket});
}
export function loaderStartWithDispatch() {
  dispatch({type: 'LOADER_START'});
}
export function loaderStopWithDispatch() {
  dispatch({type: 'LOADER_STOP'});
}
export function loaderStop() {
  return {
    type: 'LOADER_STOP',
  };
}
export function notificationSettingToggle(payload) {
  return {
    type: 'NOTIFICATION_SETTING_TOGGLE',
    payload,
  };
}
export function toggleCurrentSelectedLanguage(payload) {
  return {
    type: 'TOGGLE_CURRENT_SELECTED_LANGUAGE',
    payload: payload,
  };
}
export async function requestUserPermission() {
  if (Platform.OS === 'android') {
    requestNotifications(['alert', 'sound', 'badge', 'carPlay']).then(
      ({status, settings}) => {
        if (status === 'granted') {
          console.log('status', status);
        } else if (status === 'denied') {
          Toast.show({
            text1: 'Please open notification setting to recieve notification',
            type: 'error',
            visibilityTime: 5000,
          });
          openSettings();
        } else if (status === 'blocked') {
          Toast.show({
            text1: 'Please open notification setting to recieve notification',
            type: 'error',
            visibilityTime: 5000,
          });
          openSettings();
        }
      },
    );
  }
  const authStatus = await messaging().requestPermission({
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    provisional: false,
    sound: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getDeviceToken();
  }
}
export const getDeviceToken = async () => {
  try {
    // await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    if (token) return token;
    else return '';
  } catch (error) {
    console.log(error);
  }
};

export function userProfile(payload, responseCallback) {
  return {
    type: ActionTypes.USER_PROFILE.REQUEST,
    payload,
    responseCallback,
  };
}

export function changePassword(payload) {
  return {
    type: ActionTypes.CHANGE_PASSWORD.REQUEST,
    payload,
  };
}

export function getStates(responseCallback) {
  return {
    type: ActionTypes.GET_ALL_STATES.REQUEST,
    responseCallback,
  };
}
export function getFuel(responseCallback) {
  return {
    type: ActionTypes.GET_ALL_FUEL.REQUEST,
    responseCallback,
  };
}
export function getGeneratorType(responseCallback) {
  return {
    type: ActionTypes.GET_ALL_GENERATOR_TYPE.REQUEST,
    responseCallback,
  };
}
export function skipOnBoarding(payload) {
  return {
    type: ActionTypes.SKIP_ONBOARDING.REQUEST,
    payload,
  };
}
export function addAddress(payload, navigateTo) {
  return {
    type: ActionTypes.ADD_ADDRESS.REQUEST,
    payload,
    navigateTo,
  };
}
export function getAddressess(params, responseCallback) {
  return {
    type: ActionTypes.GET_ADDRESSES.REQUEST,
    params,
    responseCallback,
  };
}
export function deleteAddress(params, responseCallback) {
  return {
    type: ActionTypes.DELETE_ADDRESS.REQUEST,
    params,
    responseCallback,
  };
}
export function updateAddress(payload) {
  return {
    type: ActionTypes.UPDATE_ADDRESS.REQUEST,
    payload,
  };
}
export function saveGeneratorDetails(payload, user, navigateTo) {
  return {
    type: ActionTypes.ADD_GENERATOR.REQUEST,
    payload,
    user,
    navigateTo,
  };
}
export function updateGeneratorInfo(payload) {
  return {
    type: ActionTypes.EDIT_GENERATOR.REQUEST,
    payload,
  };
}
export function getGenerator(params, responseCallback) {
  return {
    type: ActionTypes.GET_GENERATOR.REQUEST,
    params,
    responseCallback,
  };
}
export function deleteGenerator(params, responseCallback) {
  return {
    type: ActionTypes.DELETE_GENERATOR.REQUEST,
    params,
    responseCallback,
  };
}
export function getMaintenanceRequest(responseCallback) {
  return {
    type: ActionTypes.GET_ALL_MAINTENANCE.REQUEST,
    responseCallback,
  };
}
export function createMaintenanceRequest(payload) {
  return {
    type: ActionTypes.CREATE_MAINTENANCE_REQUEST.REQUEST,
    payload,
  };
}
export function postDream(payload, responseCallback) {
  return {
    type: ActionTypes.CREATE_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function editPost(payload, responseCallback) {
  return {
    type: ActionTypes.EDIT_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function deletePost(payload, responseCallback) {
  return {
    type: ActionTypes.DELETE_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function viewPost(payload, responseCallback) {
  return {
    type: ActionTypes.VIEW_POST.REQUEST,
    responseCallback,
    payload,
  };
}
export function postDetail(payload, responseCallback) {
  return {
    type: ActionTypes.POST_DETAIL.REQUEST,
    payload,
    responseCallback,
  };
}
export function likeDetail(payload, responseCallback) {
  return {
    type: ActionTypes.LIKE_DETAIL.REQUEST,
    payload,
    responseCallback,
  };
}
export function likePost(payload, responseCallback) {
  return {
    type: ActionTypes.LIKE_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function commentPost(payload, responseCallback) {
  return {
    type: ActionTypes.COMMENT_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function commentDetail(payload, responseCallback) {
  return {
    type: ActionTypes.COMMENT_DETAIL.REQUEST,
    payload,
    responseCallback,
  };
}
export function reportPost(payload, responseCallback) {
  return {
    type: ActionTypes.REPORT_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function hidePost(payload, responseCallback) {
  return {
    type: ActionTypes.HIDE_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function savePost(payload, responseCallback) {
  return {
    type: ActionTypes.SAVE_POST.REQUEST,
    payload,
    responseCallback,
  };
}
export function viewSavedPost(responseCallback) {
  return {
    type: ActionTypes.VIEW_SAVED_POST.REQUEST,
    responseCallback,
  };
}
export function journalPosts(payload, responseCallback) {
  return {
    type: ActionTypes.VIEW_JOURNAL_POST.REQUEST,
    payload,
    responseCallback,
  };
}

export function searchPosts(payload, responseCallback) {
  return {
    type: ActionTypes.SEARCH_POSTS.REQUEST,
    payload,
    responseCallback,
  };
}
export function searchJournal(payload, responseCallback) {
  return {
    type: ActionTypes.SEARCH_JOURNAL.REQUEST,
    payload,
    responseCallback,
  };
}
export function filterJournals(payload, responseCallback) {
  return {
    type: ActionTypes.FILTER_JOURNAL.REQUEST,
    payload,
    responseCallback,
  };
}
export function followUsers(payload, responseCallback) {
  return {
    type: ActionTypes.FOLLLOW_USERS.REQUEST,
    payload,
    responseCallback,
  };
}
export function notifications(responseCallback) {
  return {
    type: ActionTypes.NOTIFICATIONS.REQUEST,
    responseCallback,
  };
}
export function toggleNotifications(payload, responseCallback) {
  return {
    type: ActionTypes.TOGGLE_NOTIFICATION.REQUEST,
    payload,
    responseCallback,
  };
}
export function deleteAccount(responseCallback) {
  return {
    type: ActionTypes.DELETE_ACCOUNT.REQUEST,
    responseCallback,
  };
}
export function updateRequest(payload, responseCallback) {
  return {
    type: ActionTypes.UPDATE_FOLLOW_REQUEST.REQUEST,
    payload,
    responseCallback,
  };
}
export function chatMessages(responseCallback) {
  return {
    type: ActionTypes.CHAT_MESSAGES.REQUEST,
    responseCallback,
  };
}
export function deleteChat(payload, responseCallback) {
  return {
    type: ActionTypes.DELETE_CHAT.REQUEST,
    payload,
    responseCallback,
  };
}
export function subscriptions(responseCallback) {
  return {
    type: ActionTypes.SUBSCRIPTIONS.REQUEST,
    responseCallback,
  };
}
export function buySubscription(payload, responseCallback) {
  return {
    type: ActionTypes.BUY_SUBSCRIPTION.REQUEST,
    responseCallback,
    payload,
  };
}
export function chatAttachment(payload, responseCallback) {
  return {
    type: ActionTypes.ATTACHMENT.REQUEST,
    payload,
    responseCallback,
  };
}
export function becomeVerified(payload, responseCallback) {
  return {
    type: ActionTypes.BECOME_VERIFIED.REQUEST,
    payload,
    responseCallback,
  };
}
