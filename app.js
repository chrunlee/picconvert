var express = require('express');

var morgan = require('morgan');

var FileStreamRotator = require('file-stream-rotator');

var fs = require('fs');

var cors = require('cors');

var session = require('express-session');

var bodyParser = require('body-parser');

var path = require('path');

var app = express();

app.use(cors());


var config = require('./config/config');
var status = config.status;

//定时任务
require('./lib/ScheduleJob');

//log
var logDirectory = path.join(__dirname, 'logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// app.use(morgan('short'));
app.use(morgan('combined', {stream: accessLogStream}));

app.set('views',path.join(__dirname,'view'));

app.engine('html',require('express-art-template'));

app.set('view engine','html');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : false}))

app.use(session({
	secret : 'picconvert'
}));


//router
var index = require('./router/index');

app.use('/',index);

var login = require('./router/login');

app.use('/login',login);

var ip = require('./router/ip');
app.use('/ip',ip);

var token = require('./lib/token');
app.use('/api/',function(req,res,next){
	//检查token
	var tokenStr = req.body.token;
	if(token.checkToken(tokenStr)){
		next();
	}else{
		res.end(JSON.stringify(status[10001]));
	}
});

var api = require('./router/api');
app.use('/api',api);

//404
app.use(function(req,res,next){
	console.log(req.url);
	var err = new Error('file not found');
	err.status = 404;
	next(err);
});

//错误中间件
app.use(function(err,req,res,next){
	var status = err.status || 500;
	//错误
	var str = (new Date()).toISOString()+'\t'+err.toString()+'\n';
	console.log(err);
	fs.appendFileSync(path.join(__dirname,'logs','error.log'),str);
	if(status == 404){
		res.status(404).render('error/404');
	}else if(status == 500){
		res.render('error/500');
	}else{
		res.render('error/400');
	}
});

app.listen(config.port,function(){
	console.log('running at '+config.port)
});