//导航接口

const express = require("express")
const tools = require("../../module/tools")

var router = express.Router()
router.get('/',(req,res)=>{
  res.send("导航列表")
})

router.get('/add',(req,res)=>{
  res.render('admin/nav/add')      //默认是views下
})

router.get('/edit',(req,res)=>{
  res.send("修改导航")
})

router.post('/doAdd',tools.multer().single("pic"),(req,res)=>{    //pic和表单input的name相同
  //获取表单传递过来的数据
  var body = req.body;
  res.send({
    body: body,
    file: req.file
  })
})

router.get('/doEdit',(req,res)=>{
  res.send("执行修改")
})


module.exports = router