const productmodel=require('../model/product.model');

async function postProduct(req,res){
    try{
    const {productId,imageUrl,productName,price,color,type,description,quantity}=req.body;
    const product=await productmodel.create({
        _id:productId,imageUrl,productName,price,color,type,description,quantity
    });
    res.status(200).json(product);
}
catch(error){
    res.status(400).json({"message":"product details invalid"});
}
}
async function productEditData(req,res){
    
    const {id}=req.params;
    const products=await productmodel.findById(id);
    if(!products){
        res.status(300).json("error");
    }
    else{
        
        res.status(200).json(products);
    }
}
async function getProduct(req,res){
    
    const products=await productmodel.find({});
    res.status(200).json(products);
}
async function productEditSave(req,res){
    const {id}=req.params;
    const products=await productmodel.findByIdAndUpdate(id,req.body);
    if(!products){
        res.status(300).json("error");
    }
    else{
        const updatedProduct=await productmodel.findById(id);
        res.status(200).json(updatedProduct);
    }
}

async function productDelete(req,res){
    const {id}=req.params;
    const product=await productmodel.findByIdAndDelete(id);
    res.status(200).json({"message":`product with id ${product} is deleted`})
}
module.exports={postProduct,getProduct,productEditData,productDelete,productEditSave};
