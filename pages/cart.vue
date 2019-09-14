<template>
	<div class="page-cart">
		<el-row>
			<el-col v-if="cart.length" :span="24" class="m-cart">
				<ctlist :cart-data="cart"></ctlist>
				<!--因为父传子props里是cartData，所以这里用cart-data这种写法-->
				<p>应付金额：<em class="money">￥{{total}}</em></p>
				<div class="post">
					<el-button type="primary" @click="submit">提交订单</el-button>
				</div>
			</el-col>
			<el-col v-else :span="24" class="empty">购物车为空</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import ctlist from '@/components/cart/list.vue'
export default{
	name:"cart",
	data(){
		return{
			cart:[]//列表中的某一项改变时会回写这里的值，就是数量改变时
		}
	},
	created(){
		
	},
	methods:{
		async submit(){
			let {status,data:{code,id}} = await this.$axios.post('/order/createOrder',{
				count:this.cart[0].count,
				price:this.cart[0].price,
				id:this.cartNo
			})
			if(status === 200 && code===0){
				this.$alert(`恭喜您,已成功下单,订单号:${id}`,'下单成功',{
					confirmButtonText:'确定',
					callback:action=>{
						location.href='/order'
					}
				})
			}
		}
	},
	async asyncData(ctx){
		//ssr页面下发的时候就已经把数据塞进去了，1体验好，用户拿到的就是信息了，2接口保护，因为这个动作是在服务端执行的
		let {status,data:{code,data:{name,price}}} = await ctx.$axios.post('/cart/getCart',{//也是post方式
			id:ctx.query.id
		})
		if(status===200 && code===0 && name){
			return {
				cart:[{  //购物车信息
					name,
					price,
					count:1
				}],
				cartNo:ctx.query.id  //购物车id
			}
		}
	},
	computed:{
		total(){//cart数据改变total就会重新计算
			let total = 0;
			this.cart.forEach(item=>{//所有的表遍历一次，然后把总金额算出来
				total+=item.price * item.count
			})
			return total
		}
	},
	components:{
		ctlist
	}
}
</script>
<style lang="scss">
@import "@/assets/css/cart/index.scss";
</style>