//db的映射 
var mongoose = require('./db.js');
var UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true  //定义mongoose模式修饰符  去掉前后空格
  },
  age: Number,
  sex: {
    type: String,
    default: "男"    //指定默认参数
  },
  pic: String,
  sn: {
    type: String,
    index: true                //给sn添加mongoose索引，增加查询速度，但是新增会变慢
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