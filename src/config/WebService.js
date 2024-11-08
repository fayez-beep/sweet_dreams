import _ from 'lodash';
import ApiSauce from '../services/ApiSauce';
import store from '../redux';

// export const BASE_URL = 'https://server.appsstaging.com:3017/api/v1/';
export const BASE_URL =
  'https://server1.appsstaging.com/3559/sweet_dreams/public/api/';
export const ASSETS_URL =
  'https://server1.appsstaging.com/3559/sweet_dreams/public/storage/';
export const WEB_SOCKET_URL = 'https://server1.appsstaging.com:3087/';
// export const BASE_URL = "http://10.0.4.71:3018/api/v1/"; //local
// export const ASSETS_URL = "http://10.0.4.71:3018/"; //local
export const API_TIMEOUT = 20000;
export const NEW_API_KEY = '1d399038bef14b0497d028fc27999696';
export const GEOCODE_API_KEY = 'AIzaSyBmaS0B0qwokES4a_CiFNVkVJGkimXkNsk';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};
export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};
export const ERROR_CANCEL_ERROR = {
  message: 'Upload cancelled',
  error: 'Upload cancelled',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const LOGIN = {
  route: 'login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const SIGNUP = {
  route: 'signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const VERIFY_OTP = {
  route: 'verification',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESET_PASSWORD = {
  route: 'reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESEND_OTP = {
  route: 'resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESEND_OTP_FORGET_PASSWORD = {
  route: 'forgot-password-resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const FORGOT_PASSWORD = {
  route: 'forgot-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const SOCIAL_SIGIN = {
  route: 'social-login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const LOGOUT = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const COMPLETE_PROFILE = {
  route: 'complete-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_PROFILE = {
  route: 'updateCustomer',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_PASSWORD = {
  route: 'change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_USER = {
  route: 'delete-account',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_ALL_CITIES = {
  route: 'getCities',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_ALL_STATES = {
  route: 'getStates',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_ALL_FUEL = {
  route: 'getFuel',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_ALL_GENERATOR_TYPE = {
  route: 'getGeneratorType',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const SKIP_ONBOARDING = {
  route: 'skip',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const ADD_ADDRESS = {
  route: 'addAddress',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_ADDRESS = {
  route: 'updateAddress',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_ADDRESS = {
  route: 'deleteAddress',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_ADDRESSES = {
  route: 'getAddresses',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_GENERATORS = {
  route: 'getGeneratorsOfCustomer',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_GENERATOR = {
  route: 'deleteGenerator',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_MAINTENANCE = {
  route: 'getMaintenanceOfCustomer',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CREATE_MAINTENANCE = {
  route: 'createMaintenance',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ADD_GENERATOR = {
  route: 'addGenerator',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_GENERATOR = {
  route: 'updateGenerator',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const Content_Saga = {
  route: 'content',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

//In_APP Routes

export const USER_PROFILE = {
  route: 'user-profile',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const CREATE_POST = {
  route: 'post/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_POST = {
  route: 'post/edit',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_POST = {
  route: 'post/delete',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const VIEW_POST = {
  route: 'post/view',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const POST_DETAIL = {
  route: 'post/detail',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const LIKE_DETAIL = {
  route: 'post/like-detail',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const LIKE_POST = {
  route: 'post/like',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const COMMENT_POST = {
  route: 'post/comment',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const COMMENT_DETAIL = {
  route: 'post/comment-detail',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const REPORT_POST = {
  route: 'post/report',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const HIDE_POST = {
  route: 'post/hide',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SAVE_POST = {
  route: 'post/save',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const VIEW_SAVED_POST = {
  route: 'post/view-save',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const JOURNAL_POSTS = {
  route: 'post/view-journal',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEARCH_POSTS = {
  route: 'post/search',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEARCH_JOURNAL = {
  route: 'post/view-journal',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const FILTER_JOURNAL = {
  route: 'post/search-filter',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const FOLLLOW_USERS = {
  route: 'follow',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const NOTIFICATIONS = {
  route: 'notifications',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_CHAT = {
  route: 'delete-chat',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const TOGGLE_NOTIFICATION = {
  route: 'enable-notification',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHAT_ATTACHMENT = {
  route: 'chat-attachment',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_FOLLOW_REQUEST = {
  route: 'update-follow-status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const BECOME_VERIFIED = {
  route: 'become-verified',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHAT_MESSAGES = {
  route: 'chat-messages',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SUBSCRIPTIONS = {
  route: 'subscriptions',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const BUY_SUBSCRIPTION = {
  route: 'buy-subscription',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};



export const callRequest = function (
  url,
  data,
  parameter,
  urlParameter,
  header = {},
  // ApiSauce,
  baseUrl = BASE_URL,
  // url,
  // data,
  // parameter,
  // token,
  // urlParameter,
  // header = {},
  // // ApiSauce,
  // baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some errors, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = store?.getState()?.authReducer?.user?.api_token
      ? store?.getState()?.authReducer?.user?.api_token
      : store?.getState()?.authReducer?.userToken !== null
      ? store?.getState()?.authReducer?.userToken
      : '';
    // console.log('=======================_access_token', _access_token);
    // const _access_token = '';
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: _access_token.includes('Bearer ')
            ? _access_token
            : 'Bearer ' + _access_token,
        },
      };
    }
  }

  const _url =
    parameter &&
    !_.isEmpty(parameter) &&
    urlParameter &&
    !_.isEmpty(urlParameter)
      ? `${url.route}/${urlParameter}?${parameter?.key}=${parameter?.value}`
      : parameter && !_.isEmpty(parameter)
      ? `${url.route}?${parameter?.key}=${parameter?.value}`
      : urlParameter
      ? `${url.route}/${urlParameter}`
      : url.route;
  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

export default {
  SOCIAL_SIGIN,
  LOGIN,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  CHANGE_PASSWORD,
  GET_ALL_CITIES,
  GET_ALL_STATES,
  GET_ALL_FUEL,
  GET_ALL_GENERATOR_TYPE,
  SKIP_ONBOARDING,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  GET_ADDRESSES,
  DELETE_ADDRESS,
  GET_GENERATORS,
  ADD_GENERATOR,
  EDIT_GENERATOR,
  DELETE_GENERATOR,
  GET_MAINTENANCE,
  CREATE_MAINTENANCE,
  SIGNUP,
  RESEND_OTP,
  VERIFY_OTP,
  FORGOT_PASSWORD,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  VIEW_POST,
  POST_DETAIL,
  LIKE_POST,
  COMMENT_POST,
  COMMENT_DETAIL,
  REPORT_POST,
  HIDE_POST,
  SAVE_POST,
  VIEW_SAVED_POST,
  JOURNAL_POSTS,
  SEARCH_POSTS,
  SEARCH_JOURNAL,
  FOLLLOW_USERS,
  NOTIFICATIONS,
  TOGGLE_NOTIFICATION,
  CHAT_ATTACHMENT,
  UPDATE_FOLLOW_REQUEST,
  BECOME_VERIFIED,
  BUY_SUBSCRIPTION,
  CHAT_MESSAGES,
  SUBSCRIPTIONS,
};
