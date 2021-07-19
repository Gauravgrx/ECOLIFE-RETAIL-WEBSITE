// bcrypt
var bcrypt = require("bcrypt");

// body-parser
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});
const express = require("express");
const app = express();
// var reactViews = require('express-react-views');
const mysql = require('mysql');
// app.set('Frontend', __dirname + '/Frontend');
// app.set('view engine', 'jsx');
// app.engine('jsx', reactViews.createEngine());

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "apple",
  database: 'test',
  connectionLimit:10
});


// requesting express to get data as text
app.use(bodyParser.text());


app.get('/register', function(req, res) {
	res.render('./Frontend/src/pages/Register');
});

// using express for post method
app.post("/register", urlEncodedParser, function(request, response) {
	if(request.url!="/favicon.ico") {
		if(request.body.regOrLogin=="Register") {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(request.body.pwd, salt, function(err, hash) {
					var body = request.body;
					var date = new Date();
					var currentDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
					var postVars = {username: body.username, password: hash, dob: body.dob, reg_date: currentDate};
					// insertion into MySQL
					pool.query("SELECT * FROM user WHERE username='"+body.username+"'", function(err, res, fields){
						if(err) {
							response.render( "./Frontend/src/pages/Error", {error: 'Error while querying', name: 'Register'});
						} else {
							if(res.length) {
									response.render( "./Frontend/src/pages/Error", {error: 'User already exist!!', name: 'Register'});
							}
							else {
								pool.query("INSERT INTO user set ?", postVars, function(err, result) {
									if(err) {
										console.log("error", err);
										response.render( "./Frontend/src/pages/Error", {error: 'User registration problem', name: 'Register'});
									} else {
										response.render( "./Frontend/src/pages/Login");
									}
								});
							}
						}
					});
				});
			});
		}
	}
});


app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./Frontend/src/pages/Login');
});


app.post("/login", urlEncodedParser, function(request, response) {
	if(request.url != "/favicon.ico") {
		if (request.body.regOrLogin=="Login") {
			var  body = request.body;
			pool.query("SELECT * FROM user WHERE username='"+body.username+"'", function(err, res, fields){
				if(err) {
					response.render( "./Frontend/src/pages/Error", {error: 'Username and Password is not correct'});
				} else {
					if(res.length) {
						bcrypt.compare(body.pwd, res[0].password, function(err, res) {
							if(res) {
								response.render( "./Frontend/src/pages/Welcome", {name: body.username});
							} else {
								response.render( "./Frontend/src/pages/Error", {error: 'Password is not correct'});
							}
						});
					} else {
						response.render( "./Frontend/src/pages/Error", {error: 'Username is not correct'});
					}
				}
			});
		}
	}
})


    
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));