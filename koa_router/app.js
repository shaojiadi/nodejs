const Koa = require('koa'),
    router = require('koa-router')(), /*引入是实例化路由*/
    admin = require('./routes/admin'),
    api = require('./routes/api')

//实例化
var app = new Koa();


//配置路由
router.get('/',(ctx)=>{
  ctx.body = '这是一个首页'
})

//admin 配置子路由  层级路由
router.use('/admin',admin);   //在模块中暴露路由并启动路由

router.use('/api',api);



//启动路由 
app.use(router.routes())  //启动路由
  .use(router.allowedMethods());     //在所有路由中间件最后调用，此时根据ctx.status设置response响应头，建议配置


app.listen(8000,()=>{
  console.log('启动成功');
});