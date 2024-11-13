import { Router } from "express";
import { cartManager } from "../managers/cart-manager.js";

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        res.json(await cartManager.createCart());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

cartRouter.get('/', async (req, res) =>{
    try {
        res.json(await cartManager.getAllCarts());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        res.json(await cartManager.getCartById(cid));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        res.json(await cartManager.addToCart(cid, pid));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


export default cartRouter;