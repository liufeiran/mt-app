<template>
	<div class="m-product-select">
		<dl class="tab">
			<dt>{{name}}<i class="el-icon-arrow-down el-icon-right"/></dt>
			<dd>
				<h3>{{name}}</h3>
				<span v-for="(item,index) in list" :key="index">{{item}}</span>
			</dd>
		</dl>
	</div>
</template>
<script type="text/javascript">
export default{
	name:"iselect",
	data(){
		return{}
	},
	props:{
		name:{
			type:String,
			default:''
		},
		list:{
			type:Array,
			default(){
				return []
			}
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