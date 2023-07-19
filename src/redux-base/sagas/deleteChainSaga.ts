import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';

import {
  DELETE_CHAIN_ACTION,
  DELETE_VIDEO_ACTION,

  deleteChainRequestAction,
  deleteChainSuccessAction,

  showError,

} from 'redux-base/actions';
import { listNotifies, queryRecordedVideosByChainId } from 'graphql/queries';
import { deleteNotify, deleteRecordedVideo, deleteToastChain } from 'graphql/mutations';

import { TChainVideo, TNotification } from 'types';

import { s3BucketDeleteVideo } from './s3Bucket/videosSaga';

export function* deleteChain(action: {
  type: string,
  chainId: string,
}) {
  const { chainId } = action;

  try {
    yield put(deleteChainRequestAction());

    yield API.graphql(graphqlOperation(deleteToastChain, { input: { chainId } }));

    const notifiesResult: GraphQLResult<{ listNotifies: { items: TNotification[] } }> =
      yield API.graphql(graphqlOperation(listNotifies, { filter: { chainId: { contains: chainId } } }));

    const chainVideosResult: GraphQLResult<{ queryRecordedVideosByChainId: { items: TChainVideo[] } }> =
      yield API.graphql(graphqlOperation(queryRecordedVideosByChainId, { chainId }));

    const notifies = notifiesResult?.data?.listNotifies.items;
    const chainVideos = chainVideosResult?.data?.queryRecordedVideosByChainId.items;

    if(notifies?.length) {
      yield all(notifies.map(notify => {
        if(notify?.chainId === chainId) {
          // @ts-ignore
          return call(deleteChainNotify, { notifyId: notify.id });
        }
      }));
    }

    if(chainVideos?.length) {
      yield all(chainVideos.map(video =>
        // @ts-ignore
        call(deleteChainVideo, {
          videoId: video?.id,
          videoKey: video?.videoName,
        }),
      ));
    }

    yield put(deleteChainSuccessAction());
  } catch (err) {
    yield put(showError(err.message));
  }
}

function* deleteChainVideo({ videoId, videoKey }: { videoId: string; videoKey: string }) {
  yield API.graphql(graphqlOperation(deleteRecordedVideo, { input: { id: videoId } }));
  yield call(s3BucketDeleteVideo, {
    type: DELETE_VIDEO_ACTION,
    key: videoKey,
  });
}

function* deleteChainNotify({ notifyId }: { notifyId: string }) {
  yield API.graphql(graphqlOperation(deleteNotify, { input: { id: notifyId } }));
}

export default function* deleteChainSaga() {
  try {
    yield takeEvery(DELETE_CHAIN_ACTION, deleteChain);
  } catch (error) {
    yield put(showError(error));
  }
}