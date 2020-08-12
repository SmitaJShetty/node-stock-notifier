
const DeleteAlert = (id) =>{
    console.log("deleteAlert called");
    return {response:"alert deleted"};
}

const AddAlert = (alert) =>{
    console.log("addAlert called");
    return {response:"alert added"};
}

const UpdateAlert = (alert) =>{
    console.log("updateAlert called");
    return {response:"alert updated"};
}

const FetchAlerts = (alert) =>{
    console.log("FetchAlerts called");
    return [{id:"abc", symbol:"abc", price:100.00},{id:"dfh",symbol:"dfh", price:200.00}]
}

export default {
    DeleteAlert,
    AddAlert,
    UpdateAlert,
    FetchAlerts
}