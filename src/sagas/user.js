import {take, put, call, fork} from 'redux-saga/effects';

import ActionTypes from '../redux/constants';
import {
  loginUser,
  saveTokenForLoginUser,
  saveUserForLoginUser,
  logoutUser,
} from '../redux/actions/authAction';
import {loaderStart, loaderStop} from '../redux/actions/appAction';
import API_URL, {
  LOGIN,
  SOCIAL_SIGIN,
  callRequest,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  CHANGE_PASSWORD,
  DELETE_USER,
  SIGNUP,
  VERIFY_OTP,
  RESEND_PASSWORD,
  FORGOT_PASSWORD,
  RESEND_OTP,
  RESEND_OTP_FORGET_PASSWORD,
  RESET_PASSWORD,
  USER_PROFILE,
  Content_Saga,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../utils/Utils';
import NavService from '../helpers/NavService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function* login() {
  while (true) {
    const {payload} = yield take(ActionTypes.LOGIN_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGIN,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('login response: ', JSON.stringify(response));
      if (response.status === 1) {
        if (
          response.data.is_verified == 1 &&
          response.data.is_profile_complete === 1
        ) {
          yield put(saveTokenForLoginUser(response.token));
          yield put(loginUser(response.data));
          Util.DialogAlert(response.message, 'success');
        } else if (
          response.status === 1 &&
          response.data.is_verified == 1 &&
          response.data.is_profile_complete === 0
        ) {
          console.log({showkkro: response});
          yield put(saveTokenForLoginUser(response.token));
          NavService.navigate('CompleteProfile', {
            full_name: response?.data?.full_name,
          });
          Util.DialogAlert(response.message, 'success');
        } else {
          console.log('elseif', response.message);
          Util.DialogAlert(response.message, 'success');
          NavService.navigate('Otp', {
            screenName: 'verification',
            user_id: response?.data?.user_id,
          });
        }
      } else {
        console.log('else', response.message);

        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorcatch', error.message);

      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* signUp() {
  while (true) {
    const {payload} = yield take(ActionTypes.SIGNUP_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SIGNUP,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('signup response: ', JSON.stringify(response));
      if (response?.status === 1) {
        Util.DialogAlert(response?.message, 'success');
        NavService.navigate('Otp', {
          screenName: 'verification',
          user_id: response?.data?.user_id,
          userName: payload?.full_name,
        });
      } else {
        Util.DialogAlert(response?.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error?.message);
    }
  }
}
function* oTPVerify() {
  while (true) {
    const {payload, screen, userName} = yield take(
      ActionTypes.VERIFY_OTP.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        VERIFY_OTP,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('otp verify response: ', JSON.stringify(response));
      if (response.status === 1) {
        if (screen === 'verification') {
          yield put(saveTokenForLoginUser(response?.token));
          NavService.navigate('CompleteProfile', {full_name: userName});
        } else {
          NavService.navigate('ResetPassword', {
            email: response?.data?.email,
          });
        }
        console.log({backendMsg: response.message});
        Util.DialogAlert(
          'Account validation completed. OTP verified',
          'success',
        );
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* resendOTP() {
  while (true) {
    const {payload} = yield take(ActionTypes.RESEND_OTP.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* resendOTPForget() {
  while (true) {
    const {payload} = yield take(
      ActionTypes.RESEND_OTP_FORGET_PASSWORD.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP_FORGET_PASSWORD,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* resetPassword() {
  while (true) {
    const {payload} = yield take(ActionTypes.RESET_PASSWORD.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.navigate('Login');
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.FORGOT_PASSWORD.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FORGOT_PASSWORD,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      responseCallback(response);
      if (response.status === 1) {
        NavService.navigate('Otp', {
          screenName: 'forgot',
          user_id: response.data?.user_id,
          email: payload?.email,
        });
        console.log(response.message);
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* socialSignin() {
  while (true) {
    const {payload} = yield take(ActionTypes.SOCIAL_SIGNUP_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SOCIAL_SIGIN,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('social response: ', JSON.stringify(response));
      if (
        response.status === 1 &&
        response.data.is_profile_complete === 1 &&
        response.data.is_verified === 1
      ) {
        yield put(saveTokenForLoginUser(response.token));
        yield put(loginUser(response.data));
        Util.DialogAlert(response.message, 'success');
      } else if (
        response.status === 1 &&
        response.data.is_profile_complete === 0
      ) {
        yield put(saveTokenForLoginUser(response.token));
        NavService.navigate('CompleteProfile');
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* changePassword() {
  while (true) {
    const {payload} = yield take(ActionTypes.CHANGE_PASSWORD.REQUEST);

    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* deleteAccount() {
  while (true) {
    const {responseCallback} = yield take(ActionTypes.DELETE_ACCOUNT.REQUEST);

    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_USER,
        {},
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* completeProfile() {
  while (true) {
    const {payload, responseCallback, Is_edit} = yield take(
      ActionTypes.COMPLETE_PROFILE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        COMPLETE_PROFILE,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('complete profile response: ', JSON.stringify(response));
      Is_edit && responseCallback(response);
      if (response.status === 1) {
        yield put(saveUserForLoginUser(response.data));
        Is_edit
          ? Util.DialogAlert('Profile Updated successfully', 'success')
          : Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* updateProfile() {
  while (true) {
    const {payload} = yield take(ActionTypes.UPDATE_PROFILE.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_PROFILE,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('update profile response: ', JSON.stringify(response));
      if (response.status === 1) {
        // console.log('payload', response);
        yield put(loginUser(response.data));
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* userLogout() {
  while (true) {
    const {payload} = yield take(ActionTypes.USER_LOGOUT.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGOUT,
        null,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        if (payload?.is_social == 1) {
          GoogleSignin?.signOut();
        }
        yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* contentURL() {
  while (true) {
    const {payload} = yield take(ActionTypes.Content.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        Content_Saga,
        payload,
        '',
        null,
        ApiSauce,
      );
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* Profile() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.USER_PROFILE.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        USER_PROFILE,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('profile response: ', JSON.stringify(response));
      if (response.status === 1) {
        if (responseCallback) {
          responseCallback(response.data);
        }
      } else {
        responseCallback([]);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

export default function* root() {
  yield fork(login);
  yield fork(socialSignin);
  yield fork(completeProfile);
  yield fork(updateProfile);
  yield fork(userLogout);
  yield fork(changePassword);
  yield fork(deleteAccount);
  yield fork(signUp);
  yield fork(oTPVerify);
  yield fork(forgotPassword);
  yield fork(resendOTP);
  yield fork(resetPassword);
  yield fork(resendOTPForget);
  yield fork(Profile);
  yield fork(contentURL);
}
