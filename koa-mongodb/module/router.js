const url = require('url');
const fs = require('fs');
const path = require('path');

//扩展res
function changeRes(res){
  res.send = (data)=>{
    res.writeHead(200,{'Content-type':'text/html;charset="utf-8"'});
    res.end(data)
  }
}

//根据后缀名获取文件类型
function getFileMine(extname){
  var data = fs.readFileSync('./data/mine.json');
  let mineObj = JSON.parse(data.toString());
  return mineObj[extname];
}
//静态web服务的方法
function initStatic(req,res,staticPath){
  //1.获取地址
  let pathname = url.parse(req.url).pathname;   //例如：http://127.0.0.1:8081/json/all.json?25555555     会过滤掉?25555555
  pathname= pathname=='/'?'/index.html':pathname;    //默认后缀为index.html
  let exname = path.extname(pathname);     //可以获取后缀名
  //2.通过fs模块读取文件
  if(pathname!='/favicon.ico'){
    try{
  console.log('./'+staticPath+pathname,99999);

      let data = fs.readFileSync('./'+staticPath+pathname);
      if(data){
        let mine = getFileMine(exname);
        res.writeHead(200, {'Content-Type': `${mine};charset="utf-8"`});
        res.end(data);
      }
    }catch(error){

    }
 }
}


let server = ()=>{
  let G = {
    _get:{},
    _post:{},
    staticPath: 'static'   //静态web目录。默认是static
  };


  let app = function(req,res){
    //扩展res的方法
    changeRes(res);
    //配置静态web服务
    initStatic(req,res,G.staticPath);

    let pathname = url.parse(req.url).pathname;
    //获取请求类型
    let method = req.method.toLowerCase();
    if(G['_'+method][pathname]){
      if(method=='get'){
        G._get[pathname](req,res);   //执行方法
      }else{
        //post 获取post数据，把他绑定到req.body
        let postData = '';
        req.on('data',(chunk)=>{
          postData+=chunk;``
        })
        req.on('end',()=>{
          console.log(postData);
          req.body = postData;
          G._post[pathname](req,res);  
        })
      }
    }else {
      res.writeHead(404,{'Content-type':'text/plain;charset="utf-8"'});
      res.end('页面不存在')
    }
  }
  //配置get请求
  app.get = function(str,callback){
    //注册方法
    G._get[str] = callback;
    /*
    G['/login'] = function(req,res){
      res.writeHead(200,{'Content-type':'text/plain;charset="utf-8"'});
      res.end('执行登录操作')
    }
    */
  }
  //配置post请求
  app.post = function(str,callback){
    //注册方法
    G._post[str] = callback;
  }

  //配置静态web服务目录
  app.static = function(staticPath){
    G.staticPath = staticPath;
  }

  return app;

}

module.exports = server();

// //执行方法
// app.get('/login',function(req,res){
//   console.log('执行');
// });


// setTimeout(()=>{
//   app('req','res');
// },1000)