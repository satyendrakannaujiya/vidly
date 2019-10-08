
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
module.exports  = function(){
	
const db = config.get('db');
mongoose.connect(db,{

    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
    bufferMaxEntries: 0
}).then(()=>{
	winston.info('Connected to '+db);
})
}