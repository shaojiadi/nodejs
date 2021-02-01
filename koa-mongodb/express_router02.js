const http = require('http');
const routes = require('./module/router');
const querystring = require('querystring');
const ejs = require('ejs');
const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = 'sjd';
// const client = new MongoClient(url,{ useUnifiedTopology: true }); 

//注册web服务
http.createServer(routes).listen(8081);

routes.static('public')    //修改默认静态目录

//配置路由
routes.get('/login',function(req,res){
  ejs.renderFile('./views/form.ejs',{},(error,data)=>{
    res.send(data)
  })
});

routes.post('/doLogin',function(req,res){
  console.log(req.body);
  res.send(req.body)
});



routes.get('/',function(req,res){
 MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{      //每次请求，重新创建一个连接
    if(err){
      console.log(err);
      return;
    }
    let db = client.db(dbName);
    db.collection("user").find({}).toArray((err,data)=>{
      console.log(data);
      client.close();
      ejs.renderFile("./views/index.ejs",{
        list:data
      },(err,data)=>{
        res.send(data)
      })
    })
 })
});

routes.get('/register',function(req,res){
  ejs.renderFile('./views/register.ejs',{},(error,data)=>{
    res.send(data)
  })
});

routes.post('/doRegister',function(req,res){
  let body = querystring.parse(req.body);    //将name=sjd&age=12转换成{ name: 'sjd', age: '12' }

  MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{                     
    if(err){
      console.log(err);
      return;
    }
    let db = client.db(dbName);
    db.collection("user").insertOne(body,(err,result)=>{  
      if(err){
        console.log(err);
        return;
      }
      console.log("增加数据成功 ");
      console.log(result);
      client.close();
    })
  })  
});

