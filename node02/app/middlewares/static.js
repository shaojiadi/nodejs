const url = require('url');
const fs = require('fs');
module.exports = function(options){
  let opts = Object.assign({},{
    prefix: '/static',
    dir: './public'
  },options)
  return async function(ctx,next){
    // console.log(ctx.request.url);
    // console.log(ctx.url);    //request别名,源码在koa/lib/context.js下，access和getter代表属性，method代表方法，挂载到proto上，即为ctx
    const urlObj = url.parse(ctx.url);
    if(urlObj.pathname.startsWith(opts.prefix)){
        //静态资源
        try {
          //获取当前文件后缀
          let lastPointIndexOf = urlObj.pathname.lastIndexOf('.');
          let suffix = urlObj.pathname.substring(lastPointIndexOf);   //如http://127.0.0.1:8081/static/1.html  后缀名.html
          switch(suffix){
            case '.png':
              // res.setHeader('Content-Type','image/png');  原生写法
              ctx.set('Content-Type','image/png')    //koa api  在koa/lib/response.js下的set方法459行
              break;
            case '.html':
              ctx.set('Content-Type','text/html;charset=utf-8')
              break;
            case '.css':
              ctx.set('Content-Type','text/css;charset=utf-8')
              break;
            default: 
              ctx.set('Content-Type','text/plain')
              break;
          }
    
          let content = fs.readFileSync(`.${urlObj.pathname}`);    
          // res.end(content);
          ctx.body = content;
        }catch(e){
          // res.statusCode = 404;
          ctx.status = 404;
          ctx.set('Content-Type','text/html;charset=utf-8')
          // res.end('<h1>页面丢失了</h1>');
          ctx.body = '<h1>页面丢失了</h1>';
        }
    }else{
      await next()
    }
  }
}