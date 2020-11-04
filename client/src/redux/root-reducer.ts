import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import newsReducer from './news/news.reducer';
import weatherReducer from './weather/weather.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authorization'],
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  news: newsReducer,
  weather: weatherReducer,
});

export default persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
