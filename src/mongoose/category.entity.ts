import mongoose from "mongoose";
import { Types } from "mongoose";

export const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
});

export interface Category {
    name: string,
    image: string,
}