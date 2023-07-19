import { createActionType } from './createActionType';
import { IAppAction } from './createRequestAction';

export type Tmessage = {
  success?: string;
  failure?: string;
  dispatchAfterSuccess?: <T>(data?: T) => IAppAction;
  callAfterSuccess?: <T>(data?: T) => void;
};

interface IMessage {
  type: ReturnType<typeof createActionType>;
  message: <T>(data: T) => Tmessage;
}

export const messageStatuses: IMessage[] = [];

// messages for MessagesContainer component
export const addMessages = (messages: IMessage[]) => messages.forEach((msgObject: IMessage) => {
  messageStatuses.push(msgObject);
});
