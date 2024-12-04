import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true},
    stock: {type: Number, required: true},
    category: { type: String, required: true},
    price: {type: Number, required: true},
});

export const ModelProduct = model("Products", ProductSchema);