//db数据库

var {MongoClient} = require('mongodb');
var Config = require('./config.js');
this.dbClient
class Db {
  static getInstance(){    //静态方法实现单例
    if(!Db.instance){
      Db.instance = new Db();
    }
    return  Db.instance
  }
  constructor(){
    this.dbClient = '';   //属性  放db对象
    this.connect();  //实例化的时候就连接数据库
  } 
  connect(){   //连接数据库
    let _that = this;
    return new Promise((resolve,reject)=>{
      if(!_that.dbClient){             //解决数据库多次连接
        MongoClient.connect(Config.dbUrl,{ useUnifiedTopology: true },(err,client)=>{
          if(err){
            reject(err);
          }else {
            _that.dbClient = client.db(Config.dbName);
            resolve(_that.dbClient);
          }
        })
      }else {
        resolve(_that.dbClient);
      }
    })
    
  }
  find(collectionName,json){
    return new Promise((resolve,reject)=>{
      this.connect().then((db)=>{
        var result = db.collection(collectionName).find(json);
        result.toArray((err,docs)=>{
          if(err){
            reject(err)
            return
          }else {
            resolve(docs)
          }
        })
      })
    })
  }
  upate(){

  }
  insert(){

  }

}

/* var myDb = Db.getInstance();

setTimeout(()=>{
  console.time('start');
  myDb.find('user',{}).then(function(data){   //异步，没有查询结束就会调用，解决：使用定时器或者async await
    // console.log(data);
    console.timeEnd('start');
  })
},1000)


setTimeout(()=>{
  console.time('start2');
  myDb.find('user',{}).then(function(data){
    // console.log(data);
    console.timeEnd('start2');
  })
},3000)


// var myDb2 = new Db();      //会重新创建实例，重新连接
var myDb2 = Db.getInstance();      //会多次实例化，实例无共享，会多次重新连接

setTimeout(()=>{
  console.time('start3');
  myDb2.find('user',{}).then(function(data){   //异步，没有查询结束就会调用，解决：使用定时器或者async await
    // console.log(data);
    console.timeEnd('start3');
  })
},5000)


setTimeout(()=>{
  console.time('start4');
  myDb2.find('user',{}).then(function(data){
    // console.log(data);
    console.timeEnd('start4');
  })
},7000)
 */

module.exports = Db.getInstance();
