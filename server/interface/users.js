import Router from 'koa-router'  //引入koa的路由
import Redis from 'koa-redis'  //多人同时注册，发出去的验证码与用户名对应
import nodeMailer from 'nodemailer'  //smtp给邮箱发邮件

import User from '../dbs/models/users.js'  //把刚才建立的用户模型导进来
import Passport from './utils/passport.js'
import Email from '../dbs/config.js'
import axios from './utils/axios.js'

let router = new Router({prefix:'/users'})//接口前缀

let Store = new Redis().client

//注册的接口，用post比用get接口安全一些
router.post('/signup',async (ctx)=>{
	//post方式如何获取到post方式上传的数据，就要用ctx.request.body
	const {username,password,email,code} = ctx.request.body;//用解构赋值得到
	
	if(code){//如果有写验证码
		const saveCode = await Store.hget(`nodemail:${username}`,'code')//发的验证码是和这个用户名绑定的
		const saveExpire = await Store.hget(`nodemail:${username}`,'expire')//不想让验证码无限的有效，一分钟内有效
		
		if(code===saveCode){//拿到你传上来的验证码和我取出来的验证码作比较
			//如果相等我再验证过期时间，如果不符合下面判断体小于0，说明时间没过期，跳出整个判断体代码向下继续执行
			if(new Date().getTime()-saveExpire > 0){//大于0过期，超过1分钟验证码失效
				ctx.body={
					code:-1,
					msg:'验证码已过期，请重新尝试'
				}
				return false
			}
		}else{//验证码不相等
			ctx.body={
				code:-1,
				msg:'请填写正确的验证码'
			}
			return false
		}
	}else{//没有写验证码时，拦截
		ctx.body={
			code:-1,
			msg:'请填写验证码'
		}
		return false
	}
	
	let user = await User.find({//查用户名
		username
	})
	if(user.length){//如果能查到，说明已经被注册了，没有被注册不会走里面，继续往下走
		ctx.body={
			code:-1,
			msg:'已被注册'
		}
		return false
	}
	
	//走到这里说明，验证码通过了，用户名也没有重名，下面进行写入库的操作
	let nuser = await User.create({
		username,password,email
	})
	if(nuser){//如果这个成功了，可以进行登录的动作
		let res = await axios.post('/users/signin',{
			username,password
		})
		if(res.data && res.data.code === 0){
			ctx.body={
				code:0,
				msg:'注册成功',
				user:res.data.user
			}
		}else{
			ctx.body={
				code:-1,
				msg:'error'
			}
		}
	}else{//这里如果写库都写失败了，返回注册失败
		ctx.body={
			code:-1,
			msg:'注册失败'
		}
	}
	
})

//登录的接口
router.post('/signin',async (ctx,next)=>{
	return Passport.authenticate('local',function(err,user,info,status){
		if(err){
			ctx.body={
				code:-1,
				msg:err
			}
		}else{
			if(user){
				ctx.body={
					code:0,
					msg:'登录成功',
					user
				}
				return ctx.login(user)//做一个登录的动作
			}else{//没有user，异常，把异常返回给客户端
				ctx.body={
					code:1,
					msg:info
				}
			}
		}
	})(ctx,next)//必须让这个函数执行一下，把当前上下文对象传递到api，api规定的
})

//验证码验证
router.post('/verify',async (ctx,next)=>{
	let username = ctx.request.body.username;  //获取用户名
	const saveExpire = await Store.hget(`nodemail:${username}`,'expire');  //获取过期时间
	//判断过期时间是否存在并且是否在限定时间内，限制他频繁刷接口，小于1分钟不能再次获取验证码
	if(saveExpire && new Date().getTime() - saveExpire < 0){  
		ctx.body={
			code:-1,
			msg:'验证请求过于频繁，1分钟1次'
		}
		return false
	}
	
	//发送的对象
	let transporter = nodeMailer.createTransport({
		host:Email.smtp.host,
		port:587,
		secure:false,
		auth:{
			user:Email.smtp.user,
			pass:Email.smtp.pass
		}
	})
	
	//要接收的一些信息
	let ko = {
		code:Email.smtp.code(),//验证码
		expire:Email.smtp.expire(),//过期时间
		email:ctx.request.body.email,//邮箱
		user:ctx.request.body.username//用户名
	}
	
	//发送邮件要显示的内容
	let mailOptions = {
		from:`"认证邮件"<${Email.smtp.user}>`,
		to:ko.email,
		subject:'《高仿美团网全栈实战》注册码',
		html:`您在《高仿美团网全栈实战》课程中注册,您的邀请码是${ko.code}`
	}
	
	//发送
	await transporter.sendMail(mailOptions,(error,info)=>{
		if(error){
			return console.log('error')
		}else{
			Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
		}
	})
	
	//最终这个接口要有个响应
	ctx.body={
		code:0,
		msg:'验证码已发送，可能会有延时，有效期1分钟'
	}
})

//退出
router.get('/exit',async (ctx,next)=>{
	await ctx.logout();//注销，可能是内部方法
	//二次验证，看他有没有成功注销掉
	if(!ctx.isAuthenticated()){//检查现在是不是登录状态，isAuthenticated是passport内部定义的方法
		ctx.body={
			code:0
		}
	}else{
		ctx.body={
			code:-1
		}
	}
})

//获取用户名
router.get('/getUser',async (ctx)=>{
	if(ctx.isAuthenticated()){//如果是登录状态，把它的用户名取出来
		const {username,email} = ctx.session.passport.user  //passport是存储在ctx.session中的，登录状态下session中一定有passport
		ctx.body={
			user:username,
			email
		}
	}else{
		ctx.body={
			user:'',
			email:''
		}
	}
})

//导出路由接口
export default router





















