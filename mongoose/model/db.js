const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/sjd',{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{    //useNewUrlParser这个属性会在url里识别验证用户所需的db,新版本一定要指定
  if(err){
    console.log(err);
    return;
  }
  console.log("数据库连接成功");
})

module.exports = mongoose;