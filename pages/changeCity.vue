<template>
	<div class="page-changeCity">
		<el-row>
			<el-col :span="24"><iselect></iselect></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><hot></hot></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><category></category></el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import iselect from '@/components/changeCity/iselect.vue'
import hot from '@/components/changeCity/hot.vue'
import category from '@/components/changeCity/category.vue'
export default{
	name:"changeCity",
	data(){
		return{}
	},
	created(){
		
	},
	methods:{},
	computed:{},
	components:{
		iselect,hot,category
	}
}
</script>
<style scoped>

</style>