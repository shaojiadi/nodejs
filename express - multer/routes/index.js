//首页接口

const express = require("express");
var router = express.Router()
router.get('/',(req,res)=>{
  res.send("首页接口")
})

module.exports = router