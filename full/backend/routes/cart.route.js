const express = require('express');
const routes = express.Router();
// const cartModel=require("../model/cart.model");
const { addToCart, showCart, deleteCartItem } = require('../controller/cart.controller');
routes.post('/home/:id',addToCart)
routes.get('/cart/:id',showCart)
routes.post('/cart/delete',deleteCartItem)
module.exports=routes