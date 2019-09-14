import Router from 'koa-router'
import axios from './utils/axios.js'
import Category from '../dbs/models/category.js'//用谁就引谁
import sign from './utils/sign.js'//签名，跑慕课接口时用，收费

let router = new Router({prefix:'/category'})//接口前缀


router.get('/crumbs',async (ctx) => {
	//这个线下数据有问题，查不出数据来localhost:3000/category/crumbs?city=天津
//   let result = await Category.findOne({city: ctx.query.city.replace('市', '') || '北京'})
//   //console.log(ctx.query.city);
//   if (result) {
//     ctx.body = {
//       areas: result.areas,
//       types: result.types
//     }
//   } else {
//     ctx.body = {
//       areas: [],
//       types: []
//     }
//   }
	
	
	//使用慕课线上
	let {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
		params:{
			city:ctx.query.city.replace('市','') || "北京",
			sign
		}
	})
	ctx.body={
		areas: status===200?areas:[],
		types: status===200?types:[]
	}
})




export default router;