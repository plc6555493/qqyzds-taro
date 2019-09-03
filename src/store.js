import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reduxReset from 'redux-reset';

import rootReducer from './reducers';

const configure = function (initialState) {
    const composeEnhancers = compose;
    const enHanceCreateStore = composeEnhancers(
        applyMiddleware(
            thunkMiddleware,//Redux 处理异步  允许 dispatch() 函数
        ),
        reduxReset(),  // Will use 'RESET' as default action.type to trigger reset
    )(createStore)
    
    const store = enHanceCreateStore(rootReducer, initialState)
    
    return store
};

export default configure
