const router = require('koa-router')(),
user = require('./admin/user'),
focus = require('./admin/focus'),
newscate = require('./admin/newscate')

//配置路由admin子路由
router.get('/',(ctx)=>{
  ctx.body = '后台管理系统首页'
})

router.use('/user',user)
router.use('/focus',focus)
router.use('/newscate',newscate)

module.exports = router.routes();