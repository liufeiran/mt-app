<template>
	<div class="m-geo">
		<i class="el-icon-location"/>{{$store.state.geo.position.city}}
		<nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
		[ 香河 廊坊 天津 ]
		<!--<a href="#" v-for="item in nearCity" :key="item.id">{{item.label}}</a>只能得到所有的省-->
	</div>
</template>
<script>
//{{$store.state.geo.position.city}}
//vuex实例.获取状态.模块名称（store>modules>geo.js）.模块下的一个变量.下的属性
export default{
	name:"geo",
	data(){
		return{
			nearCity:[]
		}
	},
	//下面是学生写和自己改的，有问题
	watch: {
	    "$store.state.geo.position":async function() { // 监听"$store.state.position"的 变化 让nearcity 也跟着变化
	      this.nearCity =await this.$store.state.geo.city
	      //console.log(this.nearCity)
	    }
	  },
	async created() {
	    let self = this;
		let {status,data:{province}} = await self.$axios.get('/geo/province')
		if(status === 200){
			this.nearCity = province.map(item=>{
				return {
					value:item.id,
					label:item.name
				}
			})
		}
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