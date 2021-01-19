console.time("user");
var UserModel = require('./model/user.js')
console.timeEnd("user");       //打印数据库连接的时间

//新增
var news = new UserModel({
  name: "小王",
  age: 66,
  pic: "www.xxx.com/x.png",
  sn: 'sn125',
  sex: '女'
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


//调用扩展的静态方法
// UserModel.findBySn('123',function(err,docs){
//   if(err){
//     return console.log(err);
//   }
//   console.log(docs);
// })


//调用扩展的实例方法
news.print();

