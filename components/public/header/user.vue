<template>
	<div class="m-user">
		<template v-if="user">
			欢迎您，<span class="username">{{user}}</span>
			<nuxt-link to="/exit">退出</nuxt-link>
		</template>
		<template v-else>
			<nuxt-link class="login" to="/login">立即登录</nuxt-link>
			<nuxt-link class="register" to="/register">注册</nuxt-link>
		</template>
	</div>
</template>
<script type="text/javascript">
export default{
	//在server>interface>users.js的      getUser中有这个接口
	name:"user",
	data(){
		return {
			user:''
		}
	},
	created(){
		
	},
	async mounted(){//钩子函数
		//解构赋值中外层有status,data里面有user
		const {status,data:{user}} = await this.$axios.get('/users/getUser')
		if(status === 200){
			this.user = user
		}
	},
	methods:{},
	computed:{},
	components:{}
}
</script>
<style>

</style>