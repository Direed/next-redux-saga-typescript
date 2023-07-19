import { takeEvery, put } from 'redux-saga/effects';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';

import { showError } from 'redux-base/actions';

import { IGraphQLAction, AWSGraphQLActions } from 'utils';

function* AWSGraphQlSaga(action: IGraphQLAction) {
  const { schema, variables } = action;

  try {
    const { data }: GraphQLResult = yield API.graphql(graphqlOperation(schema, variables));

    yield put(action.successCallback(data));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback(error));
    } else {
      yield put(showError(error));
    }
  }
}

export default function* watchLastAWSGraphQlSaga() {
  try {
    yield takeEvery(AWSGraphQLActions, AWSGraphQlSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
