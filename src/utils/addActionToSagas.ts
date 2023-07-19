import { XHRMethod, createActionType } from './createActionType';

export const getActions = [] as string[];
export const postActions = [] as string[];

export const AWSGraphQLActions = [] as string[];

export const addActionToSagas = (actionType: ReturnType<typeof createActionType>) => {
  if (actionType.REQUEST.includes(XHRMethod.Get)) return getActions.push(actionType.REQUEST);
  if (actionType.REQUEST.includes(XHRMethod.Post)) return postActions.push(actionType.REQUEST);
  if (actionType.REQUEST.includes(XHRMethod.GraphQl)) return AWSGraphQLActions.push(actionType.REQUEST);
  return null;
};
