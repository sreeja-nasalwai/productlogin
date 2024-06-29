const mongoose=require('mongoose');
const orderModel = require('./order.model');
const cartModel = require('./cart.model');
//const bcrypt = require("bcryptjs");
const user_schema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    username:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:Number,
        
    },
    active:{
        type:Boolean,
       
    },
    role:{
        type:String,
        default:"user",
    },
    cart:{
        
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    
        
    },
    ordersList:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }
    
});
// user_schema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 12);
//     console.log(bcrypt.hash(this.password, 12));
//   });

const userModel=mongoose.model("User",user_schema);
module.exports=userModel;