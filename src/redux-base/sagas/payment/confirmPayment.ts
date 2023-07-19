import { call, put, takeLatest } from '@redux-saga/core/effects';
import * as stripeJs from '@stripe/stripe-js';
import { message } from 'antd';
import Stripe from 'stripe';

import {
  STRIPE_PAY_INTENT_POST,

  stripePayIntentPostRSuccess,

  stripePayConfirmRequest,
  stripePayConfirmSuccess,

  showError,
  createdChainUpdateGraphAction,
} from 'redux-base/actions';

import apiClient from 'api/apiClient';
import { updateToastChain } from 'graphql/mutations';

function* confirmPayment(action: {
  type: string;
  product: Stripe.Price,
  stripe: stripeJs.Stripe,
  card: stripeJs.StripeCardElement,
  chainId: string,
  email: string,
  name: string,
}) {
  const { product, stripe, card, chainId, name, email } = action;

  try {
    const clientSecret: { errorMessage: string } & string = yield call(apiClient.post, '/toastVideoStripePayIntent-dev', { product });
    yield put(stripePayIntentPostRSuccess());

    if(clientSecret.errorMessage) {
      message.error(clientSecret.errorMessage);
      yield put(showError(clientSecret.errorMessage));
    } else {
      yield put(stripePayConfirmRequest());
      const { error, paymentIntent }: stripeJs.PaymentIntentResult = yield stripe?.confirmCardPayment(
        clientSecret,
        { payment_method: { card } },
      );

      if (error) {
        message.error(error.message);
        yield put(showError(error.message));
      } else {
        yield call(apiClient.post, '/toastVideoStripeInvoice-dev', {
          name,
          email,
          product,
        });

        yield put(stripePayConfirmSuccess(paymentIntent as stripeJs.PaymentIntent));
        yield put(createdChainUpdateGraphAction({
          schema: updateToastChain,
          variables: {
            input: {
              chainId,
              transactionId: paymentIntent?.id,
            },
          },
        }));
        message.success('Payment successfull!');
      }

    }
  } catch (err) {
    yield put(showError(err.message));
  }
}

export default function* confirmPaymentSaga() {
  try {
    yield takeLatest(STRIPE_PAY_INTENT_POST.REQUEST, confirmPayment);
  } catch (error) {
    yield put(showError(error));
  }
}