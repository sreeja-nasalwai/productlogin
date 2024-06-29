const express = require('express');
const cookieParser = require('cookie-parser');
const productmodel = require('../model/product.model');
const { saveUser, checkUser } = require('../controller/admin.controller');
const { authenticateToken } = require('../middleware/admin.middleware');
const { getProduct, productEditData, productDelete, productEditSave, postProduct } = require('../controller/product.controller');

const router = express.Router();


router.use(express.json());
router.use(cookieParser());
router.get('/get', getProduct);
router.get('/productEdit/:id', productEditData);

router.delete('/delete/:id', productDelete);
router.post('/addProduct', postProduct);
router.patch('/productEdit/:id', productEditSave);
router.post('/signup', saveUser);
router.post('/login', checkUser);

module.exports = router;

