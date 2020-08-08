const stockupdater = require('./stock-updater.js');
const {getStockPrice, getMatchingAlerts, getUserDetails, addNotification, addNotifications} = stockupdater; 

describe('alerts notifications', ()=>{
    it("adds notifications", ()=> {
        expect(addedNotifications()).toBeCalledTimes(1);
    })

    it("add one notification", ()=>{
        const addedOneNotification = addNotification();
        expect(addNotification()).toEqual();
    })

    it("get symbols that match alerts", ()=>{
        expect(getAllSymbolsWithAlerts()).toEqual();
    })
});

describe('user details',()=>{
    it("returns list of symbols",()=>{
        const user = getUserDetails();
        expect(user.id).toEqual(100);
    });
});

describe('symbols',()=>{
    it("get stock price for symbol",()=>{
        const stockPrice = getStockPrice('test');
        expect(stockPrice).toEqual(100.00);
    });

    it("get all stocks with alerts", async ()=>{
        const alerts = await getMatchingAlerts('abc'); console.log(alerts);
        expect(alerts).toEqual([]);
    });
});

/*
describe('',()=>{
    it("",()=>{
        expect();
    });
});
*/