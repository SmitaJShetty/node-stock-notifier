import * as sup from './stock-updater.js';
// const app = require('./stock-updater.js');

 sup.default.AddStockNotifications().then(()=>{
     console.log('finished adding notifications');
 });