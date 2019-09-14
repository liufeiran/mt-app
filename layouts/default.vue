<template>
	<el-container class="layout-default">
	  <el-header height="197px">
	  	<myheader></myheader>
	  </el-header>
	  <el-main>
	  	<nuxt></nuxt>
	  </el-main>
	  <el-footer height="100%">
	  	<myfooter></myfooter>
	  </el-footer>
	</el-container>
</template>

<script>
import myheader from '@/components/public/header/index.vue'
import myfooter from '@/components/public/footer/index.vue'
//el-footer height="100%"    element UI默认底高度是60，所以这里要修改
export default {
	name:'default',
	data(){
		return{}
	},
	created(){
		
	},
	methods:{},
	computed:{},
	components:{
		myheader,myfooter
	}
}
</script>

<style>
</style>
