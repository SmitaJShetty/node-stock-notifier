import React, { Component } from 'react';
import {Button, Paper, Grid, TextField, Card, CardContent, CardHeader, CardActions} from '@material-ui/core';
import api from '../services/api.js';
import './alert-display.css';

const ContentForm = (props) =>{
return (
    //top search band
    <Card>
        <CardContent>
            <Search />  
        </CardContent>
 
        <CardContent className="alertlist">
            <AlertList alerts={props.alerts}/>
        </CardContent>
  
        <CardContent>
        <AlertForm  alerts={props.alerts} />
        </CardContent>
    </Card>
);

} 

const Header = () =>{
    return <div>
        header
    </div>
}

const Footer = () =>{
    return <div>
        Footer
    </div>
}
const AlertForm = (props)=> {
    const {isAdd}= props;
    return (
        <div>
            <Card class="alertform">
                <CardHeader>
                <h2 > {isAdd ?  "Add a new alert": "Update alert"}</h2>
                </CardHeader>
                <CardContent id="content card">
                    <form method="" action="">
                        <div >
                            <label htmlFor="symbol" name="symbol">Symbol</label>
                            <TextField id="symbol"></TextField>
                        </div>
                        <div>
                            <label htmlFor="price" name="price">Price</label>
                            <TextField id="price"></TextField>
                        </div>
                        <div>
                            <label htmlFor="fromDate" name="fromDate">From Date</label>
                            <TextField id="fromDate"></TextField>
                        </div>
                    </form>
                </CardContent>
                <CardActions>
                    <Button color="primary">{isAdd ?"Add":"Update"} Alert</Button>  
                </CardActions>
            </Card>
        </div>
    );
};

const Search =(props)=>{
    return(
        <div className="searchpanel">
            <label htmlFor="searchText" name="searchText">Search</label>
            <TextField id="searchText" ></TextField>
            <Button color="primary" outlined="true" label="Search" > Search</Button>
        </div>
    );
}

const deleteConfirmation = (props)=>{
    return (
        <div>
            <label>Are you sure you want to delete this alert?</label>
            <Button  onClick={props.onDelete}>Yes</Button>
            <Button onClick={props.onCancel}>No</Button>
        </div>
    );
}

const updateAlert = () =>{ 
    return AlertForm(false);
}

const deleteAlert = (alertId) =>{
    if (!deleteConfirmation()){
        return;
    }

    try{
        const response = api.DeleteAlert(alertId);
        setAlertDeletionAffirmation(alertId);
    }
    catch(ex){
        console.log(ex);
    }
}

const setAlertDeletionAffirmation = (id) =>{
    console.log("invoked setAlertDeletionAffirmation");
}

const AlertList = (props) =>{
    const {alerts} = props;
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Grid container justify="center" spacing={1}>
                    {alerts.map((alert)=>{
                        return <Grid key={alert} item> 
                            <Paper className="" ><AlertRow key={alert.id} item={alert} /></Paper>
                        </Grid>
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
}

const AlertRow = (alert) =>{
    return (
        <div>
            <ul>
                <li>
                    {alert.symbol}
                </li>
                <li>
                    {alert.price}
                </li>
                <li>
                    {alert.startDate}
                </li>
                <li>
                    {alert.endDate}
                </li>
                <li>
                    {alert.updatedDate}
                </li>
            </ul>
        </div>
    );
}


class OuterContainer extends Component<{},{}>{
    constructor(props){
        super(props);
        this.state={
            alerts:[],
        };
    }

    componentDidMount(){
        console.log("fetch api data");
        let alerts = null;
        try{
            alerts = api.FetchAlerts();
            console.log(alerts);
        } catch(ex){
            throw ex;
        }        

        this.setState({
            alerts,
        });
    }

    render(){
        return (
            <Card>
                <CardContent>
                    <Header />
                    <ContentForm alerts={this.state.alerts} />
                    <Footer />
                </CardContent>
            </Card>
        );
    }
}

export default OuterContainer;