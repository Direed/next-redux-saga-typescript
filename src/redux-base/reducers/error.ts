import produce from 'immer';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  SHOW_ERROR,

  RESET_REDUCER,
} from 'redux-base/actions';

import { TError } from 'types';
import { IAppAction } from 'utils';

interface IReducerState {
  error: TError;
}

const INITIAL_STATE: IReducerState = { error: null };

const error = produce(
  (draft: IReducerState, action: IAppAction) => {
    switch (action.type) {
      case SHOW_ERROR:
        draft.error = action.data;
        break;
      case LOCATION_CHANGE:
      case RESET_REDUCER:
        return INITIAL_STATE;
    }
  },
  INITIAL_STATE,
);

export default error;
