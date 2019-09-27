//汇总的vuex的入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo.js'
import home from './modules/home.js'

Vue.use(Vuex);//用插件，用了Vue.use会默认调用这个库的install方法，可以传参

//Vuex里有Stroe的属性，而且new是一个类，所以class Store
const store = () => new Vuex.Store({
	//vuex怎么在这里取值，怎么改值，改值后怎么影响其他值的
	//我希望把一个项目分成若干个模块->递归
	modules:{geo,home},//做配置，这个就是root根模块
	actions:{//异步的就放到actions中，属于和api交互，主要有两个功能1调其他的actions，2去提交一个mutation
		
		//Nuxt.js生命周期：检查有没有这个配置项nuxtServerInit(Store action操作vuex的)，对vuex的实例做的一个动作
		async nuxtServerInit({commit},{req,app}){
			//这里简写status:status
			let {status,data:{province,city}} = await app.$axios.get('/geo/getPosition')//这里是从服务端获取所以是getPosition

//这个检查是在客户端做的，因为是客户端所以是setPosition
			commit('geo/setPosition',status==200?{city,province}:{city:'',province:''})
			const {status:status2,data:{menu}} = await app.$axios.get('geo/menu')
			commit('home/setMenu',status2 === 200 ? menu : [])
			const {status:status3,data:{result}} = await app.$axios.get('search/hotPlace',{
				params:{city:app.store.state.geo.position.city.replace('市','')}
			})
			commit('home/setHotPlace',status3 === 200 ? result : [])
		}
	}
})


export default store