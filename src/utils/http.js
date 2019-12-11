import axios from 'axios'    
import {getCookie} from './index'
const CancelToken = axios.CancelToken 
let sources = {}
// 请求列表
const requestList = []
const instance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000,
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://119.28.12.109:3100/mock/56/api',   //根据自己配置的反向代理去设置不同环境的baeUrl
//   headers: {
//     token: sessionStorage.getItem('token') || ''
//   }
})
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['X-CSRFToken'] =  getCookie('csrftoken')
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


let httpCode = {        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
  //将请求地址及参数作为一个完整的请求
  const request = JSON.stringify(config.url) + JSON.stringify(config.data)
  config.cancelToken = new CancelToken((cancel) => {
    sources[request] = cancel
  })
  //1.判断请求是否已存在请求列表，避免重复请求，将当前请求添加进请求列表数组；
  if(requestList.includes(request)){
    sources[request]('取消重复请求')
  }else{
    requestList.push(request)
    //2.请求开始，改变loading状态供加载动画使用
    // store.dispatch('changeGlobalState', {loading: true})
  }
  return config
}, error=> {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
  if (response.data.status === 'success') {     // 响应结果里的status
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response.data.message)
  }
}, error => {
  if (error.response) {     
        // 根据请求失败的http状态码去给用户相应的提示
    let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
    return Promise.reject(error)
  } else {
    return Promise.reject(new Error('请求超时, 请刷新重试'))
  }
})

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// /* 或者写成下面这样： Promise.resolve() 和 Promise.reject()返回的是promise对象，二者都是语法糖  */
// export const post = (url, data, config = {
//     withCredentials: true,
// }) => {
//   return instance({
//     method: 'post',
//     url,
//     data,
//     ...config
//   }).then(response => {
//     return Promise.resolve(response)
//   }).catch(error => {
//     return Promise.reject(error)
//   })
// }
export default {
  post,
  get
}
