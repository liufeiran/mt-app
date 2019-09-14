import mongoose from 'mongoose'
const Schema = mongoose.Schema
const City = new Schema({
	id:{
		type: String,
		require:true//必须项
	},
	value:{
		type:Array,
		require:true
	}
})

export default mongoose.model('City', City)
