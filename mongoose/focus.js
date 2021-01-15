var FocusModel = require('./model/focus.js')

var focus = new FocusModel({
  title: "  国际新闻6666   ",
  redirect: "https://www.baidu.com",
  pic: "http://www.xxx.com/x.png"
})

focus.save((err)=>{
  if(err){
    return console.log(err);
  }
  FocusModel.find({},(err,doc)=>{
  if(err){
      return console.log(err);
    }
    console.log(doc);
  })

})