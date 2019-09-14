<template>
	<div class="m-header">
		<el-row>
			<el-col>
				<!--顶部的三块-->
				<topbar></topbar>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<searchbar></searchbar>
			</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
//header是个公共文件，里面有一个对外的出口文件index.vue
import topbar from './topbar.vue'
import searchbar from './searchbar.vue'
export default{
	name:"",
	data(){
		return{}
	},
	created(){
		
	},
	methods:{},
	computed:{},
	components:{
		topbar,searchbar
	}
}
</script>
<style lang="scss">
@import "@/assets/css/public/layout.scss";
@import "@/assets/css/public/header/index.scss";
</style>