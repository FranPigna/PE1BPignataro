const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFilePath = path.join(__dirname, '../products.json');

const readProducts = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

router.get('/', (req, res) => {
    const products = readProducts();
    const limit = parseInt(req.query.limit);
    
    if (!isNaN(limit)) {
        return res.json(products.slice(0, limit));
    }
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const products = readProducts();
    const productId = parseInt(req.params.pid);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        return res.json(product);
    }
    res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', (req, res) => {
    const products = readProducts();
    
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || typeof price !== 'number' || typeof stock !== 'number' || !category) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
        id: newId,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails || [], 
        status: true 
    };

    products.push(newProduct);
    
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const products = readProducts();
    const productId = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { title, description, code, price, stock, category, thumbnails } = req.body;

    const updatedProduct = {
        ...products[productIndex],
        title: title || products[productIndex].title,
        description: description || products[productIndex].description,
        code: code || products[productIndex].code,
        price: price !== undefined ? price : products[productIndex].price,
        stock: stock !== undefined ? stock : products[productIndex].stock,
        category: category || products[productIndex].category,
        thumbnails: thumbnails !== undefined ? thumbnails : products[productIndex].thumbnails,
    };

    products[productIndex] = updatedProduct;

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); 
    res.json(updatedProduct);
});

router.delete('/:pid', (req, res) => {
    const products = readProducts();
    const productId = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    products.splice(productIndex, 1);
    
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); 
    res.status(204).send(); 
});

module.exports = router;
