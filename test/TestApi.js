//测试登录是否成功
var superagent = require('superagent');

var loginUrl = 'http://localhost:5500/login';
var user = 'lixun',
	pwd = '111111';

var testUrl = 'http://localhost:5500/api/test';


// superagent.post(loginUrl).send({user:user,pwd : pwd }).end(function(err,res){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		var rs = JSON.parse(res.text);
// 		if(rs.token){
// 			var token = rs.token;
// 			testTest(token);
// 		}else{
// 			console.log(rs.msg);
// 		}
// 	}
// });

function testTest(token){
	superagent.post(testUrl).send({token : token}).end(function(err,res){
		if(err){
			console.log(err);
		}else{
			console.log(res.text);
		}
	});
}

var token = 'eyJkYXRhIjp7ImlkIjoxLCJ1c2VyIjoibGl4dW4iLCJwd2QiOiIxMTExMTEiLCJjb3VudCI6MH0sImNyZWF0ZWQiOjE1MjQ1NjM2NzQsImV4cCI6MzYwMH0=.H4kixc7D1fheUJsTn9BRegS1mrv2Fi9YFPVGLqlgV+c=';
var token1= 'eyJkYXRhIjp7ImlkIjoxLCJ1c2VyIjoibGl4dW4iLCJwd2QiOiIxMTExMTEiLCJjb3VudCI6MH0sImNyZWF0ZWQiOjE1MjQ1NjM3NDcsImV4cCI6MzYwMH0=.uQTvB+T5yuSmfTWDwET0F9UwRDa43I6hJxuDonPR59M=';
testTest(token1);