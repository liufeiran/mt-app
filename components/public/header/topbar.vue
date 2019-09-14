<template>
	<!--gutter间隔-->
	<el-row :gutter="0" class="m-header">
	  <el-col :span="5">
	  	<geo></geo>
	  </el-col>
	  <el-col :span="5">
	  	<user></user>
	  </el-col>
	  <el-col :span="14">
	  	<navbar></navbar>
	  </el-col>
	</el-row>
</template>
<script type="text/javascript">

import geo from './geo.vue'
import user from './user.vue'
import navbar from './nav.vue'

export default {
	name:"myheader",
	data(){
		return{}
	},
	created(){
		
	},
	methods:{},
	computed:{},
	components:{
		geo,user,navbar
	}
}
</script>
<style lang="scss">


</style>