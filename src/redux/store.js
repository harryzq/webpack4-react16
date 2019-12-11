import {createStore,applyMiddleware,compose} from 'redux';
import combineReducers from './reducers.js';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './middleware/promiseMiddleware'

// let store = createStore(combineReducers,applyMiddleware(thunkMiddleware,promiseMiddleware));

// export default store;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
    const store = createStore(
        combineReducers,
        initialState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware,promiseMiddleware)
        )
        );
    return store;
  };
  export default configureStore;