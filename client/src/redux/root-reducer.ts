import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import newsReducer from './news/news.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
});

export default persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
