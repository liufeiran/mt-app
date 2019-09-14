import mongoose from 'mongoose'//导入

//两句可以并成一句：const UserSchema = new mongoose.Schema({})
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	username:{
		type:String,//类型
		unique:true,//唯一
		require:true,//必须项
	},
	password:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	}
})

export default mongoose.model('User',UserSchema)//导出
