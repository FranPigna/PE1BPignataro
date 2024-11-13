import { Router } from "express";
import { productsManager } from "../managers/products-manager.js";
import validateProduct from '../middlewares/validateProduct.js';


const prodRouter = Router();


prodRouter.get('/', async (req, res) => {
    try {
        const products = await productsManager.getAllProd();
        const { limit } = req.query;
        const limitedProducts = limit ? products.slice(0, parseInt(limit)) : products;
        res.status(200).json(limitedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


prodRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsManager.getProdById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

prodRouter.post('/', validateProduct, async (req, res) => {
    try {
        const newProduct = await productsManager.createProduct({
            ...req.body,
            thumbnails: req.body.thumbnails
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

prodRouter.put('/:pid', validateProduct, async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await productsManager.updateProd(pid, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

prodRouter.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await productsManager.deleteProd(pid);
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


export default prodRouter;