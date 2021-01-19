//用户接口

const express = require("express");
const tools = require("../../module/tools")
var router = express.Router()

router.get('/',(req,res)=>{
  res.send("用户列表")
})

router.get('/add',(req,res)=>{
  res.render('admin/user/add')   
})

var cpUpload = tools.multer().fields([{name:'pic1',maxCount:1},{name:'pic2',maxCount:1}])

router.post('/doAdd',cpUpload,(req,res)=>{
  res.send({
    body: req.body,
    files: req.files
  })
})


module.exports = router