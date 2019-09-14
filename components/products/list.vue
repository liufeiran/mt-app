<template>
	<div class="m-products-list">
		<dl>
			<dd v-for="item in nav" :key="item.name" :class="[item.name,item.active ? 's-nav-active' : '']" @click="navSelect(item)">{{item.txt}}</dd>
		</dl>
		<ul>
			<Item v-for="(item,index) in list" :key="index" :meta="item"></Item>
		</ul>
	</div>
</template>
<script type="text/javascript">
import Item from './product.vue'
export default{
	name:"list",
	data(){
		return{
			nav:[
				{
					name:'s-default',  //样式名
					txt:'智能排序',  //名称
					active:true  //是否激活
				},
				{
					name:'s-price',
					txt:'价格最低',
					active:false
				},
				{
					name:'s-visit',
					txt:'人气最高',
					active:false
				},
				{
					name:'s-comment',
					txt:'评价最高',
					active:false
				},
			],
			bclist:[]
		}
	},
	props:{
		list:{
			type:Array,
			default(){
				return []
			}
		}
	},
	created(){
		this.bclist = this.list;//这里应该只走一遍，为什么每次排序都会被更改
	},
	async asyncData({app}) {
	    let { data } = await app.$axios.get('searchList')
	    return { items: data.list }
	  },
	  methods: {
	    navSelect: function (cur) {
	    	let self = this;
	    	let ary = self.nav;
	    	ary.forEach(item=>item.active=false)
	    	if(cur.name==='s-default'){
	    		console.log(self.bclist)
	    		self.list = self.bclist;//不起作用
	    		
		    	cur.active=true;
	    	}
	    	if(cur.name==='s-price'){
	    		self.list = self.list.sort(function(a,b){
					return a.price-b.price
				})
		    	cur.active=true;
	    	}
	    	if(cur.name==='s-visit'){
	    		self.list = self.list.sort(function(a,b){
					return b.comment-a.comment
				})
		    	cur.active=true;
	    	}
	    	if(cur.name==='s-comment'){
	    		self.list = self.list.sort(function(a,b){
					return b.rate-a.rate
				})
		    	cur.active=true;
	    	}
	    	
	    	
//这是做切换
//	    	if(cur.name==='s-comment'){
//	    		if(cur.active==false){
//	    			self.list = self.list.sort(function(a,b){
//					   return b.comment-a.comment
//					})
//		    		cur.active=true;
//		    		console.log(cur.active,'true')
//	    		}else{
//	    			self.list = self.list.sort(function(a,b){
//					   return a.comment-b.comment
//					})
//		    		cur.active=false;
//		    		console.log(cur.active,'false')
//	    		}
//	    	}	
	    		

	    }
	  },
	computed:{},
	components:{
		Item
	}
}
</script>
<style scoped>

</style>