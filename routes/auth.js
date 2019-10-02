const express = require('express');
const router = express.Router();
const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/',async (req,res)=>{

	  const {error} = validate(req.body);
	  if(error) res.status(400).send(error.details[0].message);

	  let user = await User.findOne({email:req.body.email});

	  if(!user){
	  	  return res.status(400).send('Invalid email or password');
	  }

	  const validPassword = await bcrypt.compare(req.body.password, user.password);
	  

	  if(!validPassword) return res.status(400).send('Invalid email or password');

	  const token = user.generateAuthToken();
	  res.send(token);
	  
    

    

})


function validate(request){
	  const schema = {
	  	  
	  	  email: Joi.string().min(5).max(255).required().email(),
	  	  password: Joi.string().min(5).max(255).required()
	  }

	  return Joi.validate(request,schema);
}


module.exports = router;


