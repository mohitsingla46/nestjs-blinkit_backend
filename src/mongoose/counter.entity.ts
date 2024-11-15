import mongoose, { Model } from "mongoose";
import { Types } from "mongoose";

export const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    sequence_value: { type: Number, default: 0 },
});

export interface Counter {
    name: string,
    sequence_value: number,
}

export const counterModel = Model<Counter>;