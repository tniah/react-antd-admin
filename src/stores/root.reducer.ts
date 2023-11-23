import globalReducer from '@/stores/global.store';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user.store';

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});

export default rootReducer;