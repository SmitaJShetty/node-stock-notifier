// const mongoose = require("mongoose");
import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    id: String,
    name: String,
    symbol: String
});

const stockPriceSchema = new mongoose.Schema({
    id: String,
    name: String,
    symbol: String,
    price: Number
});

const alertSchema = new mongoose.Schema({
    id: String,
    userId: String,
    symbol: String,
    price: String,
    userEmail: String,
    userName: String,
    createdAt: Date
});

const schema = {
    stockSchema, 
    stockPriceSchema,
    alertSchema
}

// module.exports = schema;
export default schema;