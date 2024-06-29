require('dotenv').config()
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const userRoutes=require('./routes/user.route');
const productRoutes=require('./routes/product.route');
const adminRoutes1=require('./routes/admin.route');
const cors=require('cors');
app.use(cors());
const port=process.env.PORT;
const mongoose=require('mongoose');
const { getProduct,productEditData } = require('./controller/product.controller');

//mongoose.connect('mongodb+srv://vivek04:jpmc123@product.qvtx8yu.mongodb.net/jpmc')
mongoose.connect('mongodb://localhost:27017/Project')
.then(()=>console.log("connection successful"));
app.use('/user',userRoutes);
app.use('/admin',adminRoutes1);
// app.use('/signup',saveUser);
// app.use('/login',checkUser);
// app.get('/get', getProduct);
// app.get('/productEdit/:id', productEditData);
app.listen(port);
