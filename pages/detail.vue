<template>
	<div class="page-detail">
		<el-row>
			<el-col :span="24"><crumbs :keyword="keyword" :type="type"></crumbs></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><mysummary :meta="product"></mysummary></el-col>
		</el-row>
		<el-row class="m-title">
			<el-col :span="24"><h3>商家团购及优惠</h3></el-col>
		</el-row>
		<el-row v-if="canOrder || !login">
			<!--有数据或者未登录，有一个成立就显示-->
			<el-col :span="24">
				<list :list="list" v-if="login"></list><!--如果登录就显示列表-->
				<div class="deal-need-login" v-else><!--否则显示这个-->
					<img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
					<span>请登录后查看详细团购优惠</span>
					<el-button type="primary" round><a href="/login">立即登录</a></el-button>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import crumbs from '@/components/detail/crumbs.vue'
import mysummary from '@/components/detail/summary.vue'
import list from '@/components/detail/list.vue'
export default{
	layout:'default',
	name:"",
	data(){
		return{
//			keyword:'',
//			type:'',
//			product:{},
//			list:[]
		}
	},
	created(){
		
	},
	//asyncData是在服务端执行的，所以data里拿不到keyword和type，而product,list,login是从接口中传递过来的
	async asyncData(ctx){//这里返回了data里可以不要了
		//通过接口传递过来的
		let {keyword,type} = ctx.query;
		let {status,data:{product,more:list,login}} = await ctx.$axios.get('/search/products',{
			params:{
				keyword,
				type,
				city:ctx.store.state.geo.position.city
			}
		})
		if(status===200){
			return {
				keyword,
				product,
				type,
				list,
				login
			}
		}else{
			return {
				keyword,
				product:{},
				type,
				list:[],
				login:fales
			}
		}
	},
	methods:{},
	computed:{
		canOrder(){//有（图片）数据才显示
			return this.list.filter(item=>item.photos.length).length;
			//return this.list;
		}
	},
	components:{
		crumbs,mysummary,list
	}
}
</script>
<style lang="scss">
@import "@/assets/css/detail/index.scss";
</style>