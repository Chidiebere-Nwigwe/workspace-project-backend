//importing models
const userModels = require('../models/userModel');
//const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcrypt');

require('dotenv').config();


//for token
const jwt = require('jsonwebtoken');

//For Validation
const Joi = require('@hapi/joi');
//const userModel = require('../models/userModel');

//register validation
//const registerValidation = () =>{

const TOKEN_SECRET = process.env.TOKEN_SECRET;


const registerValidationSchema = Joi.object({
   name: Joi.string().min(3).required(),
   email:Joi.string().max(250).min(8).required().email(),
   password: Joi.string().min(8).required()
});
  //return schema.validate(data);
//};

//login validation
//const loginValidation = () => {

   const loginValidationSchema = Joi.object({
       email:Joi.string().max(250).min(8).required().email(),
       password: Joi.string().min(8).required()
    });
      //return schema.validate(data);
//}







const userInfo = async (req, res) => {
   //const {error} = schema.validate(req.body);
   const {error} = registerValidationSchema.validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

//for checking if user exists in the database
const existingEmail = await userModels.findOne({email: req.body.email});
if(existingEmail) return res.status(400).send('Email already exists');

//for hashing the password
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password, salt);


//For creating a new user
   const userModel = new userModels({
      name: req.body.name,
      email: req.body.email,
      //password: req.body.password
      password: hashPassword
   });


   //for catching errors
   try{

      const savedUser = await userModel.save();
      res.send(savedUser);

   }catch(err){

      res.status(400).send(err)
   }

};



const userLogin = async (req,res) => {

 /*//const {error} = schema.validate(req.body);
   const {error} = loginValidationSchema.validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

//for checking if user exists in the database
const user = await userModels.findOne({email: req.body.email});
if(!user) return res.status(400).send('Email does not exist');

if (!user.password) return res.status(400).send('Password not set');
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password, salt);


//checking if password is correct
const validPassword = await bcrypt.compare(req.body.password, userModels.password,hashPassword)
if(!validPassword) return res.status(400).send('Invalid password');

res.send('logged In!')*/

const { error } = loginValidationSchema.validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // Check if user exists
   const user = await userModels.findOne({ email: req.body.email });
   if (!user) return res.status(400).send('Email does not exist');

   // Compare passwords
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send('Invalid password');

   //Create and assign token
   const token = jwt.sign({_id: user._id},TOKEN_SECRET);
   res.header('userToken',token).send(token);

   // Password is valid, user can log in
   //.send('Logged In!');

};

module.exports = { userInfo, userLogin };