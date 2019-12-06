import counter from './reducers/counter';
import userInfo from './reducers/userInfo'
import { combineReducers, createStore } from 'redux'
// export default function combineReducers(state = {}, action) {
//     return {
//         counter: counter(state.counter, action)
//     }
// }
const rootReducer = combineReducers({
    counter,
    userInfo
})

export default rootReducer