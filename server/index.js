//const Koa = require('koa')    装了babel之后就可以把require改成import的形式引入
import Koa from 'koa'
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');

import mongoose from 'mongoose'//☆
import bodyParser from 'koa-bodyparser'//☆根post请求相关的包
import session from 'koa-generic-session'//☆登录注册用到了session，根cookie相关的操作
import Redis from 'koa-redis'//☆
import json from 'koa-json'//☆处理服务端向客户端发response，处理json美观格式化
import dbConfig from './dbs/config.js'//☆导入数据库相关的配置
import passport from './interface/utils/passport.js'//☆
import users from './interface/users.js'//☆
import geo from './interface/geo.js'//☆
import search from './interface/search.js'//☆
import category from './interface/category.js'//☆
import cart from './interface/cart.js'//☆
import order from './interface/order.js'//☆
//接口必须引入和使用才能生效


const app = new Koa();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

//☆session先关的处理
app.keys=['mt','keyskeys'];
app.proxy=true;
app.use(session({
	key:'mt',
	prefix:'mt:uid',
	store:new Redis()//☆session是借助Redis去处理的，Redis启动
}));
app.use(bodyParser({
	extendTypes:['json','form','text']
}));
app.use(json());

//☆连数据库
mongoose.connect(dbConfig.dbs,{
	useNewUrlParser:true
})

//☆passport初始化，session和passport相关的配置要做好
app.use(passport.initialize());
app.use(passport.session());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  
  //☆只能在这里引入路由，添加路由表
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(category.routes()).use(category.allowedMethods())
  app.use(cart.routes()).use(cart.allowedMethods())
  app.use(order.routes()).use(cart.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
