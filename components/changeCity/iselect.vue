<template>
	<div class="m-iselect">
		<span class="name">按省份选择：</span>
		<el-select v-model="pvalue" placeholder="省份">
	    <el-option
	      v-for="item in province"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	  </el-select>
	  							<!--当city没有值的时候禁选-->
	  <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市" @change="changeCity">
	  	<!--这里value要用label才能显示出城市名-->
	    <el-option
	      v-for="item in city"
	      :key="item.value"
	      :label="item.label"
	      :value="item.label"
	      >
	    </el-option>
	  </el-select>
	  <span class="name">直接搜索：</span>
	  <el-autocomplete
	  v-model="input"
	  :fetch-suggestions="querySearchAsync"
	  placeholder="请输入城市中文或拼音"
	  @select="handleSelect"
	></el-autocomplete>
	</div>
</template>
<script type="text/javascript">
import _ from 'lodash'
export default{
	name:"iselect",
	data(){
		return{
			province:[],//省份列表
			pvalue:'',//当前选中的省份
			city:[],//当前选中的省份的城市列表
			cvalue:'',//当前选中的城市
			input:'',
			cities:[]//全国的城市列表
		}
	},
	created(){
		
	},
	watch:{
		async pvalue(newPvalue){//省份切换后，后面的城市也要切换
			let self = this;
			let {status,data:{city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
			if(status === 200){
				self.city = city.map(item=>{
					return {
						value:item.id,
						label:item.name
					}
				})
				self.cvalue = ''//切换后，上一次的cvalue要清空
			}
		}
	},
	async mounted(){
		let self = this;
		let {status,data:{province}} = await self.$axios.get(`/geo/province`)
		if(status === 200){
			self.province = province.map(item=>{
				return {
					value:item.id,
					label:item.name
				}
			})
		}
	},
	methods:{
		//输入就会触发这个input事件，这时发请求拿数据，来更新this.searchList
		
		querySearchAsync:_.debounce(async function(query,cb){//用户输入的内容，回调
			let self = this;
			if(self.cities.length){//有全国城市列表的情况下
				cb(self.cities.filter(item=>item.value.indexOf(query)>-1))//过滤出符合输入值的所有城市列表，数组的indexOf方法，这里没有处理拼音（用处理拼音的包）
			}else{//没有列表时请求
				let {status,data:{city}} = await self.$axios.get(`/geo/city`)
				if(status === 200){
					self.cities = city.map(item=>{//请求的话需要做映射
						return {value:item.name}
					})
					cb(self.cities.filter(item=>item.value.indexOf(query)>-1))//也要过滤
				}else{
					cb([])//不是200失败时，给空
				}
			}
		},200),
		handleSelect(item){//列表选中的时候触发的方法
			this.$store.dispatch('geo/setPosition', {city:item.value});
	      	this.$router.push({name: 'index'});
		},
		changeCity(item) {
			
	      //后台提交数据
	    	let cur = item==='市辖区' ? '北京' : item;//数据有'市辖区'的全跳北京
			this.$store.dispatch('geo/setPosition',{city:cur})//这里item就是城市名
			this.$router.push({name:'index'})// 切换城市完成后跳转路由
	    },
	},
	computed:{},
	components:{}
}
</script>
<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>