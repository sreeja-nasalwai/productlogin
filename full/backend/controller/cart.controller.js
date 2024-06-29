const cartModel = require('../model/cart.model');
const productModel = require('../model/product.model');

async function addToCart(req, res) {
    const { userId, productId, quantity } = req.body;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ "message": "Product not found" });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({ "message": "Out of Stock" });
        }
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }
        const cartIndex = cart.items.findIndex(item => item.productId === productId);

        if (cartIndex > -1) {
            cart.items[cartIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId: product.productId,
                productName: product.productName,
                quantity,
                price: product.price
            });
        }
        await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (err) {
        res.status(500).send('An error occurred while adding to the cart');
    }
}

async function showCart(req, res) {
    const { userId } = req.params;
    try {
        const cart = await cartModel.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ 'message': 'cart is empty' });
        }
        res.status(200).json(cart.items);
    } catch (err) {
        res.status(500).send('An error occurred while displaying the cart');
    }
}

async function deleteCartItem(req, res) {
    const { userId } = req.params;
    try {
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(200).json({ 'message': 'cart does not exist' });
        }
        cart.items = [];
        await cart.save();
        res.status(200).json({ 'message': 'cart cleared successfully' });
    } catch (err) {
        res.status(500).send('An error occurred while clearing the cart');
    }
}

module.exports = { addToCart, showCart, deleteCartItem };
