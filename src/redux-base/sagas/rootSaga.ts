import { fork, put, all, take, cancel } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { LOGOUT, showError } from '../actions/commonFlow';
import watchLastPostSagaAction from './postSaga';
import watchLastGetSagaAction from './getSaga';

import watchLastAWSGraphQlSaga from './AWSGraphQl';

import authSaga from './auth/auth';
import deleteAccountSaga from './auth/deleteAccount';
import userUpdateSaga from './auth/userUpdate';

import imagesSaga from './s3Bucket/imagesSaga';
import videosSaga from './s3Bucket/videosSaga';
import confirmPaymentSaga from './payment/confirmPayment';
import deleteChainSaga from './deleteChainSaga';

export default function* rootSaga(): any {
  try {
    while (true) {
      const tasks = yield all([
        fork(watchLastGetSagaAction),
        fork(watchLastPostSagaAction),

        fork(watchLastAWSGraphQlSaga),

        fork(authSaga),
        fork(deleteAccountSaga),
        fork(userUpdateSaga),

        fork(imagesSaga),
        fork(videosSaga),
        fork(confirmPaymentSaga),
        fork(deleteChainSaga),
      ]);

      yield take(LOGOUT);
      yield cancel([...tasks]);
    }
  } catch (error) {
    yield put(showError<AxiosError>(error));
  }
}
