<template>
	<div class="page-order">
		<el-row>
			<el-col :span="4" class="navbar">
				<h3>我的美团</h3>
				<dl>
					<dt>我的订单</dt>
					<dd>全部订单<i class="el-icon-arrow-right"></i></dd>
					<dd>待付款<i class="el-icon-arrow-right"></i></dd>
					<dd>待使用<i class="el-icon-arrow-right"></i></dd>
					<dd>待评价<i class="el-icon-arrow-right"></i></dd>
				</dl>
				<dl>
					<dt>我的收藏</dt>
					<dd>收藏的商家<i class="el-icon-arrow-right"></i></dd>
					<dd>收藏的团购<i class="el-icon-arrow-right"></i></dd>
				</dl>
				<dl>
					<dt>抵用券</dt>
					<dd>可用券<i class="el-icon-arrow-right"></i></dd>
					<dd>失效券<i class="el-icon-arrow-right"></i></dd>
				</dl>
				<dl>
					<dt>个人信息</dt>
					<dd>账户设置<i class="el-icon-arrow-right"></i></dd>
				</dl>
			</el-col>
			<el-col :span="19" class="table">
				<el-tabs v-model="activeName" @tab-click="handleClick"><!--每次点标签会触发类型的改变-->
					<!--类型用name做区分-->
					<el-tab-pane label="全部订单" name="all"><mylist :cur="cur"></mylist></el-tab-pane>
					<el-tab-pane label="待付款" name="unpay"><mylist :cur="cur"></mylist></el-tab-pane>
					<el-tab-pane label="待使用" name="unuse"><mylist :cur="cur"></mylist></el-tab-pane>
					<el-tab-pane label="待评价" name="unreplay"><mylist :cur="cur"></mylist></el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import mylist from '@/components/order/list.vue'
export default{
	name:"order",
	data(){
		return{
			activeName:'all',
			list:[],  //当前所有的订单
			cur:[]  //当前数据
		}
	},
	created(){
		
	},
	watch:{
		activeName(val){//激活当前获取的类型，activeName是监听状态的，它一改变就会获取当前val值
			//cur是当前数据，在<mylist>里传入的数组cur，list当前所有的订单
			this.cur = this.list.filter(item=>{//这里对list状态过滤
				if(val === 'unpay'){
					return item.status === 0//未付款
				}else if(val === 'all'){//返回全部
					return true
				}else{
					return false
				}
			})
		},
		list(){
			let val = this.name;
			this.cur = this.list.filter(item=>{
				if(val === 'unpay'){
					return item.status === 0
				}else if(val === 'all'){
					return true
				}else{
					return false
				}
			})
		}
	},
	methods:{
		handleClick(tab){//类型改变就会改变activeName，tab是vueComponent
			this.activeName = tab.name;
			console.log(this.activeName)
		}
	},
	async asyncData(ctx){
		let {status,data:{code,list}} = await ctx.$axios.post('/order/getOrders')
		//检查这个接口的状态
		if(status===200 && code===0 && list.length){
			return {//做映射
				list:list.map(item=>{
					return {
						img:item.imgs.length ? item.imgs[0].url : '/logo.png',
						name:item.name,
						count:1,
						total:item.total,
						status:item.status,
						statusTxt:item.status===0 ? '待付款' : '已付款'
					}
				}),
				//还要写cur才会有数据的，不能只写list
				cur:list.map(item=>{
					return {
						img:item.imgs.length ? item.imgs[0].url : '/logo.png',
						name:item.name,
						count:1,
						total:item.total,
						status:item.status,
						statusTxt:item.status===0 ? '待付款' : '已付款'
					}
				})
			}
		}

	
	},
	computed:{},
	components:{
		mylist
	}
}
</script>
<style lang="scss">
@import "@/assets/css/order/index.scss";
</style>