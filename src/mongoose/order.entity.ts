import mongoose, { Model } from "mongoose";
import { Types } from "mongoose";
import { counterModel } from "./counter.entity.js";

export const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    items: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            count: {
                type: Number,
                required: true,
            }
        }
    ],
    deliveryLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String },
    },
    pickupLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String },
    },
    deliveryPersonLocation: {
        latitude: { type: Number },
        longitude: { type: Number },
        address: { type: String },
    },
    status: {
        type: String,
        enum: ['available', 'confirmed', 'arriving', 'delivered', 'cancelled'],
        default: 'available',
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export interface Order {
    orderId: string,
    customer: Types.ObjectId,
    deliveryPartner: Types.ObjectId,
    branch: Types.ObjectId,
    items: Array<{ id: Types.ObjectId, item: Types.ObjectId, count: number }>,
    deliveryLocation: { latitude: number, longitude: number, address: string },
    pickupLocation: { latitude: number, longitude: number, address: string },
    deliveryPersonLocation: { latitude: number, longitude: number, address: string },
    status: string
    totalPrice: number,
    createdAt: Date,
    updatedAt: Date,
}

async function getNextSequenceValue(sequenceName: string) {
    const sequenceDOcument = await counterModel.findOneAndUpdate(
        { name: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: false }
    );
    return sequenceDOcument.sequence_value;
}

OrderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const sequence_value = await getNextSequenceValue("orderId");
        this.orderId = `ORDR${sequence_value.toString().padStart(5, '0')}`;
    }
    next();
});