import {
  CURRENTUSERPROFILE,
  ISUSERLOGIN,
  CURRENTLOGINUSERINFO,
  USERLOGINDATA,
  USERLOGINTOKEN,
  USERLOGOUT,
} from '../../constants';

const INITIAL_STATE = {
  isUserLogin: false,
  user: null,
  userToken: null,
  currentUserProfile: {},
};

export default (states = INITIAL_STATE, action) => {
 
  switch (action.type) {
    case CURRENTUSERPROFILE:
      return {
        ...states,
        currentUserProfile: action.payload,
      };
    case ISUSERLOGIN:
      return {
        ...states,
        user: action.payload,
        isUserLogin:true
      };
    case CURRENTLOGINUSERINFO:
      return {
        ...states,
        user: action.payload,
      };
      case USERLOGINDATA:
    //  console.log(action,'/reducer=====');
      return {
        ...states,
        user: action.payload,
        isUserLogin: true,
      };
    case USERLOGINTOKEN:
   
      return {
        ...states,
        userToken: action.payload,
      };
    case USERLOGOUT:
      return {
        ...states,
        user: null,
        userToken: null,
        isUserLogin: false,
        currentUserProfile: {},
      };
    default:
      return states;
  }
};
