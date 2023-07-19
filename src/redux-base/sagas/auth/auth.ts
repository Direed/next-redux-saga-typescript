import { call, put, takeLatest } from '@redux-saga/core/effects';
import { AuthError } from '@aws-amplify/auth/lib/Errors';
import Auth from '@aws-amplify/auth';

import {
  LOGOUT,
  SIGN_IN,
  SIGN_UP,
  VERIFY_CODE,

  signInSuccess,
  signUpSuccess,
  loginSuccess,
  verifyCodeSuccess,

  showError,
} from 'redux-base/actions';

import { TUser } from 'types';

function* signIn(action: { type: string; phone: string; }): unknown {
  const { phone } = action;

  try {
    const result: TUser = yield Auth.signIn(phone);
    yield put(signInSuccess(result));

  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      yield call(signUp, action);
    } else {
      yield put(showError<AuthError>(error));
    }
  }
}

function* signUp(action: { type: string; phone: string; name?: string }) {
  const { phone, name } = action;

  try {
    yield Auth.signUp({
      username: phone,
      password: Math.random().toString(10) + 'Abc#',
      attributes: {
        phone_number: phone,
        name,
      },
    });

    const result: TUser = yield Auth.signIn(phone);
    yield put(signUpSuccess(result));

  } catch (error) {
    if(error.code === 'UsernameExistsException') {
      yield call(signIn, action);
    } else {
      yield put(showError<AuthError>(error));
    }
  }
}

function* verifyCode(action: { type: string; user: TUser; codeNumber: string }) {
  const { user, codeNumber } = action;

  try {
    const result: TUser = yield Auth.sendCustomChallengeAnswer(user, codeNumber);

    yield put(verifyCodeSuccess());
    yield put(loginSuccess(result));

  } catch (error) {
    if (error.message === 'Incorrect username or password.') {
      yield put(showError({ message: 'Code is incorrect.' }));
    } else if (error.message === 'Invalid session for the user.') {
      yield put(showError({ message: 'Invalid session for the user. Resend code!' }));
    } else {
      yield put(showError<AuthError>(error));
    }
  }
}

function* logout() {
  try {

    yield Auth.signOut();

  } catch (error) {
    yield put(showError(error));
  }
}

export default function* authSaga() {
  try {
    yield takeLatest(LOGOUT, logout);
    yield takeLatest(SIGN_IN.REQUEST, signIn);
    yield takeLatest(SIGN_UP.REQUEST, signUp);
    yield takeLatest(VERIFY_CODE.REQUEST, verifyCode);
  } catch (error) {
    yield put(showError(error));
  }
}