console.time("user");
var UserModel = require('./model/user.js')
console.timeEnd("user");       //打印数据库连接的时间

var news = new UserModel({
  name: "   张三   ",
  age: 20,
  pic: "www.xxx.com/x.png"
})
// news.content = 'content'
news.save((err)=>{
  if(err){
    return console.log(err);
  }
  UserModel.find({},(err,doc)=>{
  if(err){
      return console.log(err);
    }
    console.log(doc);
  })

})