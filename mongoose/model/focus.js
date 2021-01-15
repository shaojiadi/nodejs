//db的映射 
var mongoose = require('./db.js');
var FocusSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  pic: String,
  redirect: {
    type: String,    
    set(parmas){      //自定义修饰符，对redirect字段进行处理
      // parmas 可以获取redirect的值  返回的数据就是redirect在数据库实际保存的值
      if(!parmas){
        return ''
      }else{
        if(parmas.indexOf('http://')==-1&&parmas.indexOf('https://')==-1){
          return "http://"+parmas
        }
        return parmas
      }
    }
  },
  status: {
    type: Number,
    default: 1
  }
})
module.exports = mongoose.model("Focus",FocusSchema,"focus")