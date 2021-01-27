/*
https://github.com/koajs/router/blob/HEAD/API.md
*/
var Koa = require('koa'),
    path = require('path'),
    view = require('koa-views'),
    router = require('koa-router')(), /*引入是实例化路由*/
    common = require('./module/common.js'),
    bodyParser = require('koa-bodyparser'),
    static = require('koa-static'),
    render = require('koa-art-template')

/* var Router = require('koa-router');
var router = new Router(); */

//实例化
var app = new Koa();


//配置模板引擎中间件   第三方中间件
/* app.use(view('view',{
  html: 'ejs'      //如果这样配置，模板的后缀名要是.html
})) */
/* app.use(view('view',{
  extension: 'ejs'      //应用ejs模板引擎,后缀名为ejs
})) */

//配置koa-art-template模板引擎
render(app,{
  root: path.join(__dirname,'view'),
  extname: '.html',      //后缀名
  debug: process.env.NODE_ENV!='production'        //是否开启调试
})


//http://localhost:3000/css/basic.css 首先去static目录找，如果能找到返回对应文件，找不到next()
//配置静态web服务中间件
app.use(static('static'));     //静态web服务中间件可以配置多个
// app.use(static(__dirname+'/static'));  //同上


//配置post bodyparser的中间件
app.use(bodyParser());


//中间件
/* 
koa中间件： 匹配路由之前或者匹配路由完成做的一系列的操作称为中间件 
中间件功能：
  1.执行任何代码
  2.修改请求和响应对象
  3.终结请求-响应循环
  4.调用堆栈中下一个中间件

如果get\post回调函数中，没有next参数，就匹配第一个路由，就不会往下匹配。如果需要往下匹配，需要些next()
*/

//匹配任何路由(应用级中间件)
app.use(async(ctx,next)=>{
  console.log(new Date());
  ctx.state.userinfo = '张三';        //配置公共的信息，所有的模板都会有这个信息
  await next();    /*当前路由匹配完成之后继续向下匹配*/
})  



//路由配置
router.get('/',async(ctx)=>{    //ctx上下文，包含request和response等信息
  //ctx.body = '首页'            //返回数据  相当于原生里面的res.writeHead() res.end()
  let list = {
    name: '张三',
    content: '<h2>666</h2>',
    num: 21,
    data: [1111,2222,3333]
  }
  await ctx.render('index',{
    list: list
  });
})


router.get('/news',async(ctx,next)=>{
  //从ctx中读取get传值
  /*
  query:返回的格式化好的参数   console.log(ctx.query);  //获取的是对象，使用最多
  querystring: 返回的是请求字符串       console.log(ctx.querystring);
  */
  console.log(ctx.url);  //获取url地址             
  //ctx里面的request里面获取get传值
  //  console.log(ctx.request);
  await next();     //没有返回会404报错，添加路由级中间件继续向下匹配
})

router.get('/news',async(ctx)=>{
  //ejs数据
  let list = ['1111','2222','3333'];
  /* let title = 'hello!'
  let content = '<h2>666</h2>'
  let num = 123
  await ctx.render('index',{
    title: title,
    content: content,
    num: num
  }); */
  await ctx.render('news',{
    list: list
  })
})

router.get('/newscontent/:aid/:cid',async(ctx)=>{             //http://localhost:8000/newscontent/132/789
  //获取动态路由的返回值
  console.log(ctx.params); 
  ctx.body = '新闻详情'     
})

router.get('/login',async(ctx)=>{            
  await ctx.render('login')
})

router.post('/doAdd',async(ctx)=>{            
  //原生node.js 在koa中获取表单提交的数据
  /* var data = await common.getPostData(ctx);
  ctx.body = data; */
  ctx.body = ctx.request.body;   //使用bodyParser获取表单提交的数据
})

//错误级中间件
app.use(async(ctx,next)=>{
  console.log('这是一个中间件');
  await next();  
  if(ctx.status==404){
    ctx.status = 404;
    ctx.body = '这是一个404页面'
  } 
})  


//启动路由 
app.use(router.routes())  //启动路由
  .use(router.allowedMethods());     //在所有路由中间件最后调用，此时根据ctx.status设置response响应头，建议配置


app.listen(8000,()=>{
  console.log('启动成功');
});