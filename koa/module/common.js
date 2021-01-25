//原生node.js 在koa中获取表单提交的数据方法
exports.getPostData = function(ctx){
  //获取数据  异步
  return new Promise((resolve,reject)=>{
    try{
      let str = '';
      ctx.req.on('data',(chunk)=>{
        str+=chunk;
      })
      ctx.req.on('end',(chunk)=>{
        resolve(str);
      })
    }catch(err){
      reject(err)
    }
   
  })
}
