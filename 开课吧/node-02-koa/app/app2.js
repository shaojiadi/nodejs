const Koa = require('koa');
const static = require('./middlewares/static');
const router = require('./middlewares/router');

const app = new Koa();

//静态资源中间件
app.use(static({
  prefix: '/public'
}));

//动态资源文件
app.use(router())


app.listen(8022)

console.log('Server running at http://127.0.0.1:8022/');