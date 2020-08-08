import schema from './models/notification.js';
import util from '../util/util.js';

// process picks it up and sends out notices to all users 
//  who have to be alerted for those symbols

//sends out notification to users based on a decision made
const sendNotification = async (alert, symbol, newPrice) => {
    let userDetails = user.GetUserDetails(alert);
    //send notification
    let result=  await sendUserNotification(userDetails, symbol, newPrice, alert); 
    console.log("notification send result:", result);
}

const sendUserNotification = async (userDetails, symbol, newPrice, alert) => {
    //this has to send email or some othe type of alert
    console.log("sending user ", userDetails.userName, " notification for symbol:", symbol, "for alert set on ", alert.createDate);
}

const notificationModule = {
    sendUserNotification,
    sendNotification
}

export default notificationModule;