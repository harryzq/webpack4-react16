export const GET_INIT_INFO_REQUEST = 'HOME/GET_INIT_INFO_REQUEST'
export const GET_INIT_INFO_SUCCESS = 'HOME/GET_INIT_INFO_SUCCESS'
export const GET_INIT_INFO_FAIL = 'HOME/GET_INIT_INFO_FAIL'

export const get_init_info=()=>{
    return {
        types: [GET_INIT_INFO_REQUEST, GET_INIT_INFO_SUCCESS, GET_INIT_INFO_FAIL],
        promise: http => http.get(`/profiles`),
        afterSuccess:()=>{}
    }
}
