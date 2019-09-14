<template>
	<el-row class="page-product">
		<el-col :span="19">
			<crumbs :keyword="keyword"></crumbs>
			<category :types="types" :areas="areas"></category>
			<list :list="list"></list>
			<!--通过属性传递-->
		</el-col>
		<el-col :span="5">
			<!--如果没有经纬度就不显示这个组件-->
			<Amap v-if="point.length" :width="230" :height="290" :point="point"></Amap>
		</el-col>
	</el-row>
</template>
<script type="text/javascript">
import crumbs from '@/components/products/crumbs.vue'
import category from '@/components/products/category.vue'
import list from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default{
	name:"products",
	data(){
		return{
			list:[],  //列表
			types:[],  //分类1
			areas:[],  //分类2
			keyword:'',  //面包屑关键字
			point:[]  //经纬度
		}
	},
	created(){

	},
	async asyncData(ctx){//获取的数据用来渲染vue组件的，nuxt方法
		//做一下编码处理防止乱码encodeURIComponent()，因为/search/resultsByKeywords接口那里没有做编码所以这里也不用
		let keyword = ctx.query.keyword;  //用get的方式通过ctx请求传递过来keyword，
		let city = ctx.store.state.geo.position.city;//通过模块得到当前我所在的城市
		let {status:status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{//count几条数据，pois数据，和server>interface>search.js里对应，这里是列表，只能用线上数据
			params:{  //传参
				keyword,//将刚才得到的两个值传入search接口的resultsByKeywords
				city
			}
		})
		let {status:status2,data:{areas,types}} = await ctx.$axios.get('/category/crumbs',{
			params:{city}//线上数据有问题，分类types只有top一项，没有数据，而且这里只能用线上数据，本地得不到任何东西
		})
		if(status===200 && count>0 && status2===200){
			return {//判断成功后做过滤和map映射
				list:pois.filter(item=>item.photos.length).map(item=>{
					//老师数据搞错了rating是评分，cost是价格
					return {
						type:item.type,
						img:item.photos[0].url,
						name:item.name,
						comment:Math.floor(Math.random()*10000),
						rate:Number(item.biz_ext.rating),//服务端返回的数据，返回的不规范，要做数据转换
						scene:item.tag,
						price:item.biz_ext.cost.length>0 ? Number(item.biz_ext.cost) : '20',
						tel:item.tel.length>0 ? item.tel : '未填写',
						status:'可订明日',
						addr:item.address.length>0 ? item.address : '未填写',
						location:item.location,
						module:item.type.split(';')[0]//第三方给的类型很多，取第一个
					}
				}),
				keyword,//这样写就相当于给keyword赋值了，技巧？
				areas:areas.filter(item=>item.type!=='').slice(0,5),
				types:types.filter(item=>item.type!=='').slice(0,5),
				point:(pois.find(item=>item.location).location || '').split(',')
				//经纬度：找到第一个存在的经纬度的值，如果有取到他的location值，如果没有给空，再做分割，因为给的是字符串，我们分割为数组的形式
			}
		}
	},
	methods:{},
	computed:{},
	components:{
		crumbs,category,list,Amap
	}
}
</script>
<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
















