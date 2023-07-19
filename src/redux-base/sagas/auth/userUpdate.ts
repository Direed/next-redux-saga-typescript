import { put, takeLatest, call } from '@redux-saga/core/effects';
import { AuthError } from '@aws-amplify/auth/lib/Errors';
import Auth from '@aws-amplify/auth';
import { RcFile } from 'antd/lib/upload';
import {
  USER_UPDATE,

  userUpdateSuccess,

  showError,
} from 'redux-base/actions';

import { BUCKET_USER_IMAGES } from 'awsConfig';

import { s3BucketImgAddOrEdit } from '../s3Bucket/imagesSaga';

function* userUpdate(action: { type: string; name: string; file: RcFile, edit: boolean }): unknown {
  const { name, file, edit } = action;

  try {
    const user = yield Auth.currentAuthenticatedUser();

    if(name) {
      yield Auth.updateUserAttributes(user, { name });
    }

    if(file) {
      const act = {
        type: action.type,
        albumName: user?.username,
        file,
        key: 'profile-photo',
        edit,
      };

      yield call(s3BucketImgAddOrEdit, act);
      yield Auth.updateUserAttributes(user, { picture: `https://${BUCKET_USER_IMAGES}.s3.amazonaws.com/%252B${user?.username.replace('+', '')}/profile-photo` });
    }

    const newUser = yield Auth.currentAuthenticatedUser();
    yield put(userUpdateSuccess(newUser));

  } catch (error) {
    yield put(showError<AuthError>(error));
  }
}

export default function* userUpdateSaga() {
  try {
    yield takeLatest(USER_UPDATE.REQUEST, userUpdate);
  } catch (error) {
    yield put(showError(error));
  }
}