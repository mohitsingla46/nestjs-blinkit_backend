import mongoose from "mongoose";
import { Types } from "mongoose";

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    quantity: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

export interface Product {
    name: string,
    image: string,
    price: number,
    discountPrice: number,
    quantity: string,
    category: Types.ObjectId;
}