<template>
	<div class="m-crumbs">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.geo.position.city.replace('市','')}}美团</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/">{{$store.state.geo.position.city.replace('市','')}}{{decodeURIComponent(keyword) }}</a></el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script type="text/javascript">
//decodeURIComponent()对encodeURIComponent()解码
export default{
	name:"crumbs",
	data(){
		return{}
	},
	props:{//通过父子组件传递方式获得变量
		keyword:{
			type:String,
			default:''
		}
	},
	created(){
		
	},
	methods:{},
	computed:{},
	components:{}
}
</script>
<style scoped>

</style>