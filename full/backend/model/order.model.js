const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
    orderId:{
        type:String,
        required:true,
    },
  userId: { type: String, required: true },
    items: [{
        productId: String,
        productName: String,
        quantity: {
                type:Number,
                default:1,
            },
        price: Number
    }],
    total: { type: Number, required: true },
    status: { type: String, default: 'Processing' },
    // userId:{
    //     type:String,
    //     required:true,
    // },
    // productName:String,
    // quantity:{
    //     type:Number,
    //     default:1,
    // },
    // totalPrice:String,
    // status:String,
    // price:String
});
const orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel;