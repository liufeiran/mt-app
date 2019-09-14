<template>
	<div class="m-detail-list">
		<ul>
			<li>{{list.filter(item=>item.photos.length).length}}款套餐</li><!--做过滤去除没图片的-->
			<item v-for="(item,index) in list" :key="index" :meta="item"></item>
		</ul>
	</div>
</template>
<script type="text/javascript">
import item from './item.vue'
export default{
	name:"list",
	data(){
		return{}
	},
	props:{
		list:{
			type:Array,
			default:()=>{
				return []
			}
		}
	},
	created(){
		
	},
	methods:{},
	computed:{},
	components:{
		item
	}
}
</script>
<style lang="scss">

</style>