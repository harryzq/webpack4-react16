// 使用 Mock
const Mock = require('mockjs')
var data = Mock.mock('/pro','get',{
    'sa':'as'
})
console.log(data)