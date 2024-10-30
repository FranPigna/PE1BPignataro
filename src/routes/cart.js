const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cartsFilePath = path.join(__dirname, '../carts.json');

const readCarts = () => {
    const data = fs.readFileSync(cartsFilePath);
    return JSON.parse(data);
};

router.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cartId);
    
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    
    const cart = carts.find(c => c.id === cartId);
    
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const existingProduct = cart.products.find(p => p.product === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const newProduct = { product: productId, quantity: 1 };
        cart.products.push(newProduct);
    }

    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2)); 
    res.status(200).json(cart.products);
});

module.exports = router;

