export default{
	dbs:'mongodb://127.0.0.1:27017/student',//设置数据库的地址
	redis:{//设置为只读，不允许改这个地址
		get host(){//主机地址
			return '127.0.0.1'
		},
		get port(){//端口号
			return 6379
		}
	},
	smtp:{
		get host(){
			return 'smtp.qq.com'//用qq邮箱只能这样写
		},
		get user(){//用户名
			return '1540805447@qq.com'
		},
		get pass(){//授权码
			return 'llcaqtzjbuombadd'
		},
		get code(){//生产随机验证码
			return ()=>{
				return Math.random().toString(16).slice(2,6).toUpperCase();//随机数，转成16进制，取索引2到索引6（四个字符），转大写
			}
		},
		get expire(){//设置验证码过期时间
			return ()=>{  //这里返回的是一个函数，这样达到每次效果是一样的，不然这里就是常量了
				return new Date().getTime()+60*1000;  //1分钟
			}
		}
	}
}



























