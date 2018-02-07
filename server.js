const PORT = process.env.PORT || 8080

//Imports
var express = require('express');
	
var app = express();
var http = require('http').Server(app)
var nconf = require('nconf');

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

//body parser for forms
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

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
