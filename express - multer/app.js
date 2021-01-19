const express = require('express')
var bodyParser = require('body-parser')       //解析post数据
const app = express()    //实例化，new可省略

//引入外部模块
const api = require('./routes/api.js')
const index = require('./routes/index.js')
const admin = require('./routes/admin.js')



//配置模板引擎，express默认集成ejs
app.set("view engine","ejs")      //默认在views目录下

//将ejs模板后缀名换称html
const ejs = require('ejs')
app.engine('html',ejs.__express);
app.set("view engine","html")
//配置第三方中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//挂载外部路由模块
app.use('/admin',admin)
app.use('/',index)
app.use('/api',api)


//配置静态web目录
app.use(express.static("static"))
//配置虚拟目录
//app.use('/static',express.static('public'))   实际配置的静态目录是public

const port = 8080

app.get('/', (req, res) => {
  res.send("首页")
})


app.listen(port, () => console.log(`Example app listening on port port!`))
