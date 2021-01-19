const path = require("path")
var multer  = require('multer')
var sd = require('silly-datetime');
const mkdirp = require('mkdirp')
// var upload = multer({ dest: 'static/upload' })      //上传之前目录必须储存，文件名无法手动指定

let tools = {
  multer(){
    var storage = multer.diskStorage({
      //配置上传目录
      destination: async (req, file, cb)=> {
        //1.获取当前日期 20200703
        let day = sd.format(new Date(),'YYYYMMDD')
        let dir = path.join('static/upload',day)       //static/upload/20200703

        //2.按照日期生成图片存储目录  mkdirp是一个异步方法，需要async改成同步，文件存在才能调用mkdirp
        await mkdirp(dir)

        cb(null, dir)  //上传之前目录必须储存
      },
      //修改上传后的文件名
      filename: function (req, file, cb) {
        console.log(file);
        //1.获取后缀名
        let extname = path.extname(file.originalname);
        cb(null,Date.now()+extname)
      }
    })
    var upload = multer({ storage: storage })
    return upload
  }
}

module.exports = tools;