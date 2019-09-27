import Router from 'koa-router'
import axios from './utils/axios.js'
import Poi from '../dbs/models/poi.js'
import sign from './utils/sign.js'//签名，跑慕课接口时用，收费

let router = new Router({prefix:'/search'})//接口前缀


//根据输入查询前top10的接口
router.get('/top',async (ctx)=>{
//	try {
//		let top = await Poi.find({
//			'name': new RegExp(ctx.query.input),
//			city: ctx.query.city
//		})
//		ctx.body={
//			code:0,
//			top:top.map(item => {//map遍历数组每一项，可以修改值
//				return {
//					name:item.name,
//					type:item.type
//				}
//			}),
//			type:top.length ? top[0].type : ''
//		}
//	}catch(e){
//		ctx.body={
//			code:-1,
//			top:[]
//		}
//	}
	//慕课线上
	let {status,data:{top}} = await axios.get(`http://cp-tools.cn/search/top`,{
		params:{
			input:ctx.query.input,//搜索框输入的关键词
			city:ctx.query.city,//所在的城市
			sign
		}
	})
	ctx.body={
		top:status === 200 ? top : []
	}
})

//热门搜索
router.get('/hotPlace',async (ctx)=>{
//	let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
//	try{
//		let result = await Poi.find({
//			city,
//			type:ctx.query.type || '景点'
//		}).limit(10)
//		
//		ctx.body={
//			code:0,
//			result:result.map(item =>{
//				return {
//					name:item.name,
//					type:item.type
//				}
//			})
//		}
//	}catch(e){
//		ctx.body={
//			code:-1,
//			result:[]
//		}
//	}
	
	//慕课线上
	let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
	let {status,data:{result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`,{
		params:{
			sign,
			city:city
		}
	})
	ctx.body={
		result:status === 200 ? result : []
	}
})

//根据任何关键词查出相关的列表，首页产品
router.get('/resultsByKeywords',async (ctx)=>{
	//有复杂逻辑所以只能用慕课线上服务
	const {city,keyword} = ctx.query;
	let {status,data:{count,pois}} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`,{
		params:{
			city,
			keyword,
			sign
		}
	})
	ctx.body={//这里响应的是count和pois两个字段和pages>products.vue里的对应
		count:status === 200 ? count : 0,
		pois:status === 200 ? pois : []
	}
})

//查询列表，点进产品列表页显示的所有产品，从线上拿数据
router.get('/products',async (ctx)=>{
	let keyword = ctx.query.keyword || '旅游';
	let city = ctx.query.city || '北京';
	let {status,data:{product,more}} = await axios.get('http://cp-tools.cn/search/products',{
		params:{
			keyword,
			city,
			sign
		}
	})
	if(status===200){
		ctx.body={
			product,
			more:ctx.isAuthenticated() ? more : [],  //isAuthenticated方法用来判断当前的用户是否登录状态
			login:ctx.isAuthenticated()
		}
	}else{//请求接口不成功也要给响应，否则一直等待连接
		ctx.body={
			product:{},
			more:ctx.isAuthenticated() ? more : [],  
			login:ctx.isAuthenticated()
		}
	}
})

//根据产品id，查询产品的详情
router.get('/products/:id',async (ctx)=>{
	
})













export default router