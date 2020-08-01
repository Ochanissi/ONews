import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { rootReducer, AppState } from './root-reducer';

import { AppActions } from './news/news.actions';

const middlewares = [thunk as ThunkMiddleware<AppState, AppActions>];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger as any);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
