import { message } from 'antd';

import { TCreatedChain } from 'types';

export const onNativeShare = async (toast: TCreatedChain, recipient?: boolean) => {
  const url = recipient ? `https://www.${toast?.initiatorLink}/recipient` : `https://www.${toast?.initiatorLink}`;

  const shareData = {
    title: `${toast?.recipientName} Toast`,
    text: `Would you like to participate in ${toast?.recipientName}'s video chain we are creating? Here is the invitation link: ${url}`,
    url,
  };

  try {
    await navigator.share(shareData);
  } catch (err) {
    message.error('Invitation sharing cancelled.');
  }
};

export const onCopyLink = (toast: TCreatedChain, containerId: string, recipient?: boolean) => {
  const input = document.createElement('input');
  const linkContainer = document.getElementById(containerId);

  linkContainer?.appendChild(input);
  input.value = recipient ? `https://www.${toast?.initiatorLink}/recipient` : `https://www.${toast?.initiatorLink}`;
  input.select();
  document.execCommand('copy');
  linkContainer?.removeChild(input);

  message.success('Link was copied');
};