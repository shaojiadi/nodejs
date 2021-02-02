const router = require('koa-router')();

//配置路由
router.get('/',(ctx)=>{
  ctx.body = '后台管理系统首页'
})


router.get('/user',(ctx)=>{
  ctx.body = '用户管理'
})

router.get('/focus',(ctx)=>{
  ctx.body = '轮播图管理'
})


router.get('/news',(ctx)=>{
  ctx.body = '新闻管理'
})

module.exports = router.routes();