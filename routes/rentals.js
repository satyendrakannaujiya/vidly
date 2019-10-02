const express = require('express');
const router = express.Router();
const {Rental,validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const Fawn = require('fawn');
const mongoose = require('mongoose');

Fawn.init(mongoose);


router.get('/',async (req,res)=>{
	   const rental = await Rental.find().sort('-dateOut');

	   res.send(rental);
})

router.post('/',async (req,res)=>{
	  const {error} = validate(req.body);
	  if (error) return res.status(400).send("Please enter correct details");
	  await Customer.findById(req.body.customerId,(error,result)=>{
	  	   if(error) return res.status(400).send('Customer not found');
	  	   this.customer = result;
	  })

	  await Movie.findById(req.body.movieId,(error,result)=>{
	  	   if(error) return res.status(400).send('Movie not found ');
	  	   this.movie = result;
	  if(this.movie.numberInStock == 0) res.status(400).send("There is no movie found in stock");
	  })

     

	  let rental = new Rental({
	  	 customer:{
	  	 	_id: this.customer._id,
	  	 	name: this.customer.name,
	  	 	phone: this.customer.phone
	  	 },
	  	 movie:{
	  	 	_id:this.movie._id,
	  	 	title:this.movie.title,
	  	 	dailyRentalrate:this.movie.dailyRentalrate
	  	 }
	  });

	  rental = await rental.save();
	  this.movie.numberInStock--;
	  await this.movie.save();
	  res.send(rental);

})

module.exports = router;