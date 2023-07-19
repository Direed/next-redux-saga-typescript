import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import auth from './auth';
import error from './error';
import createChain from './createChain';
import messages from './messages';
import s3Bucket from './s3Bucket';

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  auth,
  s3Bucket,
  createChain,
  messages,
  error,
});

export default rootReducer;
