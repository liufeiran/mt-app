<template>
	<div class="m-geo">
		<i class="el-icon-location"/>{{$store.state.geo.position.city}}
		<nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
		 
		<!--[<a href="#" v-for="item in nearCity.slice(0,3)" :key="item.id"> {{item.label.replace('市','')}} </a>]-->
	</div>
</template>
<script>
//{{$store.state.geo.position.city}}
//vuex实例.获取状态.模块名称（store>modules>geo.js）.模块下的一个变量.下的属性
export default{
	name:"geo",
	data(){
		return{
			nearCity:[],
			citys:[],
			province:[],
			abc:[]
		}
	},
	//下面是学生写和自己改的，有问题
	watch: {
	    "$store.state.geo.position":async function() { // 监听"$store.state.position"的 变化 让nearcity 也跟着变化
	      this.nearCity =await this.$store.state.geo.city;
	    
	      //console.log(this.nearCity)
	    }
	  },
	async created() {

	    let self = this;
	    console.log(this.$store.state.geo);
	    
//	    this.province =await this.$store.state.geo.position.province;
//
//	    this.citys=await self.$axios.get(`/geo/province`);
//	    console.log(this.citys,this.province);
//	    
	    
//		let {status:status1,data:{province}} = await self.$axios.get('/geo/province')//这是获取所有的省
//		if(status1 === 200){
//			this.abc = province.map(item=>{
//				return {
//					value:item.id,
//					label:item.name
//				}
//			})
//		}
//		console.log(this.abc)
		
		
//			let {status,data:{city}} = await self.$axios.get(`/geo/province/${this.citys.data.province[1].id}`)//现在做到指定省号获得所有城市
//			if(status === 200){
//				self.nearCity = city.map(item=>{
//					return {
//						value:item.id,
//						label:item.name
//					}
//				})
//
//			}
		
		
		
		
		//this.nearCity =await  this.nearCity.filter(item=>item.label==this.$store.state.geo.position.province)//可以筛选出当前省，一次有效
			//console.log(this.nearCity)
	      //this.nearCity= await this.$store.state.geo.city
		//location.href='/';
	      
	    
	  },

	methods:{},
	computed:{},
}
</script>
<style lang="css">

</style>