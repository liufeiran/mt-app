import Router from 'koa-router'//引入koa的路由
import axios from './utils/axios.js'//请求对外接口，需要这个类库
import sign from './utils/sign.js'//签名，跑慕课接口时用，收费

//谁用就引谁的数据库表
import City from '../dbs/models/city.js'
import Province from '../dbs/models/province.js'
import Menu from '../dbs/models/menu.js'


let router = new Router({prefix:'/geo'})//接口前缀



//注册这个接口，客户端发出请求，服务端根据ip查库，给出当前城市的名称
router.get('/getPosition',async (ctx)=>{
	//这里是跑慕课的接口
	let {status,data:{province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)//发出了请求，请求第三方
	//,{params:{sign}}好像是一个可以，两个必须要用params对象传
	if(status === 200){
		ctx.body={
			province,city//把这两个传给浏览器
		}
	}else{
		ctx.body = {
			province:'',
			city:''
		}
	}
})

//获取省份
router.get('/province', async (ctx)=>{
	//这里是跑本机数据库
	let province = await Province.find()//调Province模型的find()就能查出数据来
	ctx.body = {
		province:province.map(item=>{
			return {id:item.id,name:item.value[0]}
		})
	}
	//这里是跑慕课的接口
//	let {status,data:{province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
//	ctx.body={
//		province: status === 200 ? province : []
//	}
})

//指定id的省份，根据id可以查到省份下的所有城市
router.get('/province/:id', async (ctx)=>{
	//这里是跑本机数据库
	let city = await City.findOne({id:ctx.params.id})
	ctx.body={
		code:0,
		city:city.value.map(item=>{
			return {province:item.province, id:item.id, name:item.name}
		})
	}
//	let {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
//	  if (status === 200) {
//	    ctx.body = {
//	      city
//	    }
//	  } else {
//	    ctx.body = {
//	      city: []
//	    }
//	  }
})

//获取所有城市
router.get('/city', async (ctx)=>{
	//这里是跑本机数据库
	let city = [];
	let result = await City.find()
	result.forEach(item=>{
		city = city.concat(item.value)
	})
	ctx.body={
		code:0,
		city:city.map(item=>{
			return {
				province:item.province,
				id:item.id,
				name:item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
			}
		})
	}

//	let {status,data:{city}} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
//	if(status === 200){
//		ctx.body={
//			city
//		}
//	}else{
//		ctx.body={
//			city:[]
//		}
//	}
})

//获取热门城市
router.get('/hotCity', async (ctx)=>{
	//这里是跑本机数据库
	let list = ['北京市','上海市','广州市','深圳市','天津市','西安市','杭州市','南京市','武汉市','成都市'];
	let result = await City.find();
	let nList = [];
	result.forEach(item =>{
		nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
	})
	ctx.body={
		hots:nList
	}
	
//	let {status, data:{hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
//	  if (status === 200) {
//	    ctx.body = {
//	      hots
//	    }
//	  } else {
//	    ctx.body = {
//	      hots: []
//	    }
//	  }
})

//获取菜单
router.get('/menu', async (ctx)=>{
//这里是跑本机数据库
	const result = await Menu.findOne()
	ctx.body={
		menu:result.menu
	}

//这里是跑慕课的接口
//	let {status,data:{menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
//	if(status === 200){
//		ctx.body={
//			menu
//		}
//	}else{
//		ctx.body={
//			menu:[]
//		}
//	}

})



export default router;
