import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import newsReducer from './news/news.reducer';
import weatherReducer from './weather/weather.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

// const userPersistConfig = {
//   key: 'user',
//   storage,
//   whitelist: [
//     'authorization',
//     'userCategory',
//     'userCountry',
//     'userCoords',
//     'userUnits',
//   ],
// };

const rootReducer = combineReducers({
  // user: persistReducer(userPersistConfig, userReducer),
  user: userReducer,
  news: newsReducer,
  weather: weatherReducer,
});

export default persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
