import produce from 'immer';

import { IAppAction, messageStatuses, Tmessage } from 'utils';

const INITIAL_STATE = {
  successMessage: null,
  failedMessage: null,
};

interface IINITIAL_STATE {
  successMessage: Tmessage | unknown;
  failedMessage: Tmessage | unknown;
}

const messages = produce(
  (draft: IINITIAL_STATE, action: IAppAction) => {
    const successMessageObject = messageStatuses.find(msg => msg.type.SUCCESS === action.type);
    const failedMessageObject = messageStatuses.find(msg => msg.type.FAILURE === action.type);

    switch (action.type) {
      default:
        draft.successMessage = successMessageObject?.message(action.data);
        draft.failedMessage = failedMessageObject?.message(action.data);
        break;
    }
  },
  INITIAL_STATE,
);

export default messages;