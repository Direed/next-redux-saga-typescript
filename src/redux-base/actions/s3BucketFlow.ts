import { RcFile } from 'antd/lib/upload';

import { TImage } from 'types';
import { createActionType } from 'utils';

// ------------------------Action constants---------------
export const IMAGES_FETCH = createActionType('IMAGES_FETCH');
export const IMAGE_ADD_OR_EDIT = createActionType('IMAGE_ADD_OR_EDIT');
export const IMAGE_DELETE = createActionType('IMAGE_DELETE');
export const IMAGE_DELETE_ALBUM = createActionType('IMAGE_DELETE_ALBUM');

export const DELETE_VIDEO = createActionType('DELETE_VIDEO');
export const DELETE_VIDEO_ACTION = 'DELETE_VIDEO_ACTION';

// ------------------------Action creators----------------
export const imagesFetchRequestAction = (albumName: string) => ({
  type: IMAGES_FETCH.REQUEST,
  albumName,
});
export const imagesFetchSuccessAction = (images: TImage[]) => ({
  type: IMAGES_FETCH.SUCCESS,
  data: images,
});

export const imageAddOrEditRequestAction = (albumName: string, file: RcFile, key: string, edit?: boolean) => ({
  type: IMAGE_ADD_OR_EDIT.REQUEST,
  key,
  albumName,
  file,
  edit,
});
export const imageAddOrEditSuccessAction = () => ({ type: IMAGE_ADD_OR_EDIT.SUCCESS });

export const imageDeleteSuccessAction = () => ({ type: IMAGE_DELETE.SUCCESS });
export const imageDeleteRequestAction = (albumName: string, key: string) => ({
  type: IMAGE_DELETE.REQUEST,
  key,
  albumName,
});

export const imageAlbumDeleteRequestAction = (albumName: string) => ({
  type: IMAGE_DELETE_ALBUM.REQUEST,
  albumName,
});
export const imageAlbumDeleteSuccessAction = () => ({ type: IMAGE_DELETE_ALBUM.SUCCESS });

export const videoDeleteRequestAction = () => ({ type: DELETE_VIDEO.REQUEST });
export const videoDeleteSuccessAction = () => ({ type: DELETE_VIDEO.SUCCESS });
export const videoDeleteAction = (key: string) => ({
  type: DELETE_VIDEO_ACTION,
  key,
});
