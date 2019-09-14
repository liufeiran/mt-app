import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
  id: {
    type: String,
    require: true//必须项
  },
  detail: {//商品名称，单价，数量
    type: Array,
    require: true
  },
  cartNo: {//购物车本身id
    type: String,
    require: true
  },
  user: {//用户，购物车和用户是强关联
    type: String,
    require: true
  },
  time: {//跟踪购物车创建时间
    type: String,
    require: true
  }
})

export default mongoose.model('Cart', Cart)
