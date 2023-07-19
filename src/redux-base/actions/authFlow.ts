import { RcFile } from 'antd/lib/upload';

import {
  createRequestAction,
  createActionType,
  XHRMethod,
  addMessages,
} from 'utils';
import { TUser } from 'types';

// ------------------------Action constants---------------
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const SIGN_IN = createActionType('SIGN_IN');
export const SIGN_UP = createActionType('SIGN_UP');
export const VERIFY_CODE = createActionType('VERIFY_CODE');

export const USER_UPDATE = createActionType('USER_UPDATE');

export const SEND_LOGIN_LINK_POST = createActionType('SEND_LOGIN_LINK', XHRMethod.Post);

export const DELETE_ACCOUNT = createActionType('DELETE_ACCOUNT');

// ------------------------Action creators----------------
export const sendLoginLinkPostRequest = createRequestAction(SEND_LOGIN_LINK_POST, '/toastVideoSMSWithLink-dev');

export const signInRequest = (phone: string) => ({
  type: SIGN_IN.REQUEST,
  phone,
});
export const signInSuccess = (user: TUser) => ({
  type: SIGN_IN.SUCCESS,
  data: user,
});

export const userUpdateRequest = (name?: string, file?: RcFile, edit?: boolean) => ({
  type: USER_UPDATE.REQUEST,
  name,
  file,
  edit,
});
export const userUpdateSuccess = (user: TUser) => ({
  type: USER_UPDATE.SUCCESS,
  data: user,
});

export const signUpRequest = (phone: string, name: string) => ({
  type: SIGN_UP.REQUEST,
  phone,
  name,
});
export const signUpSuccess = (user: TUser) => ({
  type: SIGN_UP.SUCCESS,
  data: user,
});

export const verifyCodeRequest = (user: TUser, codeNumber: string) => ({
  type: VERIFY_CODE.REQUEST,
  user,
  codeNumber,
});
export const verifyCodeSuccess = () => ({ type: VERIFY_CODE.SUCCESS });

export const loginSuccess = (user: TUser) => ({
  type: LOGIN_SUCCESS,
  data: user,
});

export const deleteAccountRequestAction = () => ({ type: DELETE_ACCOUNT.REQUEST });
export const deleteAccountSuccessAction = () => ({ type: DELETE_ACCOUNT.SUCCESS });

addMessages([{
  type: USER_UPDATE,
  message: () => ({ success: 'Profile has been updated' }),
}]);