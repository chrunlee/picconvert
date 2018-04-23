var express = require('express');

var Router = express.Router();

//API

Router.post('/test',function(req,res,next){
	res.end('test');
});

module.exports = Router;