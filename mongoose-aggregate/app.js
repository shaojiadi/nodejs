//order表关联order_item
const mongoose = require('mongoose');
var OrderModel = require('./model/order.js');


// OrderModel.find({},(err,doc)=>{
//   if(err){
//     return console.log(err);
//   }
//   console.log(doc);
// })

/*
OrderModel.aggregate([
  {
    $lookup:{
      from:"order_item",       //关联表
      localField:"order_id",       //主表关联字段
      foreignField:"order_id",    //子表关联字段
      as:"items"                     //关联后的数据放在...
    }        
  },
  {
    $match: {"all_price":{$gte:90}}
  } 
],function(err,docs){
  if(err){
    return console.log(err);
  }
  console.log(JSON.stringify(docs));
})
*/


/*查询order_item找出商品名称是酸奶的商品，酸奶这个商品对应的订单号以及订单的总价格*/

//第一种方式
var OrderItemModel = require('./model/order_item.js');
/* 
OrderItemModel.find({"_id":"5febe0f2fa896d6ae5b3b30c"},(err,docs)=>{
  if(err){
    return console.log(err);
  }
  var order_item = JSON.parse(JSON.stringify(docs));
  var order_id = order_item[0].order_id;

  OrderModel.find({"order_id":order_id},(err,order)=>{
    if(err){
      return console.log(err);
    }
    order_item[0].order_info = order[0];
    console.log(order_item);
  })
}) */

//第二种方式
OrderItemModel.aggregate([
  {
    $lookup:{
      from:"order",       //关联表
      localField:"order_id",       //主表关联字段
      foreignField:"order_id",    //子表关联字段
      as:"order_info"                     //关联后的数据放在...
    }        
  },
  {
    $match: {_id: mongoose.Types.ObjectId("5febe0f2fa896d6ae5b3b30c")}   //需要把字符串转换成objectId mongoose获取objectId       http://www.mongoosejs.net/docs/schematypes.html
  } 
],function(err,docs){
  if(err){
    return console.log(err);
  }
  console.log(JSON.stringify(docs));
})