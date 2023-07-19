import produce from 'immer';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  IMAGES_FETCH,
  IMAGE_ADD_OR_EDIT,
  IMAGE_DELETE,

  SHOW_ERROR,
} from 'redux-base/actions';

import { TImage } from 'types';
import { IAppAction } from 'utils';

const INITIAL_STATE = {
  isLoading: false,
  images: null,
};

interface IINITIAL_STATE {
  isLoading: boolean;
  images: TImage[] | null;
}

const s3Bucket = produce(
  (draft: IINITIAL_STATE, action: IAppAction) => {
    switch (action.type) {
      case IMAGE_DELETE.REQUEST:
      case IMAGE_ADD_OR_EDIT.REQUEST:
      case IMAGES_FETCH.REQUEST:
        draft.isLoading = true;
        break;
      case IMAGES_FETCH.SUCCESS:
        draft.isLoading = false;
        draft.images = action.data;
        break;
      case IMAGE_DELETE.SUCCESS:
      case IMAGE_ADD_OR_EDIT.SUCCESS:
      case LOCATION_CHANGE:
      case SHOW_ERROR:
        draft.isLoading = false;
    }
  },
  INITIAL_STATE,
);

export default s3Bucket;
