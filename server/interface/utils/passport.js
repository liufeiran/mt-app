import passport from 'koa-passport'//koa的passport
import LocalStrategy from 'passport-local'//本地策略
import UserModel from '../../dbs/models/users.js'//引入模型，为了查用户表

passport.use(new LocalStrategy(async function(username,password,done){
	let where = {
		username
	};
	let result = await UserModel.findOne(where)//mongoose操作mongodb的一个方法，数组方法findOne找到第一个符合的放在对象
	if(result!=null){
		if(result.password===password){//result.password是对应的库里查出来的密码与用户输入的密码比较
			return done(null,result)//验证成功
		}else{
			return done(null,false,'密码错误')
		}
	}else{
		return done(null,false,'用户不存在')
	}
}))

//序列化，库里封装好的api
passport.serializeUser(function(user,done){//库里的函数serializeUser
	done(null,user)
})

//反序列化，库里封装好的api
passport.deserializeUser(function(user,done){//库里的函数deserializeUser
	return done(null,user)
})


export default passport






