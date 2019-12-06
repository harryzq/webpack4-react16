import {createStore,applyMiddleware} from 'redux';
import combineReducers from './reducers.js';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './middleware/promiseMiddleware'

// let store = createStore(combineReducers,applyMiddleware(thunkMiddleware,promiseMiddleware));

// export default store;
const configureStore = (initialState) => {
    const store = createStore(
        combineReducers,
        initialState,
        applyMiddleware(thunkMiddleware,promiseMiddleware));
  
    return store;
  };
  export default configureStore;