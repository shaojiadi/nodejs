const Koa = require('koa');
const static = require('./middlewares/static');
const router = require('./middlewares/router');

const app = new Koa();

//静态资源中间件
app.use(static);

//动态资源文件
// app.use(router)


app.listen(8022)