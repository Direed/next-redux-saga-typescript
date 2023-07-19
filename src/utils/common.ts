import lowerCase from 'lodash/lowerCase';
import replace from 'lodash/replace';
import { TCreatedChain } from 'types';

export const formatPhoneNumber = (prefix: string) => prefix?.replace(/[^0-9+]/g, '');

export const getRandomId = () => Math.random().toString(36).substring(2, 16);

export const getName = (name: string) => replace(lowerCase(name), ' ', '');

export const checkFinalizedChain = (chain: TCreatedChain) => {
  const finalizedWithoutPay = chain?.finalized && !chain?.transactionId;
  const finalizedWithPay = chain?.finalized && chain?.transactionId;

  return {
    finalizedWithoutPay,
    finalizedWithPay,
  };
};