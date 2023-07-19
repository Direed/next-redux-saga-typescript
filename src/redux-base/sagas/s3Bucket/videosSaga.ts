import { put, takeEvery } from '@redux-saga/core/effects';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';

import {
  DELETE_VIDEO_ACTION,

  videoDeleteRequestAction,
  videoDeleteSuccessAction,

  showError,
} from 'redux-base/actions';

import { s3, BUCKET_USER_VIDEOS } from 'awsConfig';

export function* s3BucketDeleteVideo(action: { type: string; key: string;}) {
  const { key } = action;

  try {
    yield put(videoDeleteRequestAction());

    const albumKey = encodeURIComponent('user-videos') + '/';

    const k = albumKey + key;

    const params = {
      Delete: { Objects: [{ Key: k + '.jpg' }, { Key: k + '.mp4' }] },
      Bucket: BUCKET_USER_VIDEOS,
      Quiet: true,
    };
    yield s3.send(new DeleteObjectsCommand(params));

    yield put(videoDeleteSuccessAction());

  } catch (err) {
    yield put(showError(err.message));
  }
}

export default function* videosSaga() {
  try {
    yield takeEvery(DELETE_VIDEO_ACTION, s3BucketDeleteVideo);
  } catch (error) {
    yield put(showError(error));
  }
}