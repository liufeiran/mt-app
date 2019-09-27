<template>
	<div class="">
		<dl class="m-category">
			<dt>按拼音首字母选择：</dt>
			<dd v-for="(item,index) in list" :key="index"><a :href="'#city-'+item">{{item}}</a></dd><!--哈希跳转-->
		</dl>
		<dl v-for="item in block" :key="item.title" class="m-category-section">
			<dt :id="'city-'+item.title">{{item.title}}</dt>
			<dd>
				<span v-for="c in item.city" :key="c" @click="changeCity(c)">{{c}}</span>
			</dd>
		</dl>
	</div>
</template>
<script type="text/javascript">
import pyjs from 'js-pinyin'

export default{
	name:"category",
	data(){
		return{
			list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
			block:[],//{title:'',city:[]}
		}
	},
	created(){
		
	},
	async mounted(){
		let self = this;
		let blocks = [];
		let {status,data:{city}} = await self.$axios.get('/geo/city');
		if(status===200){
			let p;//拼音的首字母
			let c;//拼音首字母的code值，为了排序
			let d={};//保存每一个拼音字母对应的数组
			city.forEach(item=>{
				//在不知道自己的代码将在那种语言环境中运行的情况下用toLocaleLowerCase方法稳妥
				p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1);//getFullChars库中提供的方法，将中文转为全拼
				c = p.charCodeAt(0)
				if(c>96 && c<123){
					if(!d[p]){
						d[p] = []
					}
					d[p].push(item.name)//将城市放入数组中
				}
			})
			//Object.entries() 可以把一个对象的键值以数组的形式遍历出来，不会遍历原型属性
			for(let [k,v] of Object.entries(d)){//将临时对象d放到blocks数组中，Object.entries()对象转数组
				blocks.push({
					title:k.toUpperCase(),
					city:v
				})
			}
			blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))//排序
			self.block = blocks
		}
	},
	methods:{
		changeCity(item) {
			//console.log(item)
//			this.$store.commit('toShowLoginDialog', true);
//			this.$store.dispatch('toShowLoginDialog',false)
//			主要区别是：
//			dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)
//			commit：同步操作，写法：this.$store.commit('mutations方法名',值)
	      this.$store.dispatch('geo/setPosition', {city:item})
	      console.log(item);
		//location.href='/';
	      this.$router.push({name: 'index'})
	    }
	},
	computed:{},
	components:{}
}
</script>
<style lang="scss">
@import "@/assets/css/changecity/category.scss";
</style>










