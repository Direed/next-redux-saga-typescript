import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import { RootState } from 'index';
import { Tmessage } from 'utils';

export const MessagesContainer = () => {
  const dispatch = useDispatch();
  const successMessage = useSelector((state: RootState) => state.messages.successMessage) as unknown as Tmessage;
  const failedMessage = useSelector((state: RootState) => state.messages.failedMessage) as unknown as Tmessage;

  useEffect(() => {
    const handleDispatchAfter = (request: () => void) => {
      if (Array.isArray(request)) {
        request.forEach(req => { dispatch(req()); });
      } else {
        dispatch(request());
      }
    };

    const handleCallAfter = (func: () => void) => {
      if (Array.isArray(func)) {
        func.forEach(foo => { foo(); });
      } else {
        func();
      }
    };

    if (successMessage?.success) {
      message.success(successMessage.success);
    }

    if (failedMessage?.failure) {
      message.error(failedMessage.failure);
    }

    if (successMessage?.dispatchAfterSuccess) {
      handleDispatchAfter(successMessage.dispatchAfterSuccess);
    }

    if (successMessage?.callAfterSuccess) {
      handleCallAfter(successMessage.callAfterSuccess);
    }
  }, [successMessage, failedMessage, dispatch]);

  return null;
};
