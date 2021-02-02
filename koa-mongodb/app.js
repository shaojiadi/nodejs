var Koa = require('koa'),
    path = require('path'),
    view = require('koa-views'),
    router = require('koa-router')(), /*引入是实例化路由*/
    bodyParser = require('koa-bodyparser'),
    static = require('koa-static'),
    render = require('koa-art-template'),
    session  = require('koa-session'),
    Db = require('./module/db.js')

//实例化
var app = new Koa();


//配置koa-art-template模板引擎
render(app,{
  root: path.join(__dirname,'view'),
  extname: '.html',      //后缀名
  debug: process.env.NODE_ENV!='production'        //是否开启调试
})


//koa-session配置
app.keys = ['some secret hurr'];  //cookie的签名
const CONFIG = {
  key: 'koa.sess', /*默认*/
  maxAge: 86400000,        //cookie的过期时间  需要设置
  overwrite: true, //默认
  httpOnly: true,
  signed: true, /** 签名(默认) */
  rolling: true, /** 每次请求时强行设置cookie，这将重置cookie过期时间，默认为false */
  renew: false, /** (boolean) renew session when session is nearly expired 用户快过期时重新设置*/
};

app.use(session(CONFIG, app));




//http://localhost:3000/css/basic.css 首先去static目录找，如果能找到返回对应文件，找不到next()
//配置静态web服务中间件
app.use(static('static'));     //静态web服务中间件可以配置多个
// app.use(static(__dirname+'/static'));  //同上


//配置post bodyparser的中间件
app.use(bodyParser());


//匹配任何路由(应用级中间件)
app.use(async(ctx,next)=>{
  console.log(new Date());
  ctx.state.userinfo = '张三';        //配置公共的信息，所有的模板都会有这个信息
  await next();    /*当前路由匹配完成之后继续向下匹配*/
})  


//显示学员信息
router.get('/',async(ctx)=>{    
  var result = await Db.find('user',{});
  await ctx.render('index',{
    list: result
  })
})

//增加学员
router.get('/add',async(ctx)=>{
  await ctx.render('add');
})

//执行增加学员的操作
router.post('/doAdd',async(ctx)=>{
  //获取表单提交的数据
  //console.log(ctx.request.body);

  let data = await Db.insert('user',ctx.request.body);
  try {
    if(data.result.ok){
      ctx.redirect('./')
    }
  }catch(err){
    console.log(err);
    return;
    ctx.redirect('/add')
  }
  
})


//编辑学员
router.get('/edit',async(ctx)=>{
  //通过get传过来的id获取用户信息
  let id = ctx.query.id;
  let data = await Db.find('user',{"_id":Db.getObjectId(id)})
 
  await ctx.render('edit',{
    list: data[0]
  });
})

router.post('/doEdit',async(ctx)=>{
  let id = ctx.request.body.id;
  let username = ctx.request.body.username;
  let age = ctx.request.body.age;
  let sex = ctx.request.body.sex;
  let  data = await Db.update('user',{"_id":Db.getObjectId(id)},{
    username,
    age,
    sex
  })
  console.log(data);

  try {
    if(data.result.ok){
      ctx.redirect('./')
    }
  }catch(err){
    console.log(err);
    return;
    ctx.redirect('/add')
  }
  
})


//删除学员
router.get('/delete',async(ctx)=>{
  let id = ctx.query.id;
  let data = await Db.delete('user',{"_id":Db.getObjectId(id)});
  console.log(data);
  try {
    if(data.result.ok){
      ctx.redirect('./')
    }
  }catch(err){
    console.log(err);
    return;
    ctx.redirect('/add')
  }
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