Daemon does the following things

1. At regular intervals, wakes up.
2. Collects list of symbols from db.
3. For each symbol, fetches current trading value/price.
4. Create one new notification for every alert that has price less than or equal to current price. 
