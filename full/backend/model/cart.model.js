const mongoose=require('mongoose');
const userModel = require('./signup.model');
const cartSchema=mongoose.Schema({
    cartItemId:{
        type:String,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    items:[{
        productId:Number,
        productName:String,
        quantity:{
            type:Number,
            default:1,
        },
        price:String
    }]
});
const cartModel=mongoose.model("Cart",cartSchema);
module.exports=cartModel;