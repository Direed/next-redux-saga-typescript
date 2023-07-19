import { RcFile } from 'antd/lib/upload';
import { put, takeEvery } from '@redux-saga/core/effects';
import {
  ListObjectsCommand, DeleteObjectCommand, PutObjectCommand,
  ListObjectsCommandOutput, _Object, DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

import {
  IMAGES_FETCH,
  IMAGE_ADD_OR_EDIT,
  IMAGE_DELETE,
  IMAGE_DELETE_ALBUM,

  imagesFetchSuccessAction,
  imageAddOrEditSuccessAction,
  imageDeleteRequestAction,
  imageDeleteSuccessAction,

  showError,
  imageAlbumDeleteSuccessAction,
} from 'redux-base/actions';

import { TImage } from 'types';
import { s3, BUCKET_USER_IMAGES, BUCKET_REGION } from 'awsConfig';

function* s3BucketImgsFetch(action: { type: string; albumName: string; }) {
  const { albumName } = action;

  try {
    const albumKey = encodeURIComponent(albumName) + '/';
    const data: ListObjectsCommandOutput = yield s3.send(
      new ListObjectsCommand({
        Prefix: albumKey,
        Bucket: BUCKET_USER_IMAGES,
      }),
    );

    const href = 'https://s3.' + BUCKET_REGION + '.amazonaws.com/';
    const bucketUrl = href + BUCKET_USER_IMAGES + '/';

    const photos = data?.Contents?.map((photo: _Object) => {
      const key = photo.Key;
      const photoUrl = bucketUrl + encodeURIComponent(key as string);

      return {
        url: photoUrl,
        name: key,
      };
    });

    yield put(imagesFetchSuccessAction(photos as TImage[]));
  } catch (err) {
    yield put(showError(err.message));
  }
}

export function* s3BucketImgAddOrEdit(action: {
  type: string; albumName: string; file: RcFile; key: string; edit: boolean;
}) {
  const { albumName, file, key, edit } = action;

  try {
    const albumKey = encodeURIComponent(albumName) + '/';
    const k = albumKey + key;

    if(edit) {
      yield put(imageDeleteRequestAction(albumName, key));
    }

    yield s3.send(
      new ListObjectsCommand({
        Prefix: albumKey,
        Bucket: BUCKET_USER_IMAGES,
      }),
    );

    const uploadParams = {
      Bucket: BUCKET_USER_IMAGES,
      Key: k,
      Body: file,
    };

    yield s3.send(new PutObjectCommand(uploadParams));
    yield put(imageAddOrEditSuccessAction());

    if(edit) {
      yield location.reload();
    }

  } catch (err) {
    yield put(showError(err.message));
  }
}

function* s3BucketImgDelete(action: { type: string; key: string; albumName: string; }) {
  const { key, albumName } = action;

  const albumKey = encodeURIComponent(albumName) + '/';

  const k = albumKey + key;

  try {
    const params = {
      Key: k,
      Bucket: BUCKET_USER_IMAGES,
    };
    yield s3.send(new DeleteObjectCommand(params));
    yield put(imageDeleteSuccessAction());

  } catch (err) {
    yield put(showError(err.message));
  }
}

function* s3BucketDeleteAlbum(action: { type: string; albumName: string }) {
  const { albumName } = action;

  const albumKey = encodeURIComponent(albumName) + '/';

  try {
    const params = {
      Bucket: BUCKET_USER_IMAGES,
      Prefix: albumKey,
    };
    const album: ListObjectsCommandOutput = yield s3.send(new ListObjectsCommand(params));

    const objects = album?.Contents?.map((object: _Object) => ({ Key: object.Key }));

    const deleteParams = {
      Bucket: BUCKET_USER_IMAGES,
      Delete: { Objects: objects },
      Quiet: true,
    };
    yield s3.send(new DeleteObjectsCommand(deleteParams));

    yield put(imageAlbumDeleteSuccessAction());

  } catch (err) {
    yield put(showError(err.message));
  }
}

export default function* imagesSaga() {
  try {
    yield takeEvery(IMAGES_FETCH.REQUEST, s3BucketImgsFetch);
    yield takeEvery(IMAGE_ADD_OR_EDIT.REQUEST, s3BucketImgAddOrEdit);
    yield takeEvery(IMAGE_DELETE.REQUEST, s3BucketImgDelete);
    yield takeEvery(IMAGE_DELETE_ALBUM.REQUEST, s3BucketDeleteAlbum);
  } catch (error) {
    yield put(showError(error));
  }
}