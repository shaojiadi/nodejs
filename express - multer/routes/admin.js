//后台接口

const express = require("express");
var router = express.Router()

//引入外部模块
const user = require('./admin/user')
const nav = require('./admin/nav')
const login = require('./admin/login')


router.get('/',(req,res)=>{
  res.send("后台管理中心")
})
//挂载路由
router.use('/user',user)
router.use('/login',login)
router.use('/nav',nav)

module.exports = router