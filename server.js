const PORT = process.env.PORT || 8080

//Imports
var express = require('express');
	
var app = express();
var http = require('http').Server(app)
var nconf = require('nconf');
var request = require('request');
var convert = require('xml-js');

//body parser for forms
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//client-side authentication sessions
var session = require("client-sessions");

app.use(session({
    cookieName: 'session',
    secret: "rPpwd7lzdE4u3dGpURJzdC6zdMJXfh",
    duration: 30 * 60 * 1000
}));

//global middleware for client session
app.use(function(req, res, next){
    if(req.session && req.session.user){
        //these 'res' values can be accessed client side to verify
        req.user = req.session.user;
        res.locals.login = true;
        res.locals.user = req.session.user;
    }
    else{
        res.locals.login = false;
    }
    //continue either way
    next();
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Passport configuration
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.serializeUser(function(user,done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id,done){
        connection.query("select * from Users where userId = "+id, function(err,rows){
         done(err, rows[0]);   
        });
    });
}

//MySql connection
var mysql = require('mysql');
nconf.file({
    file: './db/config.json'
    });
    if(!Object.keys(nconf.get()).length) {
        throw new Error('Unable to load config file. Make sure db/config.json exists');
    }
var con = mysql.createConnection(nconf.get('mysql'));
con.connect(function(err){
    if(err) throw err;
    console.log("Now connected to mysql db and can make queries");
});


//main launch page
app.get('/', function(req, res){
	res.render('home.ejs', {
		production: app.get('env') == 'production',
		title: 'MyCritic'
	});
});

//signup page
app.get('/register', function(req,res){
    res.render('register.ejs');
});

//view the profile page
app.get('/profile', function(req,res){
    res.render('profile.ejs');
});

//get the list of recent movies
app.get('/movies', function(req,res){
    res.render('movies.ejs');
});

//get the list of recent Songs
app.get('/music', function(req,res){
    res.render('music.ejs');
});

//get the list of top books
app.get('/books', function(req,res){
    res.render('books.ejs');
});

//games
app.get('/games', function(req,res){
    res.render('games.ejs');
});

var etime = Math.round(new Date().getTime()/1000.0);
etime.toString();
etime += "000";
console.log(etime);
const igdbOptions = {
    //gets most popular games
    url:' https://api-2445582011268.apicast.io/games/?fields=name,popularity&order=popularity:desc&limit=50',
    method: 'GET',
    headers: {
        //'user-agent': 'request'
        'user-key' : '8b727bcfa8aac10e024257ebf5494be3',
        'Accept': 'application/json'
     }
};
app.get('/accessNewGames', function(req,res){
    request(igdbOptions, function(err, response, body){
    console.log(body);
        res.send(body);
    });  
});

app.get('/gameTitle/:id', function(req,res){
    res.render('gameTitle.ejs');
});

app.get('/getGame', function(req,res){
    var gameId = req.headers.referer.substring(req.headers.referer.indexOf("/gameTitle/") + 11, req.headers.referer.length);
    console.log(gameId);
    var gameRequest = {
        url: 'https://api-2445582011268.apicast.io/games/' + gameId + '/?fields=name,total_rating,summary,screenshots',
        method: 'GET',
        headers: {
            'user-key' : '8b727bcfa8aac10e024257ebf5494be3',
            'Accept': 'application/json'
        }
    };
    console.log(gameRequest);
    request(gameRequest, function(err,response,body){
        console.log(body);
        res.send(body);
    });
});


app.get('/bookInfo/:name', function(req,res){
    res.render('bookInfo.ejs');
});
app.get('/movie/:id', function(req,res){
    res.render('movInfo.ejs');
});

//initilizaion of spotify api key
var clientID = "2136cc56a70c45608fb9097d77ce7632";
var secret = "3abb65ea376f4a21b5ea42c8aa0f45f3";
var token = "";
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(clientID + ':' + secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    token = body.access_token;

  }
});
app.get('/access', function(req,res){
	if(req.headers.referer == null){
		res.setHeader('Content-Type', 'text/plain');
    	res.send("Access Denied");
    	return;
	}
	res.setHeader('Content-Type', 'text/plain');
    res.send(token);
});

app.get('/getBook', function(req,res){
	var GRAPI = "GhFElaxrPCsozAErWzDA";
	if(req.headers.referer == null){
		res.setHeader('Content-Type', 'text/plain');
    	res.send("Access Denied");
    	return;
	}

	var bookName = req.headers.referer.substring(req.headers.referer.indexOf("/bookInfo/")+ 10, req.headers.referer.length );
	while(bookName.search("%20") != -1){
		bookName = bookName.replace("%20", " ");
	}
	var options = { url: "https://www.goodreads.com/book/title.xml?key=" + GRAPI + "&title=" + bookName};
	request.get(options, function(error, response, body) {
	  if (!error && response.statusCode === 200) {

	  	var json = convert.xml2json(body, {compact: true, spaces: 4})

	    // use the access token to access the Spotify Web API
	    res.setHeader('Content-Type', 'application/json');
    	res.send(json);

	  }
	});
});

//display information on a specific song
app.get('/song/:id', function(req,res){
    res.render('song.ejs');
});

//register function
app.post('/register', function(req, res) {
    //first, ensure that the email is not already in use
    var email;
    var username;
    var password;
    email = req.body.email;
    username = req.body.username;
    password = req.body.password;
    con.query('SELECT * FROM Users WHERE email = ?', [email], function(err,result){
    if(err){
        throw err;
    }
    else{
        if(result.length > 0){
             res.render('register.ejs',{message:'That email is already in-use!'});
             console.log("USER NOT REGISTERED, email in use");
        }
        else{
            //check if username is taken
            con.query('SELECT * FROM Users WHERE username = ?', [username], function(err,result){
                if(err) throw err;
                if(result.length > 0){
                    res.render('register.ejs', {message:"that username is already in use..."});
                    console.log("USER NOT REGISTERED, uername in use");
                }
                else{
                    //add the user to the database
                    con.query('INSERT INTO Users(email,username,password) VALUES (?,?,?)',[email,username,password], function(err,result){
                        if(err) throw err;
                        else{
                            //set session
                            req.session.user = email;
                            res.locals.login = true;
                            res.render('register.ejs', {message: "Registration Successful!"});
                            console.log("USER REGISTERED SUCCESSFULLY");
                        }
                    });
                }
            });
            
        }
        }
        });    
});

//login page
app.get('/login', function (req, res) {
    res.render('login.ejs');
});

//logout button
app.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/');
});

//login function
app.post('/login', function (req, res) {
    var email;
    var password;
    email = req.body.email;
    password = req.body.password;
    con.query('SELECT * FROM Users WHERE email = ?', [email], function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result.length > 0) {
                //user exists
                if(result[0].password == password){
                    //set sesion
                    req.session.user = email;
                    res.locals.login = true;
                    res.render('login', { message: "USER LOGIN SUCCESSFUL!" });                
                    console.log("USER LOGIN SUCCESSFUL");  
                }
                else{
                    res.render('login', { message: "INCORRECT PASSWORD"});
                }
            }
            else{
                //user does not exist
                res.render('login', { message: "USER NOT REGISTERED"});
            }
        }
    }
    );
});

//404
app.get('*', function(req, res){
	if(req.xhr) {
		res.status(404).send({
			errorMessage: "Page Not Found"
		});
		return;
	}
	res.format({
		html: function(){

		},
		json: function() {
			res.status(404).send({
				errorMessage: "Page Not Found"
			});
		},
		default: function(){
			res.sendStatus(404);
		}
	});
});


var server = http.listen(PORT, function() {
	console.log('Running Server');
})

var exitHandler = function(){
	process.exit(0);
}

process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);
