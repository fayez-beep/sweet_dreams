import ActionTypes, {
  USERLOGINDATA,
  USERLOGOUT,
  USERLOGINTOKEN,
  CURRENTLOGINUSERINFO,SIGNUP_USER
} from '../../constants';
import store from '../../index';

function dispatch(action) {
  store.dispatch(action);
}
export function loginUser(payload) {
  return {
    type: USERLOGINDATA,
    payload,
  };
}
export function saveTokenForLoginUser(payload) {
  return {
    type: USERLOGINTOKEN,
    payload,
  };
}
export function signUpUser(payload) {
  return {
    type: ActionTypes.SIGNUP_USER.REQUEST ,
    payload,
  };
}
export function resendOTP(payload,screenName) {
  return {
    type: ActionTypes.RESEND_OTP.REQUEST,
    payload,
    screenName
  };
}
export function resendOTP_forget_password(payload,screenName) {
  return {
    type: ActionTypes.RESEND_OTP_FORGET_PASSWORD.REQUEST,
    payload,
    screenName
  };
}
export function otpVerify(payload,screen,userName) {
  return {
    type: ActionTypes.VERIFY_OTP.REQUEST,
    payload,
    screen,
    userName
  };
}
export function forgotPassword(payload,responseCallback) {
  return {
    type: ActionTypes.FORGOT_PASSWORD.REQUEST,
    payload,
    responseCallback
  };
}
export function resetPassword(payload) {
  return {
    type: ActionTypes.RESET_PASSWORD.REQUEST,
    payload,
  };
}
export function saveUserForLoginUser(payload) {
  return {
    type: CURRENTLOGINUSERINFO,
    payload,
  };
}
export function loginCurrentUser(payload) {
  return {
    type: ActionTypes.LOGIN_USER.REQUEST,
    payload,
  };
}
export function socialSignin(payload) {
  return {
    type: ActionTypes.SOCIAL_SIGNUP_USER.REQUEST,
    payload,
  };
}
export function completeProfile(payload,responseCallback,Is_edit) {
  return {
    type: ActionTypes.COMPLETE_PROFILE.REQUEST,
    payload,
    responseCallback,
    Is_edit
  };
}
export function updateProfile(payload) {
  return {
    type: ActionTypes.UPDATE_PROFILE.REQUEST,
    payload,
  };
}
export function logoutUser() {
  return {
    type: USERLOGOUT,
  };
}

export function logoutCurrentUser(payload) {
  return {
    type: ActionTypes.USER_LOGOUT.REQUEST,
    payload
  };
}

export function logoutUserWithDispatch() {
  dispatch({type: USERLOGOUT});
}

// export function user_Profile(responseCallback) {
//   return {
//     type: ActionTypes.USER_PROFILE.REQUEST,
//     responseCallback,
//   };
// }

// export function Change_Password(payload) {
//   // console.log(payload,'Change_Password');
//   return {
//     type: ActionTypes.CHANGE_PASSWORD.REQUEST,
//     payload,
//   };
// }



export function Content(payload) {
  console.log(payload,'Content');
  return {
    type: ActionTypes.Content.REQUEST,
    payload,
  };
}

