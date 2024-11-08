import {take, put, call, fork} from 'redux-saga/effects';

import ActionTypes from '../redux/constants';
import {
  loaderStart,
  loaderStop,
  notificationSettingToggle,
} from '../redux/actions/appAction';
import {
  callRequest,
  COMMENT_DETAIL,
  COMMENT_POST,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  HIDE_POST,
  LIKE_DETAIL,
  LIKE_POST,
  POST_DETAIL,
  REPORT_POST,
  SAVE_POST,
  VIEW_POST,
  VIEW_SAVED_POST,
  JOURNAL_POSTS,
  SEARCH_POSTS,
  SEARCH_JOURNAL,
  FILTER_JOURNAL,
  FOLLLOW_USERS,
  NOTIFICATIONS,
  TOGGLE_NOTIFICATION,
  CHAT_MESSAGES,
  SUBSCRIPTIONS,
  CHAT_ATTACHMENT,
  UPDATE_FOLLOW_REQUEST,
  BECOME_VERIFIED,
  BUY_SUBSCRIPTION,
  DELETE_CHAT,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../utils/Utils';

function* postDream() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.CREATE_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CREATE_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response post dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error create post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* editPost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.EDIT_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        EDIT_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response edit dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error edit post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* deletePost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.DELETE_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response delete dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error delete post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* viewPost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.VIEW_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        VIEW_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response view dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
        console.log('ERROR_VIEW_POSRT: ', response.message)
      }
    } catch (error) {
      console.log('error view post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* postDetail() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.POST_DETAIL.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        POST_DETAIL,
        {},
        '',
        payload,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response post detail', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error post detail =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* likeDetail() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.LIKE_DETAIL.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LIKE_DETAIL,
        {},
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response post detail', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error post detail =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* likePost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.LIKE_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LIKE_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response like dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error like post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* commentPost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.COMMENT_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        COMMENT_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response comment dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error comment post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* commentDetail() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.COMMENT_DETAIL.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        COMMENT_DETAIL,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response comment dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error comment post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* journalPosts() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.VIEW_JOURNAL_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        JOURNAL_POSTS,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response journal dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error journal post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* reportPost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.REPORT_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        REPORT_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response report dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error report post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* hidePost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.HIDE_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        HIDE_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response hide dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error hide post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* savePost() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.SAVE_POST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SAVE_POST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response save dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error save post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* viewSavedPost() {
  while (true) {
    const {responseCallback} = yield take(ActionTypes.VIEW_SAVED_POST.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        VIEW_SAVED_POST,
        {},
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response view save dream', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error view save post =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* searchPosts() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.SEARCH_POSTS.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SEARCH_POSTS,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response search posts', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error search posts =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* searchJournal() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.SEARCH_JOURNAL.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SEARCH_JOURNAL,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response search journal', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error search journal =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* filterJournals() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.FILTER_JOURNAL.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FILTER_JOURNAL,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response search journal with filter', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error search journal with filter =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
      responseCallback([]);
    }
  }
}
function* notifications() {
  while (true) {
    const {responseCallback} = yield take(ActionTypes.NOTIFICATIONS.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        NOTIFICATIONS,
        {},
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response notifications', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error notifications =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* chatMessages() {
  while (true) {
    const {responseCallback} = yield take(ActionTypes.CHAT_MESSAGES.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CHAT_MESSAGES,
        {},
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response messages', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error messages =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* subscriptions() {
  while (true) {
    const {responseCallback} = yield take(ActionTypes.SUBSCRIPTIONS.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SUBSCRIPTIONS,
        {},
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response subscriptions', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error subscriptions =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* buySubscription() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.BUY_SUBSCRIPTION.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        BUY_SUBSCRIPTION,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response buy subscription', response);
        Util.DialogAlert(response.message);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error buy subscription =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* followUsers() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.FOLLLOW_USERS.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FOLLLOW_USERS,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response follow user', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error follow user =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* toggleNotifications() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.TOGGLE_NOTIFICATION.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        TOGGLE_NOTIFICATION,
        payload,
        '',
        null,
        ApiSauce,
      );
      console.log('response toggle notification', response);
      yield put(
        notificationSettingToggle(payload?.notification === 1 ? true : false),
      );
      yield put(loaderStop());
      if (response.status === 1) {
        Util.DialogAlert(response.message);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
        responseCallback({...response, status: 0});
      }
    } catch (error) {
      console.log('error toggle notification =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
      responseCallback({status: 0});
    }
  }
}
function* becomeVerified() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.BECOME_VERIFIED.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        BECOME_VERIFIED,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response become verified =>', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error become verified =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* deleteChat() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.DELETE_CHAT.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_CHAT,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response delete chat', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error delete chat =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* chatAttachment() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.ATTACHMENT.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CHAT_ATTACHMENT,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response chat attachment', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error chat attachment =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* updateRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.UPDATE_FOLLOW_REQUEST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_FOLLOW_REQUEST,
        payload,
        '',
        null,
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response update follow request =>', response);
        responseCallback(response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error update follow request =>', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}




export default function* root() {
  yield fork(postDream);
  yield fork(editPost);
  yield fork(deletePost);
  yield fork(viewPost);
  yield fork(postDetail);
  yield fork(likePost);
  yield fork(commentPost);
  yield fork(commentDetail);
  yield fork(reportPost);
  yield fork(hidePost);
  yield fork(savePost);
  yield fork(viewSavedPost);
  yield fork(likeDetail);
  yield fork(journalPosts);
  yield fork(searchPosts);
  yield fork(searchJournal);
  yield fork(notifications);
  yield fork(chatMessages);
  yield fork(subscriptions);
  yield fork(followUsers);
  yield fork(toggleNotifications);
  yield fork(chatAttachment);
  yield fork(deleteChat);
  yield fork(updateRequest);
  yield fork(becomeVerified);
  yield fork(buySubscription);
  yield fork(filterJournals);
}
