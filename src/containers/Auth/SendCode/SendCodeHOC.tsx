import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'index';

import ConnectedSendCodeForm from './SendCodeForm';

export const withSendCodeHOC = <T, >(Component: React.FC<T>) => (props: T) => {
  const isCodeSent = useSelector((state: RootState) => state.auth.isCodeSent);

  if(isCodeSent) {
    return <ConnectedSendCodeForm />;
  }

  return <Component {...props} />;
};