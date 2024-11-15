import mongoose from "mongoose";
import { Types } from "mongoose";

export const BranchSchema = new mongoose.Schema({
    name: { type: String },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    address: {
        type: String,
    },
    deliveryPartners: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'DeliveryPartner',
        }
    ]
});

interface Location {
    latitude: number;
    longitude: number;
}

export interface Branch {
    name: string,
    location: Location,
    address: string,
    deliveryPartners: Types.ObjectId[]
}