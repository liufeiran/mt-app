<template>
	<el-table :data="cartData" style="width: 980px">
    <el-table-column label="项目" prop="name" width="530"></el-table-column>
    <el-table-column label="单价" prop="price" width="132"></el-table-column>
    <el-table-column label="数量" width="212">
    	<template slot-scope="scope">
	    	<el-input-number v-model="scope.row.count" :min="0"></el-input-number>
	    </template>
    </el-table-column>
    <el-table-column label="总价">
    	<template slot-scope="scope">
    						<!--当前行的单价*当前行的数量-->
	    	<div class="">{{scope.row.price * scope.row.count}}</div>
	    	<!--这里能改变当前引用对象的值，这个数据关联着cartData-->
	    </template>
    </el-table-column>
  </el-table>
</template>
<script type="text/javascript">
export default{
	name:"ctlist",
	data(){
		return{
			//用data里的数据调好静态页面,在用props真实数据
//			cartData: [{
//	          name: '王小虎',
//	          price: 180,
//	          count: 3
//	        }]
		}
	},
	props:{
		cartData:{//cartData是从cart.vue页的cart数据来的
			type:Array,
			default:()=>{
				return []
			}
		}
	},
	created(){
		
	},
	methods:{},
	computed:{},
	components:{}
}
</script>
<style >

</style>