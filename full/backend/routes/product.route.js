const express=require('express');
const productmodel = require('../model/product.model');
const route=express.Router();
route.use(express.json());

const {getProduct,productEditData}=require('../controller/product.controller');


route.get('/',getProduct);
route.get('/:id',productEditData);
module.exports=route;