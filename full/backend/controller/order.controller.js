const orderModel = require('../model/order.model');
const productModel = require('../model/product.model');
const cartModel = require('../model/cart.model');
async function enter(req, res) {
    try {
        const { userId, orderId, productName, quantity, totalPrice, status, price } = req.body;
        const order = await orderModel.create({
            userId, orderId, productName, quantity, totalPrice, status, price
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ "message": "Invalid Order" });
    }
}
async function getUserProducts(req, res) {
    try {
        const userId = req.params.userId;
        const orders = await orderModel.find({ userId }).exec();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function placeOrder(req, res) {
    try {
        const { userId, cartItems } = req.body;
        let totalPrice = 0;
        for (const item of cartItems) {
            const product = await productModel.findOne({ productName: item.productName });
            if (!product || item.quantity > product.quantity) {
                return res.status(404).json({ message: `Out of Stock: ${item.productName}` });
            }
            totalPrice += item.price * item.quantity;
        }

        for (const item of cartItems) {
            await productModel.updateOne(
                { productName: item.productName },
                { $inc: { quantity: -item.quantity } }
            );
        }
        const order = new orderModel({
            userId,
            items: cartItems,
            totalPrice,
            status: 'Processing'
        });
        await order.save();
        
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { enter, getUserProducts, placeOrder };
