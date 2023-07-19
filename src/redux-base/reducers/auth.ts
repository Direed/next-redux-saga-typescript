import produce from 'immer';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  SIGN_IN,
  SIGN_UP,
  LOGIN_SUCCESS,
  VERIFY_CODE,
  USER_UPDATE,
  DELETE_ACCOUNT,

  SHOW_ERROR,
  RESET_REDUCER,
} from 'redux-base/actions';
import { IAppAction } from 'utils';
import { TUser } from 'types';

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
  isCodeSent: false,
  user: null,
};

interface IINITIAL_STATE {
  isLoading: boolean,
  isLoggedIn: boolean,
  isCodeSent: boolean,
  user: TUser,
}

const auth = produce(
  (draft: IINITIAL_STATE, action: IAppAction) => {
    switch (action.type) {
      case DELETE_ACCOUNT.REQUEST:
      case USER_UPDATE.REQUEST:
      case VERIFY_CODE.REQUEST:
      case SIGN_UP.REQUEST:
      case SIGN_IN.REQUEST:
        draft.isLoading = true;
        break;
      case SIGN_UP.SUCCESS:
      case SIGN_IN.SUCCESS:
        draft.isLoading = false;
        draft.isCodeSent = true;
        draft.user = action.data;
        break;
      case USER_UPDATE.SUCCESS:
      case VERIFY_CODE.SUCCESS:
      case LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.isLoggedIn = true;
        draft.user = action.data;
        break;
      case DELETE_ACCOUNT.SUCCESS:
      case SHOW_ERROR:
        draft.isLoading = false;
        break;
      case LOCATION_CHANGE:
      case RESET_REDUCER:
        draft.isCodeSent = false;
        draft.isLoading = false;
    }
  },
  INITIAL_STATE,
);

export default auth;
