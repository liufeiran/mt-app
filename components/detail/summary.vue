<template>
	<dl class="m-sum-card">
		<dt>
			<h1>{{meta.name}}</h1>
			<el-rate v-model="rate" disabled></el-rate>
			<span>{{Number(meta.biz_ext.rating) || rate}}分</span>
			<span>人均￥{{Number(meta.biz_ext.cost)}}</span>
			<ul>
				<li @click="openMep(meta.location)">地址：{{meta.address.length ? meta.address : '未填写'}}</li>
				<li>电话：{{meta.tel.length ? meta.tel : '未填写'}}</li>
			</ul>
		</dt>
		<dd>
			<el-carousel height="214px" indicator-position="none">
		      <el-carousel-item v-for="(item,index) in meta.photos" :key="index">
		        <h3><img :src="item.url" alt="item.title" width="100%" height="100%"/></h3>
		      </el-carousel-item>
		    </el-carousel>
		</dd>
	</dl>
</template>
<script type="text/javascript">
export default{
	name:"mysummary",
	data(){
		return{
			sale:70 + Math.floor(Math.random() * 300)
		}
	},
	props:{
		meta:{
			type:Object,
			default:()=>{
				return {}
			}
		}
	},
	created(){
		
	},
	methods:{
		openMap(location){
			
		}
	},
	computed:{
		rate(){//星星评价
			return Number(this.meta.biz_ext.rating) || Math.floor(Math.random() * 5)
		}
	},
	components:{}
}
</script>
<style lang="scss">

</style>