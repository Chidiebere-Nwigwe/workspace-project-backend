

const express = require('express');
const userRoute = express.Router();

const verify = require('./tokenVerification');

//const userInfo = require('../controllers/userControls/userInfo');
//const  userLogin  = require('../controllers/userControls');
const { userInfo, userLogin } = require('../controllers/userControls');

userRoute.post('/register',verify,userInfo);
userRoute.post('/userLogin',verify,userLogin);

module.exports = userRoute;




