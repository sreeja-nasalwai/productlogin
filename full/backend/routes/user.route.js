const express=require('express')
const routes=express.Router()
routes.use(express.json());
//signup routes
const {saveUser,checkUser}=require('../controller/admin.controller')
routes.post('/signup',saveUser);
routes.post('/login',checkUser);
//product routes
const {getProduct,productEditData}=require('../controller/product.controller');
routes.get('/',getProduct);
routes.get('/:id',productEditData);
//cart routes
const { addToCart, showCart, deleteCartItem }=require('../controller/cart.controller');
routes.post('/home/:id',addToCart)
routes.get('/cart/:id',showCart)
routes.post('/cart/delete',deleteCartItem)
//order routes
const {enter,getUserProducts,placeOrder} = require('../controller/order.controller');
routes.get('/user',enter)
routes.post('/order/:userId',getUserProducts)
routes.post('/order/cart',placeOrder)

module.exports=routes
