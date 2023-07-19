import {
  createRequestAction,
  createGraphQLAction,
  createActionType,
  XHRMethod,

  addMessages,
} from 'utils';
import Stripe from 'stripe';
import * as stripeJs from '@stripe/stripe-js';

import { TNotLoggedInData } from 'types';

// ------------------------Action constants---------------

export const CREATE_CHAIN_GQL = createActionType('CREATE_CHAIN', XHRMethod.GraphQl, true);
export const CREATED_CHAIN_FETCH_GQL = createActionType('CREATED_CHAIN_FETCH', XHRMethod.GraphQl);
export const CREATED_CHAIN_UPDATE_GQL = createActionType('CREATED_CHAIN_UPDATE', XHRMethod.GraphQl);

export const CREATED_CHAINS_FETCH_GQL = createActionType('CREATED_CHAINS_FETCH', XHRMethod.GraphQl);

export const CREATED_CHAIN_VIDEOS_FETCH_GQL = createActionType('CREATED_CHAIN_VIDEOS_FETCH', XHRMethod.GraphQl);
export const CREATED_CHAIN_VIDEO_UPDATE_GQL = createActionType('CREATED_CHAIN_VIDEO_UPDATE', XHRMethod.GraphQl);
export const CREATED_CHAIN_VIDEO_DELETE_GQL = createActionType('CREATED_CHAIN_VIDEO_DELETE', XHRMethod.GraphQl);

export const CREATED_NOTIFIES_FETCH_GQL = createActionType('CREATED_NOTIFIES_FETCH', XHRMethod.GraphQl);
export const CREATED_NOTIFIES_UPDATE_GQL = createActionType('CREATED_NOTIFIES_UPDATE', XHRMethod.GraphQl);

export const STITCH_VIDEOS_POST = createActionType('STITCH_VIDEOS', XHRMethod.Post);

export const STRIPE_PRICES_GET = createActionType('STRIPE_PRICES', XHRMethod.Get);
export const STRIPE_PAY_INTENT_POST = createActionType('STRIPE_PAY_INTENT', XHRMethod.Post);
export const STRIPE_PAY_CONFIRM = createActionType('STRIPE_PAY_CONFIRM');

export const NOT_LOGGED_IN_DATA_RESET = 'NOT_LOGGED_IN_DATA_RESET';
export const NOT_LOGGED_IN_DATA = 'NOT_LOGGED_IN_DATA';

export const DELETE_CHAIN = createActionType('DELETE_CHAIN');
export const DELETE_CHAIN_ACTION = 'DELETE_CHAIN_ACTION';

// ------------------------Action creators----------------

export const createChainGraphAction = createGraphQLAction(CREATE_CHAIN_GQL);
export const createdChainFetchGraphAction = createGraphQLAction(CREATED_CHAIN_FETCH_GQL);
export const createdChainUpdateGraphAction = createGraphQLAction(CREATED_CHAIN_UPDATE_GQL);

export const createdChainsFetchGraphAction = createGraphQLAction(CREATED_CHAINS_FETCH_GQL);

export const createdChainVideosFetchGraphAction = createGraphQLAction(CREATED_CHAIN_VIDEOS_FETCH_GQL);
export const createdChainVideoUpdateGraphAction = createGraphQLAction(CREATED_CHAIN_VIDEO_UPDATE_GQL);
export const createdChainVideoDeleteGraphAction = createGraphQLAction(CREATED_CHAIN_VIDEO_DELETE_GQL);

export const createdNotifiesFetchGraphAction = createGraphQLAction(CREATED_NOTIFIES_FETCH_GQL);
export const createdNotifiesUpdateGraphAction = createGraphQLAction(CREATED_NOTIFIES_UPDATE_GQL);

export const stitchVideosPostRequest = createRequestAction(STITCH_VIDEOS_POST, '/toastVideoStitchVideos-dev');

export const stripePricesGetRequest = createRequestAction(STRIPE_PRICES_GET, '/toastVideoStripePrices-dev');

export const notLoggedInDataReset = () => ({ type: NOT_LOGGED_IN_DATA_RESET });
export const notLoggedInData = (data: TNotLoggedInData) => ({
  type: NOT_LOGGED_IN_DATA,
  data,
});

export const deleteChainAction = (chainId: string) => ({
  type: DELETE_CHAIN_ACTION,
  chainId,
});

export const deleteChainRequestAction = () => ({ type: DELETE_CHAIN.REQUEST });
export const deleteChainSuccessAction = () => ({ type: DELETE_CHAIN.SUCCESS });

export const stripePayIntentPostRequest = (
  name: string,
  email: string,
  chainId: string,
  product: Stripe.Price,
  stripe: stripeJs.Stripe,
  card: stripeJs.StripeCardElement,
) => ({
  type: STRIPE_PAY_INTENT_POST.REQUEST,
  name,
  email,
  chainId,
  card,
  stripe,
  product,
});
export const stripePayIntentPostRSuccess = () => ({ type: STRIPE_PAY_INTENT_POST.SUCCESS });

export const stripePayConfirmRequest = () => ({ type: STRIPE_PAY_CONFIRM.REQUEST });
export const stripePayConfirmSuccess = (paymentIntent: stripeJs.PaymentIntent) => ({
  type: STRIPE_PAY_CONFIRM.SUCCESS,
  data: paymentIntent,
});

addMessages([{
  type: CREATE_CHAIN_GQL,
  message: () => ({
    success: 'Chain has been added',
    failure: 'Chain not added! Try again later',
  }),
}, {
  type: DELETE_CHAIN,
  message: () => ({ success: 'Chain has been removed' }),
}]);