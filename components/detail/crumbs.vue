<template>
	<div class="m-crumbs">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{path:'/'}">{{$store.state.geo.position.city.replace('市','')}}美团</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{path:'/'}">{{$store.state.geo.position.city.replace('市','')}}{{type}}</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/">{{$store.state.geo.position.city.replace('市','')}}{{decodeURIComponent(keyword)}}</a></el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script type="text/javascript">
export default{
	name:"crumbs",
	data(){
		return{}
	},
	props:{
		keyword:{
			type:String,
			defalut:''
		},
		type:{
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
<style lang="scss">

</style>