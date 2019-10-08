const express = require('express');
const {Customer,validate} = require('../models/customer');
const mongoose = require('mongoose');
var router = express.Router();


router.get('/',async (req,res)=>{
	const customers = await Customer.find().sort('name');
	res.send(customers);
})

router.put('/:id',async (req,res)=>{
      const { error } = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
	Customer.findByIdAndUpdate(req.params.id,{
		name:req.body.name,
		phone:req.body.phone
	},
	{
		new:true
	},(err,result)=>{
		  if(err) return req.status(404).send('Customer with given id not found');
		  return res.send(result);
	}

	)
})

router.post('/',async (req,res)=>{

	  const { error } = validate(req.body);

	  if(error) return res.status(404).send("Please enter correct data");
	   let customer = new Customer(
	   	{
	   		name:req.body.name,
	   		phone:req.body.phone
	   	 }
	   	)

	   await customer.save();
	   res.send(customer);
})

router.delete('/:id',async (req,res)=>{
	  const customer = await Customer.findByIdAndRemove(req.params.id,(error,result)=>{

	  	  if(error) return res.status(404).send("customer not found");
	  	  return res.send(result);
	  });

	  
})

router.get('/:id',async (req,res)=>{
const customer = await Customer.findById(req.params.id,(error,result)=>{
	   	  if(error) return res.status(404).send('Customer not found ');
	   	     res.send(result);
	   });
	 // if(!customer) res.status(404).send("Customer with provided id not found ");
	   // res.send(customer);
})







module.exports = router;

