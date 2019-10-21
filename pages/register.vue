<template>
	<div class="page-register">
		<article class="header">
			<header>
				<a href="/" class="site-logo"></a>
				<span class="login">
					<em class="bold">已有美团账号？</em>
					<a href="/login"><el-button type="primary" size="mini">登录</el-button></a>
				</span>
			</header>
		</article>
		<!--section分隔-->
		<section>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="昵称" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" prop="email">
			  	<el-input v-model="ruleForm.email"></el-input>
			  	<el-button size="mini" round @click="sendMsg" :disabled="!showMsgButton">发送验证码</el-button>
			  	<span class="status">{{statusMsg}}</span>
			  </el-form-item>
			  <el-form-item label="验证码" prop="code">
			  	<el-input v-model="ruleForm.code" maxlength="4"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pwd">
			  	<el-input v-model="ruleForm.pwd" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="cpwd">
			  	<el-input v-model="ruleForm.cpwd" type="password"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<el-button type="primary" @click="register">同意以下协议并注册</el-button>
			  	<el-button @click="resetForm('ruleForm')">重置</el-button>
			  	<div class="error">{{error}}</div>
			  </el-form-item>
			  <el-form-item>
			  	<a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
			  </el-form-item>

			</el-form>
		</section>
	</div>
</template>
<script type="text/javascript">
import CryptoJS from 'crypto-js'
export default{
	layout:'blank',
	name:"register",
	data(){
		return{
			showMsgButton:true,
			statusMsg:'',
			error:'',
			ruleForm:{
				name:'',
				email:'',
				code:'',
				pwd:'',
				cpwd:''
			},
			rules:{
				name:[{
					required:true,//是否必选
					type:'string',//类型
					message:'请输入昵称',//提示
					trigger:'blur'//什么时候触发这个规则，失去焦点校验
				}],
				email:[{required:true,type:'email',message:'请输入邮箱',trigger:'blur'}],//类型email自动校验了
				code:[{required:true,type:'string',message:'请输入正确的验证码',trigger:'blur'}],
				pwd:[{required:true,message:'创建密码',trigger:'blur'}],
				cpwd:[{required:true,message:'确认密码',trigger:'blur'},
					{
						validator:(rule,value,callback)=>{//自定义一个validator函数（rule规则，value值，回调）
							if(value===''){
								callback(new Error('请再次输入密码'))
							}else if(value!==this.ruleForm.pwd){
								callback(new Error('两次输入密码不一致'))
							}else{
								callback()//没有问题直接调callback不用传东西
							}
						},
						trigger:'blur'
					}],
			}
		}
	},
	created(){
		
	},
	methods:{
		sendMsg(){
			this.showMsgButton=false;
			const self = this;//保存当前的self对象
			let namePass
			let emailPass
			
			//获取DOM元素的ruleForm对象，验证用户名有没有通过校验，这步验证写法是element-ui提供的参考文档
			this.$refs['ruleForm'].validateField('name',(valid)=>{
				namePass = valid;//valid有值表示错误
			})
			self.statusMsg = '';
			if(namePass){return false}//如果namePass没有通过返回false程序不再往下走，如果通过的话valid是没有值的
			
			//通过了继续检查emali
			this.$refs['ruleForm'].validateField('email',(valid)=>{
				emailPass = valid;//valid有值表示错误
			})
			if(!namePass && !emailPass){//所以这里取反代表正确
				//发送
				//把axios挂到vue实例上了，可以直接$axios用
				self.$axios.post('/users/verify',{
					username:encodeURIComponent(self.ruleForm.name),//对它进行encodeURIComponent编码，为了处理中文，否则在服务端收到的是乱码
					email:self.ruleForm.email//因为是v-model双向绑定的所以这样写可以拿到name和email的值
				}).then(({status,data})=>{//解构赋值
					if(status === 200 && data && data.code === 0){
						let count = 60;
						self.statusMsg = `验证码已发送,剩余${count--}秒`
						self.timerid = setInterval(function(){
							self.statusMsg = `验证码已发送,剩余${count--}秒`
							if(count===0){
								clearInterval(self.timerid)
								self.showMsgButton=true;
								self.statusMsg="";
							}
						},1000)
					}else{
						self.statusMsg = data.msg;
					}
				})
			}
			
		},
		register(){
			let self = this;
			//validate()nuxt生命周期中配合高级动态路由做一些验证，这个页面允不允许跳到这个页面来，如果不允许我让它跳走
			this.$refs['ruleForm'].validate((valid)=>{
				if(valid){
					self.$axios.post('/users/signup',{//promise回调的方式
						username:window.encodeURIComponent(self.ruleForm.name),
						password:CryptoJS.MD5(self.ruleForm.pwd).toString(),
						email:self.ruleForm.email,
						code:self.ruleForm.code
					}).then(({status,data})=>{
						if(status === 200){
							if(data && data.code === 0){
								location.href='/login'
							}else{
								self.error = data.msg
							}
						}else{
							self.error = `服务器出错，错误码：${status}`
						}
						setTimeout(function(){
							self.error = ''
						},1500)
					})
				}
			})
		},
		resetForm(formName) {
        	this.$refs[formName].resetFields();
      	}
	},
	computed:{},
	components:{}
}
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>





















