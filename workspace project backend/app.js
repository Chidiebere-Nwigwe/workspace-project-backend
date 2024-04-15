//import express for usage
const express = require('express');
const app = express();
//const mongoose = require('mongoose');
//connect to the database
const myMongo = require('./mongodb');


//import the route
const router = require('./routes/route');



/*
mongoose.connect(process.env.mongodb_connect, () =>
console.log('connected to mongo db')
);
*/

app.use(express.json());
app.use('/', router);
myMongo();






//To start the server
PORT = process.env.port || 3000;
app.listen(PORT, () =>
console.log('server is running on port '+ PORT)
);