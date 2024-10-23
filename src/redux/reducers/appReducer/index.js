import {LOADER, ERRMSG, SEARCHEDREST} from '../../constants';

const INITIAL_STATE = {
  loader: false,
  selectedtLanguage: null,
  errMsg: '',
  searchedRest: [],
  socket: null,
  notification: false,
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADER_START':
      return {
        ...states,
        loader: true,
      };
    case 'LOADER_STOP':
      return {
        ...states,
        loader: false,
      };
    case 'SAVE_SOCKET':
      return {
        ...states,
        socket: action.payload,
      };
    case 'NOTIFICATION_SETTING_TOGGLE':
      return {
        ...states,
        notification: action.payload,
      };
    case 'TOGGLE_CURRENT_SELECTED_LANGUAGE':
      return {
        ...states,
        selectedtLanguage: action.payload,
      };
    case ERRMSG:
      return {
        ...states,
        errMsg: action.payload,
      };
    case SEARCHEDREST:
      return {
        ...states,
        searchedRest: action.payload,
      };

    default:
      return states;
  }
};
