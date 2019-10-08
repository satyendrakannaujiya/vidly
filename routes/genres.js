var express = require('express');
var router = express.Router();
const { Genre , validate } = require('../models/genre');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
// const asyncMiddleware = require('../middleware/async') ;
const mongoose = require('mongoose');
const winston = require('winston');
const validateObjectId = require('../middleware/validateObjectId');


router.get('/',async (req,res)=>{

    
	if(mongoose.connection.readyState == 1){
		
      const genres = await Genre.find().sort('name');
        res.send(genres);
	}else{
		const ex = {
			message:"500 internal Server Error from genres GET / "
		}
		winston.error(ex.message);
		res.send("500 internal Server ");
    
	}

})

router.post('/',auth,async (req,res)=>{
	const {error} = validate(req.body);
	 if(error) return res.status(400).send(error.details[0].message);
	 let genre = new Genre({name: req.body.name});
	 await genre.save();
	 res.send(genre);
     
	 
})

router.put('/:id',async (req,res)=>{
	    const { error } = validate(req.body);
	    // console.log(req.params.id);

	 if(error) return res.status(400).send(error.details[0].message);

	  Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{
	  	new: true
	  },(err,result)=>{
	  	   if(err) return res.status(404).send("Genres with id Not found");
	  	   return res.send(result);
	  });
	
	

})

router.delete('/:id',[auth,admin],async (req,res)=>{
	const genre = await Genre.findByIdAndRemove(req.params.id);

	if(!genre) return res.status(404).send('The genre with given id is not present');
	
	res.send(genre);

})

router.get('/:id',validateObjectId, async (req,res)=>{


	 const genre = await Genre.findById(req.params.id);
	   if(!genre) res.status(404).send('Genre with given id is not present');
	   res.send(genre);

})


module.exports = router;

