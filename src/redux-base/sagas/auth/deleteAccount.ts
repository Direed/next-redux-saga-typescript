import { put, call, takeEvery, all } from '@redux-saga/core/effects';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { message } from 'antd';

import {
  DELETE_ACCOUNT,
  DELETE_CHAIN_ACTION,

  deleteAccountSuccessAction,
  imageAlbumDeleteRequestAction,

  logoutAction,
  showError,
} from 'redux-base/actions';
import { listToastChains } from 'graphql/queries';

import { TCreatedChain, TUser } from 'types';

import { deleteChain } from '../deleteChainSaga';

function* deleteAccount() {
  try {
    const user: CognitoUser & TUser = yield Auth.currentAuthenticatedUser();

    yield put(imageAlbumDeleteRequestAction(user.username));

    const chainsResult: GraphQLResult<{ listToastChains: { items: TCreatedChain[] } }> =
      yield API.graphql(
        graphqlOperation(listToastChains, { filter: { participantIds: { contains: user?.attributes?.sub } } }),
      );

    const createdChains = chainsResult.data?.listToastChains.items;

    if(createdChains?.length) {
      yield all(createdChains.map(chain =>
        // @ts-ignore
        call(deleteChain, {
          type: DELETE_CHAIN_ACTION,
          chainId: chain?.chainId,
        }),
      ));
    }

    yield user.deleteUser(err => {
      if (err) {
        message.error(err.message);
      }
      else {
        message.success('Account has been removed');
      }
    });

    yield put(deleteAccountSuccessAction());
    yield put(logoutAction());

  } catch (error) {
    yield put(showError(error.message));
  }
}

export default function* deleteAccountSaga() {
  try {
    yield takeEvery(DELETE_ACCOUNT.REQUEST, deleteAccount);
  } catch (error) {
    yield put(showError(error));
  }
}