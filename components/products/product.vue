<template>
	<dl class="s-item">
		<dt><img :src="meta.img" alt="商品图片"/></dt>
		<dd>
			<h3><nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">{{meta.name}}</nuxt-link></h3>
			<el-rate v-model="meta.rate" :color="['#ff9900','#ff9900','#ff9900']" disabled></el-rate>
			<span v-if="meta.rate>4" class="s-item-comment">很好</span>
			<span v-else-if="meta.rate>3" class="s-item-comment">一般</span>
			<span v-else class="s-item-comment">很差</span>
			<span class="s-item-value">{{meta.rate}}分</span>
			<span class="s-item-comment-total">{{meta.comment}}人评分</span>
			<p>
				<span class="s-item-type">{{meta.type}}</span>
			</p>
			<p>
				<span class="s-item-addr">地址：{{meta.addr}}</span>
				<span class="s-item-addr">电话：{{meta.tel}}</span>
			</p>
			<p>
				<em class="s-item-price">￥{{meta.price}}起</em>
				<b>{{meta.status}}</b>
			</p>
			<ul>
				<!--<li>
					<span class="detail-type">门票</span>{{meta.ticket}}
				</li>
				<li>
					<span class="detail-type">跟团</span>{{meta.group}}
				</li>-->
				<li v-if="meta.scene && meta.scene.length">
					<span class="detail-type">景酒</span>{{meta.scene}}
				</li>
				<li v-else>
					<span class="detail-type">景酒</span>暂无描述
				</li>
			</ul>
		</dd>
	</dl>
</template>
<script type="text/javascript">
export default{
	name:"product",
	data(){
		return{}
	},
	props:{
		meta:{
			type:Object,
			default(){
				return {}
			}
		}
	},
	created(){
		
	},
	mounted(){

		//console.log(this.meta)//meta就是得到了通过products.vue传递进来的数据
		//映射在pages>products.vue里做了，在这里不用做
//		let obj = ary.map(item=>{//如果需要映射
//			return {
//				title:item.name,
//				pos:item.type.split(';')[0],
//				price:item.biz_ext.cost || '暂无',
//				img:item.photos[0].url,
//				url:'//abc.com'
//			}
//		})
},
	methods:{},
	computed:{},
	components:{}
}
</script>
<style scoped>

</style>