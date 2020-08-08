import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
    id: String,
    userId: Number,
    symbol: String,
    price: Number,
    lastNotifiedDate: Date,
    updatedDate: Date, 
    createdDate: Date,
    userEmail: String,
    userName: String
});

export default notificationSchema;