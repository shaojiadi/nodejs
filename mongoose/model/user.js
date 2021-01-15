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
  pic: String
})

var UserModel = mongoose.model("User",UserSchema,"user")

module.exports = UserModel