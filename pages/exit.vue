<template>
	<div></div>
</template>
<script type="text/javascript">
export default{
	layout: 'blank',
	name:"exit",
	//nuxt生命周期，利用中间件实现，没有和用户交互的行为去做这件事情，到达这个页面时自动去执行
	middleware: async (ctx) => {
		let {status,data} = await ctx.$axios.get('/users/exit')//自动去响应这个接口，做退出动作，成功后返回首页
		//响应到接口中去执行ctx.logout()方法，然后判断是否是登录状态，不是登录状态才返回到这里code===0
		//解构赋值拿到状态和数据，数据是在接口的ctx.body={}中反馈出来的，反馈什么数据，就用data.***去拿
		if(status===200 && data && data.code===0){
			window.location.href='/'
		}
  }
}
</script>