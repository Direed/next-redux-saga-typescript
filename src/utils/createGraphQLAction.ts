import { addActionToSagas, createActionType, IAppAction } from 'utils';

export interface IGraphQLAction {
  type: string | undefined;
  schema: unknown;
  variables?: Record<string, unknown>;
  successCallback: <T>(response: T) => IAppAction<T>;
  failureCallback?: <T>(response: T) => IAppAction<T>;
}

export const createGraphQLAction = (
  actionType: ReturnType<typeof createActionType>,
) => (
  payloadObj: {
    schema: unknown;
    variables?: Record<string, unknown>;
  },
): IGraphQLAction => {

  const { schema, variables } = payloadObj;

  addActionToSagas(actionType);

  const successCallback = <T>(response: T): IAppAction<T> => ({
    type: actionType.SUCCESS,
    data: response,
  });
  const failureCallback = <T>(response: T): IAppAction<T> => ({
    type: actionType.FAILURE,
    data: response,
  });

  const action: IGraphQLAction = {
    type: actionType.REQUEST,
    schema,
    variables,
    successCallback,
    ...(actionType.FAILURE && { failureCallback }),
  };

  return action;
};