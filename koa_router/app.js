const Koa = require('koa'),
    router = require('koa-router')(), /*引入是实例化路由*/
    admin = require('./routes/admin'),
    api = require('./routes/api'),
    index = require('./routes/index'),
    render = require('koa-art-template'),
    path = require('path')

//实例化
var app = new Koa();

//配置koa-art-template模板引擎
render(app,{
  root: path.join(__dirname,'views'),
  extname: '.html',      //后缀名
  debug: process.env.NODE_ENV!='production'        //是否开启调试
})


//配置路由
router.use('/',index);

//admin 配置子路由  层级路由
router.use('/admin',admin);   //在模块中暴露路由并启动路由

router.use('/api',api);



//启动路由 
app.use(router.routes())  //启动路由
  .use(router.allowedMethods());     //在所有路由中间件最后调用，此时根据ctx.status设置response响应头，建议配置


app.listen(8000,()=>{
  console.log('启动成功');
});