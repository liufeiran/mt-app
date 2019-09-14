import Router from 'koa-router'
import axios from './utils/axios.js'
import Cart from '../dbs/models/cart.js'
import md5 from 'crypto-js/md5'
//这里是操作本地数据库，用不到签名

let router = new Router({prefix:'/cart'})//接口前缀

//购物车使用本地数据库
//创建购物车，为了安全用post
router.post('/create',async (ctx)=>{
	if(!ctx.isAuthenticated()){//验证信息未登录拦截
		ctx.body={
			code:-1,
			msg:'please login'
		}
	}else{
		let time = Date();//模型里用String，这里用日期方法
		//数值精度会导致id都是一样的md5里面的换成字符串会好，如果是数值js会有精度丢失
		let cartNo = md5(Math.random() * 1000 + time).toString()//生成一个购物车id，保证不重名，上面已经定义time了，可以直接用
		let {params:{id,detail}} = ctx.request.body  //购物车创建时带上来的id和信息，post获取方式，所以这里用request
		let cart = new Cart({//开始创建购物车了
			id,
			cartNo,
			time,
			user:ctx.session.passport.user,//用这个方式获取到user用户名
			detail
		})
		let result = await cart.save()  //创建完后要存储，入库操作，这是异步操作，要等待这个结果
		//这个结果成功之后
		if(result){
			ctx.body={
				code:0,
				msg:'',
				id:cartNo  //拿购物车的信息，必须要通过cartNo来拿，否则不知道是谁的
			}
		}else{
			ctx.body={
				code:-1,
				msg:'fail'//返回的信息是pm告诉的，不是研发自己定
			}
		}
	}
})

//获取购物车的信息
router.post('/getCart',async ctx => {
	let {id} = ctx.request.body  //拿到购物车的id
	try{
		let result = await Cart.findOne({
			cartNo:id
		})
		ctx.body={
			code:0,
			data:result ? result.detail[0] : {}//这里是新买一个就创建一个购物车，和京东淘宝不一样，淘宝是只有一个购物车，买东西往里面增加
		}
	}catch(e){
		ctx.body={
			code:-1,
			data:{}
		}
	}
})






export default router
