import mongoose, { Types } from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: { type: String },
    role: {
        type: String,
        enum: ['Customer', 'Admin', 'DeliveryPartner'],
    },
    isActivated: {
        type: Boolean,
        default: false,
    }
});

export const CustomerSchema = new mongoose.Schema({
    ...UserSchema.obj,
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['Customer'],
        default: 'Customer',
    },
    liveLocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    address: {
        type: String,
    }
});

interface LiveLocation {
    latitude: number;
    longitude: number;
}

export interface Customer {
    name: string,
    isActivated: boolean,
    phone: number;
    role: string
    liveLocation: LiveLocation;
    address: string;
}

export const DeliveryPartnerSchema = new mongoose.Schema({
    ...UserSchema.obj,
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['DeliveryPartner'],
        default: 'DeliveryPartner',
    },
    liveLocation: {
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
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
    }
});

export interface DeliveryPartner {
    name: string,
    isActivated: boolean,
    phone: number;
    role: string
    liveLocation: LiveLocation;
    address: string;
    branch: Types.ObjectId;
}

export const AdminSchema = new mongoose.Schema({
    ...UserSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin'],
        default: 'Admin',
    }
});

export interface Admin {
    name: string,
    isActivated: boolean,
    email: string,
    password: string,
    role: string
}