import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Stripe from 'stripe';
import { Form as AntdForm } from 'antd';
import * as stripeJs from '@stripe/stripe-js';
import { InfoCircleOutlined } from '@ant-design/icons';

import { stripePayIntentPostRequest } from 'redux-base/actions';

import { Form } from 'components/Form';

// import './CheckoutForm.styles.scss';

interface ICheckoutForm {
  chainId: string;
  prices: Stripe.Price[] | null
}

export const CheckoutForm = ({ prices, chainId }: ICheckoutForm) => {
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [card] = AntdForm.useForm();

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: '#7A7A7A',
        fontFamily: 'Roboto, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#d9d9d9' },
      },
      invalid: {
        color: 'rgba(0, 0, 0, 0.85)',
        iconColor: '#ff4d4f',
      },
    },
  };

  const handleChange = async (event: stripeJs.StripeCardElementChangeEvent) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = ({ email, name }: { email: string, name: string }) => {
    if(prices) {
      dispatch(stripePayIntentPostRequest(
        name,
        email,
        chainId,
        prices[0],
        stripe as stripeJs.Stripe,
        elements?.getElement(CardElement) as stripeJs.StripeCardElement),
      );
    }
  };

  const price = (prices && prices[0] && prices[0].unit_amount) || 0;

  return (
    <Form
      form={card}
      handleSubmit={handleSubmit}
      validateMessages={{
        required: '${name} is required.',
        types: { email: '${name} is not valid.' },
      }}

      buttonText={`Pay $${(price / 100)} Remove Toast Video Logo`}
      buttonDisabled={disabled || !!error}

      fields={[{
        type: 'text',
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        rules: [{
          type: 'email',
          required: true,
        }],
        tooltip: {
          title: 'We will send invoice on this email',
          icon: <InfoCircleOutlined />,
          placement: 'bottomLeft',
        },
      }, {
        type: 'text',
        name: 'name',
        label: 'Card Holder Name',
        placeholder: 'Name',
        rules: [{ required: true }],
      }]}
    >
      <AntdForm.Item label='Card Details'>
        <CardElement
          options={cardStyle}
          onChange={handleChange}
        />
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
      </AntdForm.Item>
    </Form>
  );
};
