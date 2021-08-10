var http = require('http');
var url = require('url');
var fs = require('fs');
var nunjucks = require('./nunjucks');

/* let users = [
  {id:1,username:'大海'},
  {id:2,username:'森林'},
  {id:3,username:'高山'}
] */

let users = require('./data/users.json')


//路由表
const routesMap = new Map();
routesMap.set('/',async(req,res)=>{
  res.setHeader('Content-Type','text/html;charset=utf-8');
/*   res.end(`
  <ul>
    ${users.map(item=>{
      return `<li>${item.username}</li>`
    }).join('')}
  </ul>
  `); */
  let tpl = fs.readFileSync('./template/index.html').toString();     //如果是文档类型需要 fs.readFileSync(`.${urlObj.pathname}`).toString()
  let content = nunjucks.renderString(tpl,{       //nunjucks模板解析器与ejs相同
    users       
  })
  res.end(content)
})
routesMap.set('/list',async(req,res)=>{
  res.setHeader('Content-Type','text/html;charset=utf-8');
  res.end('列表');
})




http.createServer(async(req, res)=>{
  // res.writeHead(200, {'Content-Type': 'text/html'});   //MIME:用来表示文档、文字或字节流性质和格式的标准       格式：type/subtype type为小类，subtype为大类,常用的有text/html、text/css、image/png
  let urlObj = url.parse(req.url);
  // console.log(urlObj);
  //自定义一套基于url的规则区分当前的静态资源与动态资源
  if(urlObj.pathname.startsWith('/static')){
    //静态资源
    try {
      //获取当前文件后缀
      let lastPointIndexOf = urlObj.pathname.lastIndexOf('.');
      let suffix = urlObj.pathname.substring(lastPointIndexOf);   //如http://127.0.0.1:8081/static/1.html  后缀名.html
      switch(suffix){
        case '.png':
          res.setHeader('Content-Type','image/png');
          break;
        case '.html':
          res.setHeader('Content-Type','text/html;charset=utf-8');
          break;
        case '.css':
          res.setHeader('Content-Type','text/css;charset=utf-8');
          break;
        default: 
          res.setHeader('Content-Type','text/plain');
          break;
      }

      let content = fs.readFileSync(`.${urlObj.pathname}`);    
      res.end(content);
    }catch(e){
      res.statusCode = 404;
      res.setHeader('Content-Type','text/html;charset=utf-8');
      res.end('<h1>页面丢失了</h1>');
    }
  }else {
    //根据当前的pathname指定routesMap中对应的函数    动态资源
    let routeHandler = routesMap.get(urlObj.pathname);
    if(routeHandler){
      await routeHandler(req,res)
    }else {
      //告知客户端你应该重新发送请求，新的请求地址在Location头中
      res.statusCode = 302;
      res.setHeader('Location','/');  //重定向到首页
      res.end();
    }

  }
  res.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');