import * as schema from './schema.js';
import * as notifSchema from '../notifier/models/notification.js';

import mongoose from 'mongoose';
import db from './db.js';
import { error } from 'console';

// const schema = require('./schema');
// const mongoose = require('mongoose');

// ------------- PRODUCTION -------------------
//fetch all stocks in db
//invoke external api to get new prices
//update mongodb cloud db with new values
const TimeInterval = 5 * 1000;
const mongoConn = db.connectToDB();

//get all alerts for this symbol that are less than the current price
const AddStockNotifications = async () => {
    const symbolObjs = await getAllSymbolsWithAlerts();
    
    symbolObjs.forEach(async(symbolObj)=> {
        const symbol = symbolObj?.symbol;
        if (symbol=== undefined){
            return error("symbol object was empty");
        }
        const newPrice = getStockPrice(symbol); 
        const matchingAlerts = await getMatchingAlerts(symbol, newPrice); 
    
        if (matchingAlerts === []){
            return "no matching alerts";
        }
        
        //start series of updates
        addNotifications(symbol, matchingAlerts, newPrice);
    }); 
}

//fetch all symbols in db that have alerts setup for them
const getAllSymbolsWithAlerts = async() =>{
    const s = mongoose.model("symbols", schema.default.stockSchema);
    return await s.find({}).exec();
}

//Prod version: get latest price from external api, dev: generate a random number 
const getStockPrice = (symbol) =>{
    //generate a random number for stock price
    if (symbol === 'test'){ return 100.00;}
    return 400; //Math.round(Math.random()*Math.floor(100));
}

//get all alerts whose price is less than the current price
const  getMatchingAlerts = async(symbol, newPrice) =>{
    const alertModel =mongoose.model("alerts", schema.default.alertSchema);  
    const query = alertModel.find({"symbol":symbol});
    return query.exec();
}

//adds notifications for all alerts
const addNotifications = (symbol, matchingAlerts, newPrice) =>{
    matchingAlerts.forEach((alert)=>{
         if (alert === undefined) {
            util.handleError("alert was undefined");
            return;
         }
        addNotification(alert,newPrice)
    })
}

//add notification for alert
const addNotification = async (alert, currentPrice) => {
    //adds a new notification
    console.log("add a new notification record"); 
    let n = mongoose.model("notifications", notifSchema.default); 
    let foundNotification = null;
    const symbol = alert.symbol;

    //find the notification if it exists for that symbol and current price
    const notifns = await n.find({currentPrice, symbol}).exec();

    //check if notification has been sent
    if (hasNotificationBeenSentInInterval(TimeInterval, notifns)){
        console.log("notification has been sent to the user in the timeinterval");
        return;
    }

    //get user details
    const userDetails = getUserDetails(alert?.userId);

    const notifModel = mongoose.model("notifications",notifSchema.default);
    let newNotification = getNewNotificationObject(notifModel, symbol, currentPrice, userDetails);
    await newNotification.save(function(err){
        console.log("err:", err);
    });
}

//fetch user details
const getUserDetails = (userId) => {
    //todo: wire this with user api
    return {
        id: 100, 
        name: "Joe Plumber",
        dob: "01-01-1989",
        userName: "JoeMoe",
        email: "joemoe@test.com",
    };
}

const getNewNotificationObject = (notif, symbol, currentPrice, userDetails) =>{
    const notification= notif({
        symbol: symbol,
        price: currentPrice, 
        userId: userDetails.id,
        userName: userDetails.userName,
        userEmail: userDetails.email,
        updatedDate: Date.now(),
        createdDate: Date.now()
    });
    return notification;
}

const hasNotificationBeenSentInInterval = (timeInterval, notification) => {
    return timeInterval > (notification.lastUpdatedDate - Date.now());
}

const stockUpdater = {
    getNewNotificationObject,
    getUserDetails,
    addNotification,
    AddStockNotifications,
    getAllSymbolsWithAlerts,
    getMatchingAlerts,
    getStockPrice,
    addNotifications,
    hasNotificationBeenSentInInterval
}

// module.exports = stockUpdater;

export default stockUpdater;

