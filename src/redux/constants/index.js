export const USERLOGINTOKEN = 'USERLOGINTOKEN';
export const USERLOGINDATA = 'USERLOGINDATA';
export const USERLOGOUT = 'USERLOGOUT';
export const CURRENTLOGINUSERINFO = 'CURRENTLOGINUSERINFO';
export const ISUSERLOGIN = 'ISUSERLOGIN';
export const LOADER = 'LOADER';
export const CURRENTUSERPROFILE = 'CURRENTUSERPROFILE';
export const ERRMSG = 'ERRMSG';
export const SEARCHEDREST = 'SEARCHEDREST';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {
    REQUEST: undefined,
    SUCCESS: undefined,
    CANCEL: undefined,
    FAILURE: undefined,
  };
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const SHOW_LOADING = 'SHOW_LOADING';
export const LOADING_STATE = 'APP_INFO_SHOW_LOADING';
export const PRIVACY_POLICY = 'PRIVACY_POLICY';
export const CLEAR_USER_TEMP_DATA = 'CLEAR_USER_TEMP_DATA';
export const APP_USAGE_POLICIES = createRequestTypes('APP_USAGE_POLICIES');

// USER ACTIONS
export const SIGNUP_USER = createRequestTypes('SIGNUP_USER');
export const VERIFY_OTP = createRequestTypes('VERIFY_OTP');
export const COMPLETE_PROFILE = createRequestTypes('COMPLETE_PROFILE');
export const RESEND_OTP = createRequestTypes('RESEND_OTP');
export const RESEND_OTP_FORGET_PASSWORD = createRequestTypes('RESEND_OTP_FORGET_PASSWORD');
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const SOCIAL_SIGNUP_USER = createRequestTypes('SOCIAL_SIGNUP_USER');
export const LOGIN_USER = createRequestTypes('LOGIN_USER');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');


export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
export const USER_LOGOUT = createRequestTypes('USER_LOGOUT');
export const DELETE_USER = createRequestTypes('DELETE_USER');
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
// App Action
export const  USER_PROFILE = createRequestTypes('USER_PROFILE');


export const Content = createRequestTypes('Content');



export const GET_ALL_CITIES = createRequestTypes('GET_ALL_CITIES');
export const GET_ALL_STATES = createRequestTypes('GET_ALL_STATES');
export const GET_ALL_FUEL = createRequestTypes('GET_ALL_FUEL');
export const GET_ALL_GENERATOR_TYPE = createRequestTypes(
  'GET_ALL_GENERATOR_TYPE',
);
export const SKIP_ONBOARDING = createRequestTypes('SKIP_ONBOARDING');
export const ADD_ADDRESS = createRequestTypes('ADD_ADDRESS');
export const GET_ADDRESSES = createRequestTypes('GET_ADDRESSES');
export const UPDATE_ADDRESS = createRequestTypes('UPDATE_ADDRESS');
export const DELETE_ADDRESS = createRequestTypes('DELETE_ADDRESS');
export const ADD_GENERATOR = createRequestTypes('ADD_GENERATOR');
export const EDIT_GENERATOR = createRequestTypes('EDIT_GENERATOR');
export const DELETE_GENERATOR = createRequestTypes('DELETE_GENERATOR');
export const GET_GENERATOR = createRequestTypes('GET_GENERATOR');
export const GET_ALL_MAINTENANCE = createRequestTypes('GET_ALL_MAINTENANCE');
export const CREATE_POST = createRequestTypes('CREATE_POST');
export const EDIT_POST = createRequestTypes('EDIT_POST');
export const DELETE_POST = createRequestTypes('DELETE_POST');
export const VIEW_POST = createRequestTypes('VIEW_POST');
export const POST_DETAIL = createRequestTypes('POST_DETAIL');
export const LIKE_POST = createRequestTypes('LIKE_POST');
export const COMMENT_POST = createRequestTypes('COMMENT_POST');
export const COMMENT_DETAIL = createRequestTypes('COMMENT_DETAIL');
export const LIKE_DETAIL = createRequestTypes('LIKE_DETAIL');
export const REPORT_POST = createRequestTypes('REPORT_POST');
export const HIDE_POST = createRequestTypes('HIDE_POST');
export const SAVE_POST = createRequestTypes('SAVE_POST');
export const VIEW_SAVED_POST = createRequestTypes('VIEW_SAVED_POST');
export const VIEW_JOURNAL_POST = createRequestTypes('VIEW_JOURNAL_POST');
export const SEARCH_POSTS = createRequestTypes('SEARCH_POSTS');
export const SEARCH_JOURNAL = createRequestTypes('SEARCH_JOURNAL');
export const FILTER_JOURNAL = createRequestTypes('FILTER_JOURNAL');
export const FOLLLOW_USERS = createRequestTypes('FOLLLOW_USERS');
export const NOTIFICATIONS = createRequestTypes('NOTIFICATIONS');
export const TOGGLE_NOTIFICATION = createRequestTypes('TOGGLE_NOTIFICATION');
export const DELETE_ACCOUNT = createRequestTypes('DELETE_ACCOUNT');
export const CHAT_MESSAGES = createRequestTypes('CHAT_MESSAGES');
export const SUBSCRIPTIONS = createRequestTypes('SUBSCRIPTIONS');
export const BUY_SUBSCRIPTION = createRequestTypes('BUY_SUBSCRIPTION');
export const ATTACHMENT = createRequestTypes('ATTACHMENT');
export const BECOME_VERIFIED = createRequestTypes('BECOME_VERIFIED');
export const UPDATE_FOLLOW_REQUEST = createRequestTypes('UPDATE_FOLLOW_REQUEST');
export const DELETE_CHAT = createRequestTypes('DELETE_CHAT');
export const CREATE_MAINTENANCE_REQUEST = createRequestTypes(
  'CREATE_MAINTENANCE_REQUEST',
);
export default {
  LOADING_STATE,
  SOCIAL_SIGNUP_USER,
  LOGIN_USER,
  UPDATE_FOLLOW_REQUEST,
  ATTACHMENT,
  COMPLETE_PROFILE,
  BECOME_VERIFIED,
  DELETE_CHAT,
  UPDATE_PROFILE,
  USER_LOGOUT,
  CHANGE_PASSWORD,
  DELETE_USER,
  GET_ALL_CITIES,
  BUY_SUBSCRIPTION,
  GET_ALL_STATES,
  GET_ALL_FUEL,
  GET_ALL_GENERATOR_TYPE,
  SKIP_ONBOARDING,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  GET_ADDRESSES,
  DELETE_ADDRESS,
  ADD_GENERATOR,
  EDIT_GENERATOR,
  DELETE_GENERATOR,
  LIKE_DETAIL,
  GET_GENERATOR,
  GET_ALL_MAINTENANCE,
  CREATE_MAINTENANCE_REQUEST,
  SIGNUP_USER,
  VERIFY_OTP,
  RESEND_OTP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESEND_OTP_FORGET_PASSWORD,
  USER_PROFILE,
  Content,
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
  VIEW_JOURNAL_POST,
  SEARCH_POSTS,
  SEARCH_JOURNAL,
  FILTER_JOURNAL,
  FOLLLOW_USERS,
  NOTIFICATIONS,
  TOGGLE_NOTIFICATION,
  DELETE_ACCOUNT,
  CHAT_MESSAGES,
  SUBSCRIPTIONS,
};
