import mongoose from 'mongoose';
import * as schema from './schema.js';

const connectToDB = () => {
    const connStr = "mongodb+srv://test456:bqHMV4xP79y61bza@testcluster.gvlfa.mongodb.net/stock-ticker?retryWrites=true&w=majority";
    let connection = null;
    
    try{
       connection = mongoose.connect(connStr);
    }
    catch(err){
        console.log("connection to db failed. ", err);
    }
    return connection;
}

const getAllStocks = (mongooseConn) => {
    //connect to db 
    console.log("invoking getAllStocks..");
    let stockModel= mongooseConn.model('stock', schema.stockPrice);
    let query= stockModel.find({});
     query.exec((err, stocks) =>{
         if (err){
             return res.send("error: ", err);
         }

         return res.send({msg: stocks});
     });
}


//decide how gets notified
const saveNotificationAlerts = () => {
    console.log("invoking saveNotificationAlerts..");
}

/**
 * 
 daemon pings db for a bunch of symbols
 make an entry for all symbols that have changed based on rules
 in notifications table
 */
const db = {
    getAllStocks, 
    connectToDB}

export default db;