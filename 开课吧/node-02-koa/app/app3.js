const Koa = require('koa');
const koaStaticCache = require('koa-static-cache')     //处理静态资源
const Router = require('@koa/router'); //处理动态资源
const koaBody = require('koa-body');

let maxUserId = 2;
let users = [
  {id:1,username:'大海'},
  {id:2,username:'森林'},
  {id:3,username:'高山'}
]

const app = new Koa();

//静态资源
app.use(koaStaticCache({    
  prefix: '/static',  //要添加的 url 前缀，默认为''    //http://127.0.0.1:8882/static/1.html
  dir: './public',   //提供服务的目录，默认为process.cwd
  dynamic: true,   //初始化时未缓存的动态加载文件
  gzip: true //压缩
}))


//动态资源
let router = new Router();
router.get('/',async(ctx,next)=>{
  ctx.body = users;     //如果是对象默认会转成json格式
})

router.get('/users', async(ctx,next)=>{    
  let str = users.map(user => {
      return `
          <li>${user.username}</li>
      `
  }).join(''); 
  ctx.body = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
      <ul>
        ${str}
      </ul>
    </body>
    </html>
  `;
})


router.get('/add',async(ctx,next)=>{
  ctx.body = `
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
    <form action="/add" method="post">
      <p>
        用户名：<input type="text" name="username">
      </p>
      <p><button>提交</button></p>
    </form>
  </body>
  </html>
  `
})
//默认情况下，koaBody中间件会解析提交过来的正文数据，并把解析后的数据转成对象存储到ctx.request.body属性中
router.post('/add',koaBody(),async(ctx,next)=>{      //https://www.npmjs.com/package/koa-body
  // console.log(ctx.request.body);
  let {username} = ctx.request.body;
  users.push({
    id: ++maxUserId,
    username
  })   
  ctx.body = '添加成功'
})

app.use(router.routes())      //注册路由


app.listen('8882')
console.log('sever runnint http://127.0.0.1:8882');