import {GET_INIT_INFO_REQUEST,GET_INIT_INFO_SUCCESS,GET_INIT_INFO_FAIL} from '../actions/home'

const init_info={}

const home=(state=init_info,action)=>{
    switch (action.type) {
        case GET_INIT_INFO_REQUEST:
            return {
                ...state,
                init_info:action.result
            }
        case GET_INIT_INFO_SUCCESS:
            return {
                ...state,
                init_info:action.result
            }
        case GET_INIT_INFO_FAIL:
            return {
                ...state,
                init_info:action.result
            }
        default:
            return state
    }
}
export default home