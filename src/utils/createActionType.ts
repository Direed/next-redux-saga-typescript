export enum RequestStatuses {
  Request = 'REQUEST',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}
export enum XHRMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
  GraphQl = 'GQL',
}

export const createActionType = (
  actionName: string,
  method?: XHRMethod,
  addFailureType?: boolean,
) => {
  const actionTypes = {
    REQUEST: `${actionName}_${method ? `${method}_` : ''}${RequestStatuses.Request}`,
    SUCCESS: `${actionName}_${method ? `${method}_` : ''}${RequestStatuses.Success}`,
    ...(addFailureType && { FAILURE: `${actionName}${method ? `${method}_` : ''}${RequestStatuses.Failure}` }),
  };

  return actionTypes;
};
