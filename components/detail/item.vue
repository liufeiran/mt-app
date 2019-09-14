<template>
	<li v-if="meta.photos.length" class="m-detail-item">
		<dl class="section">
			<dd>
				<!--这里是列表中仅放的一张小图-->
				<img :src="meta.photos[0].url" :alt="meta.photos[0].title"/>
			</dd>
			<dd>
				<h4>{{meta.name}}</h4>
				<p>
					<span v-if="meta.biz_ext&&meta.biz_ext.ticket_ordering">剩余：{{Number(meta.biz_ext.ticket_ordering)}}</span>
					<span v-if="meta.deadline">截止日期：{{meta.deadline}}</span>
				</p>
				<p>
					<span class="price">{{Number(meta.biz_ext.cost) || 20}}</span>
					<!--没有价格默认20-->
					<sub>门店价{{Number(meta.biz_ext.cost)+Math.floor(Math.random()*100)}}</sub>
					<!--这里自己做了个假的-->
				</p>
			</dd>
			<dd>
				<el-button type="warning" round @click="createCart">立即抢购</el-button>
			</dd>
		</dl>
	</li>
</template>
<script type="text/javascript">
export default{
	name:"item",
	data(){
		return{}
	},
	props:{//显示的东西还是通过父传子传进来的
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
		async createCart(){//这是到购物车的按钮
			let self = this;
			//创建购物车
			let {status,data:{code,id}} = await this.$axios.post('/cart/create',{
				params:{
					//这里真实的应该是通过产品id去另一个产品库里取的name,price,img,tel等等，这里没有产品库，所以只能通过上传到购物车来达到模拟的效果
					id:Math.random().toString().slice(3,9),//实际上这里是有对应的产品的id的，因为没有对应的产品库，这里是随意起的id
					detail:{//获取到的数据映射到自己的字段上
						name:self.meta.name,//名字
						price:self.meta.biz_ext.cost,//价格
						imgs:self.meta.photos//图片
					}
				}
			})
			//顺序是先创建购物车，创建成功后再跳转到对应的页面，
			if(status===200&&code===0){//判断接口是否成功
				window.location.href=`/cart/?id=${id}`//跳转，这里不能用单引号，创建和跳转是通过id来做关联的（cartNo）
			}else{
				console.log('error')
			}
		}
	},
	computed:{},
	components:{}
}
</script>
<style lang="scss">

</style>