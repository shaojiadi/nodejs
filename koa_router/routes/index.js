const { render } = require('art-template');

const router = require('koa-router')();

//配置路由
router.get('/',async(ctx)=>{
  await ctx.render('default/index')
})

router.get('case',async(ctx)=>{
  ctx.body = '案例'
})

router.get('about',async(ctx)=>{
  await ctx.render('default/about')
})


module.exports = router.routes();