import { LOCATION_CHANGE } from 'connected-react-router';
import produce from 'immer';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import Stripe from 'stripe';

import {
  CREATE_CHAIN_GQL,
  CREATED_CHAIN_FETCH_GQL,
  CREATED_CHAIN_UPDATE_GQL,
  CREATED_CHAINS_FETCH_GQL,

  CREATED_CHAIN_VIDEOS_FETCH_GQL,
  CREATED_CHAIN_VIDEO_DELETE_GQL,
  CREATED_CHAIN_VIDEO_UPDATE_GQL,

  CREATED_NOTIFIES_FETCH_GQL,
  CREATED_NOTIFIES_UPDATE_GQL,

  STRIPE_PRICES_GET,
  STRIPE_PAY_CONFIRM,
  STRIPE_PAY_INTENT_POST,

  NOT_LOGGED_IN_DATA,
  NOT_LOGGED_IN_DATA_RESET,

  DELETE_CHAIN,

  IMAGES_FETCH,
  IMAGE_ADD_OR_EDIT,
  SHOW_ERROR,
  RESET_REDUCER,
} from 'redux-base/actions';
import { TCreatedChain, TChainVideo, TNotification } from 'types';

import { IAppAction } from 'utils';

const INITIAL_STATE = {
  isLoading: false,
  isChainAdded: false,
  isNotLoggedInParticipant: false,
  isNotLoggedInRecipient: false,
  isChainDeleted: false,
  createdChain: null,
  createdChains: null,
  notAuthChain: null,
  toastInvite: null,
  initiatedVideo: null,
  recipientVideo: null,
  chainVideos: null,
  notifications: null,
  notifyNextToken: '',
  prices: null,
};

interface IINITIAL_STATE {
  isLoading: boolean;
  isChainAdded: boolean;
  isNotLoggedInParticipant: boolean;
  isNotLoggedInRecipient: boolean;
  isChainDeleted: boolean;
  createdChain: TCreatedChain;
  notAuthChain: TCreatedChain;
  createdChains: TCreatedChain[] | null;
  chainVideos: TChainVideo[] | null;
  initiatedVideo: TChainVideo;
  recipientVideo: TChainVideo;
  notifications: TNotification[] | null;
  notifyNextToken: string;
  prices: Stripe.Price[] | null,
}

const createChain = produce(
  (draft: IINITIAL_STATE, action: IAppAction) => {
    switch (action.type) {
      case DELETE_CHAIN.REQUEST:
      case STRIPE_PAY_INTENT_POST.REQUEST:
      case STRIPE_PAY_CONFIRM.REQUEST:
      case STRIPE_PRICES_GET.REQUEST:
      case CREATED_CHAIN_VIDEO_DELETE_GQL.REQUEST:
      case IMAGES_FETCH.REQUEST:
      case IMAGE_ADD_OR_EDIT.REQUEST:
      case CREATED_CHAIN_VIDEO_UPDATE_GQL.REQUEST:
      case CREATED_CHAIN_VIDEOS_FETCH_GQL.REQUEST:
      case CREATED_CHAIN_UPDATE_GQL.REQUEST:
      case CREATED_CHAIN_FETCH_GQL.REQUEST:
      case CREATED_CHAINS_FETCH_GQL.REQUEST:
      case CREATE_CHAIN_GQL.REQUEST:
        draft.isLoading = true;
        break;
      case CREATE_CHAIN_GQL.SUCCESS:
        draft.isLoading = false;
        draft.isChainAdded = true;
        draft.createdChain = action.data.createToastChain;
        break;
      case CREATED_CHAIN_VIDEOS_FETCH_GQL.SUCCESS:
        draft.isLoading = false;
        draft.chainVideos = orderBy(filter(action.data.queryRecordedVideosByChainId.items, video => !video.initiatedVideo && video.type !== 'RECIPIENT'), ['stitchPosition'], ['asc']);
        draft.initiatedVideo = find(action.data.queryRecordedVideosByChainId.items, video => video.initiatedVideo);
        draft.recipientVideo = find(action.data.queryRecordedVideosByChainId.items, video => video.type === 'RECIPIENT');
        break;
      case CREATED_CHAINS_FETCH_GQL.SUCCESS:
        draft.isLoading = false;
        draft.createdChains = orderBy(action.data.listToastChains.items, ['deadline'], ['asc']);
        break;
      case NOT_LOGGED_IN_DATA:
        draft.notAuthChain = action.data.notAuthChain;
        draft.isNotLoggedInParticipant = action.data.isNotLoggedInParticipant;
        draft.isNotLoggedInRecipient = action.data.isNotLoggedInRecipient;
        break;
      case CREATED_CHAIN_FETCH_GQL.SUCCESS:
        draft.isLoading = false;
        draft.createdChain = action.data.getToastChain;
        break;
      case CREATED_CHAIN_UPDATE_GQL.SUCCESS:
        draft.isLoading = false;
        draft.createdChain = action.data.updateToastChain;
        break;
      case CREATED_NOTIFIES_FETCH_GQL.SUCCESS:
        draft.notifications = orderBy([...(draft.notifications || []), ...action.data.listNotifies.items], ['created'], ['desc']);
        draft.notifyNextToken = action.data.listNotifies.nextToken;
        break;
      case CREATED_NOTIFIES_UPDATE_GQL.SUCCESS:
        draft.notifications = draft.notifications?.map(item => {
          if(item?.id === action.data.updateNotify.id) {
            return action.data.updateNotify;
          }

          return item;
        }) || draft.notifications;
        break;
      case CREATED_CHAIN_VIDEO_DELETE_GQL.SUCCESS:
        draft.isLoading = false;
        draft.chainVideos = filter(draft.chainVideos, video => video?.id !== action.data.deleteRecordedVideo.id);
        break;
      case STRIPE_PRICES_GET.SUCCESS:
        draft.isLoading = false;
        draft.prices = action.data;
        break;
      case DELETE_CHAIN.SUCCESS:
        draft.isLoading = false;
        draft.isChainDeleted = true;
        break;
      case STRIPE_PAY_CONFIRM.SUCCESS:
      case STRIPE_PAY_INTENT_POST.SUCCESS:
      case CREATED_CHAIN_VIDEO_UPDATE_GQL.SUCCESS:
      case IMAGES_FETCH.SUCCESS:
      case IMAGE_ADD_OR_EDIT.SUCCESS:
      case CREATE_CHAIN_GQL.FAILURE:
      case SHOW_ERROR:
        draft.isLoading = false;
        break;
      case LOCATION_CHANGE:
        draft.isChainAdded = false;
        draft.isChainDeleted = false;
        break;
      case NOT_LOGGED_IN_DATA_RESET:
        draft.notAuthChain = null;
        draft.isNotLoggedInParticipant = false;
        draft.isNotLoggedInRecipient = false;
        break;
      case RESET_REDUCER:
        draft.createdChain = null;
        draft.chainVideos = null;
        draft.initiatedVideo = null;
        draft.isNotLoggedInParticipant = false;
        draft.isNotLoggedInRecipient = false;
    }
  },
  INITIAL_STATE,
);

export default createChain;
