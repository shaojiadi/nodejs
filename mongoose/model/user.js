//db的映射 
var mongoose = require('./db.js');
var UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,  //定义mongoose模式修饰符  去掉前后空格
    required: true,   //必填
  },
  age: {
    type: Number,
    min: 0,      //必须用在number类型
    max: 150
  },
  sex: {
    type: String,
    default: "男",    //指定默认参数
    enum: ['男','女']   //值必须在枚举数组里    枚举用在string类型里
  },
  pic: String,
  sn: {
    type: String,
    index: true,               //给sn添加mongoose索引，增加查询速度，但是新增会变慢
    maxlength: 10,
    minlength: 5,
    match: /^sn(.*)/i,                //匹配正则（. 匹配除换行外的任意字符）  用在string类型
    validate: function(sn){             //自定义验证器
      return sn.length>5
    }
  }
})

//扩展静态方法
UserSchema.statics.findBySn = function(sn,cb){
  //通过find方法获取sn的数据    this获取当前的model
  this.find({"sn":sn},function(err,docs){
    cb(err,docs)
  })
}


//扩展实例方法 （基本不用）
UserSchema.methods.print = function(){
  console.log(this.name,'实例方法');    //this指向实例
}

var UserModel = mongoose.model("User",UserSchema,"user")

module.exports = UserModel