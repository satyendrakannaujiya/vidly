const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston');
const app = express();

var bodyParser = require('body-parser');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;

app.listen(port,function(){
	 winston.info("Application is listening on port "+ port);
})
