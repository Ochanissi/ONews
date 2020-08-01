import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import newsReducer from './news/news.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
