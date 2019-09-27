<template>
	<div class="search-panel">
		<el-row class="m-header-searchbar">
			<el-col :span="3" class="left">
				<a href="/"><img src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" /></a>
			</el-col>
			<el-col :span="15" class="center">
				<div class="wrapper">
					<el-input v-model="search" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input"/>
					<button class="el-button el-button--primary" @click="searchProduct"><i class="el-icon-search"/></button>
					<dl class="hotPlace" v-if="isHotPlace">
						<!--聚焦但没输入内容-->
						<dt>热门搜索</dt>
						<dd v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index"><a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a></dd>
					</dl>
					<dl class="searchList" v-if="isSearchList">
					<!--聚焦后输入了内容-->
						<dd v-for="(item,index) in searchList" :key="index"><a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a></dd>
					</dl>
				</div>
				<p class="suggset">
					<a v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index" :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
				</p>
				<ul class="nav">
					<li><nuxt-link to="/" class="takeout">美团外卖</nuxt-link></li>
					<li><nuxt-link to="/" class="movie">猫眼电影</nuxt-link></li>
					<li><nuxt-link to="/" class="hotel">美团酒店</nuxt-link></li>
					<li><nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link></li>
					<li><nuxt-link to="/" class="business">商家入驻</nuxt-link></li>
				</ul>
			</el-col>
			<el-col :span="6" class="right">
				<ul class="security">
					<li><i class="refund"/><p class="txt">随时退</p></li>
					<li><i class="single"/><p class="txt">不满意免单</p></li>
					<li><i class="overdue"/><p class="txt">过期退</p></li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import _ from 'lodash'
export default{
	data(){
		return{
			search:'',//当前输入框的值
			isFocus:false,//当前是否聚焦状态
			hotPlace:[],
			searchList:[],
		}
	},
	created(){
		
	},
	methods:{
		focus(){//获取焦点事件
			this.isFocus = true;
		},
		blur(){//失去焦点事件
			//点击热门搜索的连接时，会先触发blur事件，列表先收起来了导致被点击的链接没有生效，用定时器解决这个问题
			let self = this;
			setTimeout(function(){
				self.isFocus = false;//让状态的改变做一个延时
			},200)
		},
		searchProduct() {
	        window.location.href = `/products?keyword=${encodeURIComponent(this.search)}`
	    },
		//输入就会触发这个input事件，这时发请求拿数据，来更新this.searchList
		input:_.debounce(async function(){//为了不让输入一个字符就发一次请求，用这个库的延时函数来做
			let self = this;
			//先获取当前城市
			let city = self.$store.state.geo.position.city.replace('市','')//第三方服务规定不能带市，因为查询出来的都带市
			self.searchList = []
			let {status,data:{top}} = await self.$axios.get('/search/top',{//搜索是需要提供城市的，所以要在上面先获取城市，对应server>interface>search.js
				params:{
					input:self.search,
					city
				}
			})
			self.searchList = top.slice(0,5)
		},300)
		
	},
	computed:{
		//计算属性，通过值的变更来影响方法的结果
		isHotPlace(){
			return this.isFocus && !this.search;
		},
		isSearchList(){
			return this.isFocus && this.search;
		}
	},
	components:{}
}
</script>
<style lang="css">
.suggset a{margin-left:10px;}
</style>