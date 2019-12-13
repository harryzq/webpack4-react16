// 使用 Mock
const Mock = require('mockjs')
Mock.setup({
    timeout: 10, // 设置延迟响应，模拟向后端请求数据
});
Mock.mock('/profiles','get',()=>{
    return{
        "status":"success",
        "msg":"",
        "data":{
            "a":"a"
        }
    }
})