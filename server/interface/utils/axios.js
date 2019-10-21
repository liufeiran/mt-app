import axios from 'axios'
//你可以创建一个拥有通用配置的axios实例
const instance = axios.create({  //create方法是创建实例
	//设置基础的URL,判断当前环境变量主机如果没有默认locathost，:冒号后面是端口，环境变量的端口号或者3000
	baseURL:`http://${process.env.HOST || 'localhost'}:${process.env.POST || 3000}`,
	//baseURL:"http://${process.env.HOST || 'localhost'}:${process.env.POST || 3000}",
	timeout:20000,//设置超时
	headers:{//公共的头部，这里没用到写空
	}
})

export default instance  //导出模块，引用时为axios实例
