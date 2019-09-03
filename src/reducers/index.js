import { combineReducers } from 'redux';
import auth from './auth';
import userInfo from './userInfo';
import system from './system';
import store from './store';

export * from './auth';
export * from './userInfo';
export * from './system';
export * from './store';

const rootReducer = combineReducers({
    auth,
    userInfo,
    system,
    store
});

export default rootReducer;