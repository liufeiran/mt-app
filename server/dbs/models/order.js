import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Order = new Schema({
  id: {
    type: String,
    require: true//必须项
  },
  user:{//用户
    type:String,
    require:true
  },
  time:{//订单创建的时间
    type:String,
    require:true
  },
  total:{//支付的金额
    type:Number,
    require:true
  },
  imgs:{//商品的图片
    type:Array,
    require:true
  },
  name:{//商品的名称
    type:String,
    require:true
  },
  status:{//状态：待付款，已使用，待评价
    type:Number,
    require:true
  }
})

export default mongoose.model('Order', Order)
