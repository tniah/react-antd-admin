import globalReducer from '@/stores/global.store';
import { combineReducers } from '@reduxjs/toolkit';
import tagsViewReducer from './tagsView.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  user: userReducer,
  tagsView: tagsViewReducer,
  global: globalReducer,
});

export default rootReducer;