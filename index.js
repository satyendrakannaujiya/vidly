const Joi = require('joi');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const express = require('express');
const app = express();
const config = require('config');
var bodyParser = require('body-parser');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


if(!config.get('jwtPrivateKey')){
	console.error("FATAL ERROR : jwtPrivateKey is not defined ");
	process.exit(1);
}
mongoose.connect('mongodb://localhost/vidly',{

    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
    bufferMaxEntries: 0
}).then(()=>{
	console.log("Connected to mongodb");
})
.catch(err => {
	console.log("could not connect to mongo db");
})

mongoose.connection.on('disconnected',()=>{
	console.log("Connection lost ");
})
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);	

const port = process.env.PORT || 3000;




app.listen(port,function(){
	 console.log("Application is listening on port "+ port);
})
