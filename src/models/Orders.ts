import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true,
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

export const OrderItem = mongoose.model('OrderItem',orderItemSchema);

const orderSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],
    status:{
        type: String,
        required: true,
        default: 'Pending'
    },
    address:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

export const Order = mongoose.model('Order',orderSchema);
