const express = require('express');
const {Movie,validate} = require('../models/movie');
const mongoose = require('mongoose');
const {Genre} = require('../models/genre');
var router = express.Router();

router.get('/',async (req,res)=>{

	  const movies = await Movie.find().sort('name');
	  res.send(movies);

})

router.post('/',async (req,res)=>{

	const {error} = validate(req.body);

	if(error) return res.status(400).send('Please enter correct Data ');

	await Genre.findById(req.body.genreId,(error,result)=>{
		if(error) return res.status(400).send('Genre id is not available');
		else
		{
			
           this.genre=result
		}
        
	});

	 
	let movie = new Movie({
		title:req.body.title,
		genre:{
			_id: this.genre._id,
			name: this.genre.name
		},
		numberInStock:req.body.numberInStock,
		dailyRentalrate:req.body.dailyRentalrate

	});

	await movie.save();
	res.send(movie);
})



router.put('/:id',async (req,res)=>{

	  const {error} = validate(req.body);
	  if(error) return res.status(400).send("please send correct data ");
	  Movie.findByIdAndUpdate(req.params.id,{
	  	title:req.body.title,
	  	dailyRentalrate:req.body.dailyRentalrate,
	  	numberInStock:req.body.numberInStock
	  },(err,result)=>{
	  	  if(err) res.status(400).send("Not successfully updated !");
	  	  return res.send(result);
	  })


})

router.delete('/:id',async (req,res)=>{
	  const customer = await Movie.findByIdAndRemove(req.params.id,(error,result)=>{
	  	if(error) return res.status(400).send('Movie not found !');
	  	  return res.send(result);
	  });
})

router.get('/:id',async (req,res)=>{
	const movie = await Movie.findById(req.params.id,(error,result)=>{
		if(error) return res.status(400).send('Movie not found !! ');
		res.send(result);
	})
})

module.exports = router;