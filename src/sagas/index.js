import {fork} from 'redux-saga/effects';

import appSagas from './appSaga';
import user from './user';

export default function* root() {
  yield fork(appSagas);
  yield fork(user);
}
