const Koa = require('koa');
const { reject } = require('_any-promise@1.3.0@any-promise');
//初始化一个Koa对象（Application）
const app = new Koa();

// 模拟用户登录数据
// let user = null;
let user = {id:1,username:'zMouse'}


//注册中间件
app.use(async(ctx,next)=>{
 if(!user){
   ctx.body = '没有权限'
 }else {
   await next();
    ctx.body = `<h1>${ctx.body}</h1>`
 }
})
app.use(async(ctx,next)=>{
  //如读取数据库(异步)
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      ctx.body = '66666';
      resolve();
    },1000)
  })
})


//使用app对象创建一个webserver


app.listen(8011)

console.log('Server running at http://127.0.0.1:8011/');

