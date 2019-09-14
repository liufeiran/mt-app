<template>
	<section class="m-istyle">
		<dl>
			<dt>有格调</dt>
			<dd :class="{active:kind=='all'}" kind="all" keyword="景点" @mouseover="over">全部</dd>
			<dd :class="{active:kind=='part'}" kind="part" keyword="美食" @mouseover="over">约会聚餐</dd>
			<dd :class="{active:kind=='spa'}" kind="spa" keyword="丽人" @mouseover="over">丽人SPA</dd>
			<dd :class="{active:kind=='movie'}" kind="movie" keyword="电影" @mouseover="over">电影演出</dd>
			<dd :class="{active:kind=='travel'}" kind="travel" keyword="旅游" @mouseover="over">品质出游</dd>
		</dl>
		<ul class="ibody">
			<li v-for="item in cur" :key="item.title">
				<!--这里的链接写法类似于components-products-product.vue的写法-->
				<a :href="'/detail?keyword='+encodeURIComponent(item.title)+'&type='+encodeURIComponent(item.pos)">
				<el-card :body-style="{ padding: '0px' }" shadow="never">
			      <img :src="item.img" class="image">
			      <ul class="cbody">
			        <li class="title">{{item.title}}</li>
			        <li class="pos"><span v-for="v in item.pos">{{ v }}</span><!--遍历出数组的每一项来<span>{{item.pos}}</span>--></li>
			        <!--三元容错判断只能在上页面时判断，在获取数据时判断不起作用-->
			        <li class="price">￥<em>{{item.price.length>0 ? item.price : 20}}</em><span>/起</span></li>
			      </ul>
			    </el-card>
			    </a>
			</li>
		</ul>
	</section>
</template>
<script type="text/javascript">
export default{
	name:"artistic",
	data(){
		return{
			kind:'all',
			list:{
				all:[],
				part: [],
		        spa: [],
		        movie: [],
		        travel: []
			}
		}
	},
	created(){
		
	},
	async mounted(){
				let self = this;
				let {status,data:{count,pois}} = await self.$axios.get('/search/resultsByKeywords',{
					params:{
						keyword:'景点',
						city:self.$store.state.geo.position.city
					}
				})
				if(status === 200 && count > 0){
					//筛选出有图片的产品才展示，没有图片的不要
					let r = pois.filter(item => item.photos.length).map(item=>{//这里用map做前后端数据映射，页面上用自己的字段，防止后台频繁改动的麻烦
						return {
							title:item.name,
							pos: item.type.split(';'),//分割成数组的每一项，以便上面遍历
							price: item.biz_ext.cost,//这里判断有些类别不起作用，要到页面上判断，这里价格获取的各种各样数据类型，有String有Object
							img:item.photos[0].url,
							url:'//abc.com'
						}
					})
					self.list[self.kind] = r.slice(0,9)
				}else{
					self.list[self.kind] = []
				}
	},
	methods:{
		async over(e){//事件委托
			let dom = e.target;//获取事件源元素标签
			let tag = dom.tagName.toLowerCase();//获取标签名转小写
			let self = this;//获取当前组件
			if(tag == 'dd'){//如果事件源为dd标签
				this.kind = dom.getAttribute('kind');//获取事件源标签的kind自定义属性赋值给当前组件的kind
				let keyword = dom.getAttribute('keyword');//获取事件源标签的keyword自定义属性赋值给变量的keyword
				let {status,data:{count,pois}} = await self.$axios.get('/search/resultsByKeywords',{
					params:{
						keyword,
						city:self.$store.state.geo.position.city
					}
				})
				if(status === 200 && count > 0){
					//筛选出有图片的产品才展示，没有图片的不要
					let r = pois.filter(item => item.photos.length).map(item=>{//这里用map做前后端数据映射，页面上用自己的字段，防止后台频繁改动的麻烦
						return {
							title:item.name,
							pos:item.type.split(';'),
							price:item.biz_ext.cost || '暂无',
							img:item.photos[0].url,
							url:'//abc.com'
						}
					})
					self.list[self.kind] = r.slice(0,9)
				}else{
					self.list[self.kind] = []
				}
			}
			
		}
	},
	computed:{
		cur(){
			//over方法用的事件委托，所以事件源改变this.kind就会改变，从而影响这里的计算属性重新获取
			return this.list[this.kind];//只能把this.kind作为变量
		}
	},
	components:{}
}
</script>
<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>












