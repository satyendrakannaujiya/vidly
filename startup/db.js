
const mongoose = require('mongoose');
const winston = require('winston');
module.exports  = function(){
mongoose.connect('mongodb://localhost/vidly',{

    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
    bufferMaxEntries: 0
}).then(()=>{
	winston.info('Connected to MongoDB...');
})
}