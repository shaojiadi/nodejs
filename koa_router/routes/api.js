const router = require('koa-router')();

//配置路由
router.get('/',(ctx)=>{
  ctx.body = {"title":"这是一个api"};
})

router.get('/newlist',(ctx)=>{
  ctx.body = {"title":"这是一个新闻接口"}
})

router.get('/focus',(ctx)=>{
  ctx.body = {"title":"这是一个轮播图接口"}
})

module.exports = router.routes();