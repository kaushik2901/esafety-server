const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//###################################################
const config = require('./config');
const routes = require('./routes');
//###################################################

//Creating server
const app = express();

//Configuring server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Home API point
app.get('/', function (req, res) {
    res.json({
        success: true,
        message: 'WELCOME TO HOME PAGE OF E-SAFETY API',
        time: new Date()
    });
});

//End points
routes(app);

//Configuring Database Connection
mongoose.connect(config.MONGODB_CONN_STRING, { useCreateIndex: true, useNewUrlParser: true });
const db = mongoose.connection;
mongoose.Promise = global.Promise;

//Error on database connection
db.on('err', () => {
    console.error("Error connecting database");
});

db.once('open', () => {
    //Running server
    app.listen(config.SERVER_PORT, () => {
        console.log("Server is running at " + config.SERVER_PORT);
    });
});