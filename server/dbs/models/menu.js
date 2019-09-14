import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Menu = new Schema({
  menu: {
    type: Array,
    require: true//必须项
  }
})

export default mongoose.model('Menu', Menu)
