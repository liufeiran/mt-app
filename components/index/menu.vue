<template>
	<div class="m-menu">
		<dl class="nav" @mouseleave="mouseleave">
			<dt>全部分类</dt>
			<dd v-for="(item,index) in $store.state.home.menu" :key="index" @mouseenter="enter">
				<i :class="item.type"/>{{item.name}}<span class="arrow"></span>
			</dd>
		</dl>
		<!--这里加两个事件，来判断如果是移入当前展示的menu.child就清空定时器不让kind为空，如果移出当前展示的menu.child在给kind赋值空-->
		<div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
			<!--template的循环就是1级child的循环，span的循环就是2级child的循环，:key不能重名可以用Math.random()-->
			<template v-for="(item,index) in curdetail.child">
				<h4 :key="index">{{item.title}}</h4>
				<span v-for="v in item.child" :key="v">{{v}}</span>
			</template>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	name:"mymenu",
	data(){
		return{
			kind:'',//鼠标hover(mouseenter)的时候来改变它，用计算属性
			menu:[
			{
				type:'food',
				name:'美食',
				child:[
					{
						title:'美食',
						child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
					}
				]
			},
			{
				type:'takeout',
				name:'外卖',
				child:[
					{
						title:'外卖',
						child:['美团外卖','饿了么','百度外卖','肯德基宅急送']
					}
				]
			},
			{
				type:'hotel',
				name:'酒店',
				child:[
					{
						title:'酒店',
						child:['经济型','舒适/三星','高档/四星','豪华/五星']
					}
				]
			},
//			{type:'homestay',name:'榛果民宿'},
//			{type:'movie',name:'猫眼电影'},
//			{type:'airport',name:'机票 / 火车票'},
//			{type:'ktv',name:'休闲娱乐 / KTV'},
//			{type:'life',name:'生活服务'},
//			{type:'hair',name:'丽人 / 美发 / 医学美容'},
//			{type:'marry',name:'结婚 / 婚纱摄影 / 婚宴'},
//			{type:'offspring',name:'亲子 / 儿童乐园 / 幼教'},
//			{type:'sport',name:'运动健身 / 健身中心'},
//			{type:'furniture',name:'家装 / 建材 / 家居'},
//			{type:'study',name:'学习培训 / 音乐培训'},
//			{type:'health',name:'医疗健康 / 宠物 / 爱车'},
//			{type:'bar',name:'酒吧 / 密室逃脱'},
			]
		}
	},
	created(){
	},
	methods:{
		mouseleave(){
			let self = this;//this->当前组件，给当前组件添加定时器
			self._timer = setTimeout(function(){
				self.kind = '';
			},150)
		},
		enter(e){
			this.kind = e.target.querySelector('i').className;
		},
		//这里加两个事件，来判断如果是移入当前展示的menu.child就清空定时器不让kind为空，如果移出当前展示的menu.child在给kind赋值空
		sover(){
			clearTimeout(this._timer);
		},
		sout(){
			this.kind = '';
		}
	},
	computed:{//计算属性
		curdetail(){
			return this.$store.state.home.menu.filter(item => item.type == this.kind)[0];//拿到了当前的menu这一组数据
		}
	},
	components:{}
	//通过鼠标放上去的事件，获取一个元素标签名的样式名，用这个样式名与type类名比较得到当前menu这一组数据
}
</script>
<style scoped>

</style>