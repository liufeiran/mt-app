import Router from 'koa-router'
import axios from './utils/axios.js'
import Cart from '../dbs/models/cart.js'
import Order from '../dbs/models/order.js'
import md5 from 'crypto-js/md5'

let router = new Router({prefix:'/order'})//接口前缀

router.post('/createOrder',async (ctx) =>{
	//订单是从购物车创建的，要从购物车拿一些数据
	let {id,price,count} = ctx.request.body;
	let time = Date();
	let orderID = md5(Math.random()*1000+time).toString();
	if(!ctx.isAuthenticated()){//验证信息未登录拦截
		ctx.body={
			code:-1,
			msg:'please login'
		}
	}else{
		//找到对应的购物车
		let findCart = await Cart.findOne({cartNo:id})//查id，如果能查到就往下处理
		let order = new Order({//创建一个订单，按照数据模型，填数据
			id:orderID,
			count,
			total:price*count,
			time,
			user:ctx.session.passport.user,
			name:findCart.detail[0].name,
			imgs:findCart.detail[0].imgs,
			status:0
		})
		try{
			let result = await order.save();
			if(result){//存储成功，删除对应的购物车，因为订单成立了，购物车是临时的
				await findCart.remove()
				ctx.body={
					code:0,
					id:orderID//要把id传过去，这里只是下单成功，还要跳订单页
				}
			}else{
				ctx.body={
					code:-1,
					
				}
			}
		}catch(e){
			ctx.body={
				code:-1
			}
		}
	}
})

//获取订单
router.post('/getOrders',async ctx=>{
	let userid = ctx.session.passport.user._id;//在session里拿到当前登录的用户的_id
	if(!ctx.isAuthenticated()){
		ctx.body={
			code:-1,
			list:[],
			msg:'please login'
		}
	}else{
		try{
			//查询条件是当前用户的订单,根据id对应来查找，否则找到的是所有订单
			let result = await Order.find({user:userid})//查询所有的，如果做分页需要await Order.find().limit(15)
			if(result){
				ctx.body={
					code:0,
					list:result//如果成功把result给list
				}
			}else{
				ctx.body={
					code:-1,
					list:[]
				}
			}
		}catch(e){
			ctx.body={
				code:-1,
				list:[]
			}
		}
	}
})


export default router;






















