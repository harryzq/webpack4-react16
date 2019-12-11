import http from '../../utils/http'
import Loading from '../../component/Loading'
export default  store => next => action => {
    const {dispatch, getState} = store;
    /*如果dispatch来的是一个function，此处不做处理，直接进入下一级*/
    if (typeof action === 'function') {
        action(dispatch, getState);
        return;
    }
    /*解析action*/
    const {
        promise,
        types,
        afterSuccess,
        ...rest
    } = action;

    /*没有promise，证明不是想要发送ajax请求的，就直接进入下一步啦！*/
    if (!action.promise) {
        return next(action);
    }
    Loading.open();
    /*解析types*/
    const [REQUEST,
        SUCCESS,
        FAILURE] = types;

    /*开始请求的时候，发一个action*/
    next({
        ...rest,
        type: REQUEST
    });
    /*定义请求成功时的方法*/
    const onFulfilled = result => {
        Loading.close();
        next({
            ...rest,
            result,
            type: SUCCESS
        });
        if (afterSuccess) {
            afterSuccess(dispatch, getState, result);
        }
        // console.log('success')
    };
    /*定义请求失败时的方法*/
    const onRejected = error => {
        Loading.close();
        console.error(error)
        next({
            ...rest,
            error,
            type: FAILURE
        });
        // Loading.close();
    };
    return promise(http).then(onFulfilled, onRejected).catch(error => {
        console.error('HTTP MIDDLEWARE ERROR:', error);
        Loading.close();
        onRejected(error)
    })
}