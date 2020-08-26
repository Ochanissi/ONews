import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import rootReducer, { AppState } from './root-reducer';
// import rootReducer from './root-reducer';

import { NewsActionTYPES } from './news/news.types';
import { UserActionTYPES } from './user/user.types';

export type AppActions = NewsActionTYPES | UserActionTYPES;

const middlewares = [thunk as ThunkMiddleware<AppState, AppActions>];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger as any);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

// export default store;
