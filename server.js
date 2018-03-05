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
app.set('views',__dirname + '/views');
 app.engine('html', require('ejs').renderFile);


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
	if (res.locals.login) {
		res.render('feeds.ejs');
	} else {
		res.render('home.ejs', {
			production: app.get('env') == 'production',
			title: 'MyCritic'
		});
	}
});

//signup page
app.get('/register', function(req,res){
    if(req.session.user != null){
        res.setHeader('Content-Type', 'text/plain');
        res.send("Already Logged In");
        return;
    }
    res.render('register.ejs');
});

//view the profile page
app.get('/profile', function(req,res){
    console.log(req.session)
    if(req.session.user == null){
        res.setHeader('Content-Type', 'text/plain');
        res.send("Access Denied");
        return;
    }
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
const igdbOptions = {
    //gets most popular games
    url:' https://api-2445582011268.apicast.io/games/?fields=name,total_rating,popularity&order=popularity:desc&limit=50',
    method: 'GET',
    headers: {
        //'user-agent': 'request'
        'user-key' : '8b727bcfa8aac10e024257ebf5494be3',
        'Accept': 'application/json'
     }
};
app.get('/accessNewGames', function(req,res){
    request(igdbOptions, function(err, response, body){
        res.send(body);
    });
});

app.get('/gameTitle/:id', function(req,res){
    res.render('gameTitle.ejs');
});

app.get('/getGame', function(req,res){
    var gameId = req.headers.referer.substring(req.headers.referer.indexOf("/gameTitle/") + 11, req.headers.referer.length);
    var gameRequest = {
        url: 'https://api-2445582011268.apicast.io/games/' + gameId + '/?fields=name,total_rating,summary,cover,screenshots',
        method: 'GET',
        headers: {
            'user-key' : '8b727bcfa8aac10e024257ebf5494be3',
            'Accept': 'application/json'
        }
    };
    request(gameRequest, function(err,response,body){
        res.send(body);
    });
});

app.post('/submitReview', function(req,res){
    var email = req.session.user;
    var userId;

    //inputs given by the user
    var reviewTxt= req.body.review;
    var rating = req.body.rating;
    var title = req.body.title;

    //get the URL, then split it to extract the type and api id.
    var type;
    var urlString = req.headers.referer;
    var splitUrl = urlString.split('/');
    var mediaPage = splitUrl[3];
    var apiId = splitUrl[4];
    switch(mediaPage){
        case 'movie':
            type = 'movie';
            break;
        case 'song':
            type = 'song';
            break;
        case 'gameTitle':
            type = 'game';
            break;
        case 'bookInfo':
            type = 'book';
            break;
    }

    /*votes not yet implemented */
    var votes = 0;
    /****************************/

    var time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var userIdPromise = getUserIdByEmail(email);
    userIdPromise.then(function(result){
        userId = result;
        con.query('INSERT INTO Reviews(apiId,type,userId,title,reviewTxt,rating,votes,time) VALUES (?,?,?,?,?,?,?,?)',[apiId,type,
        userId,title,reviewTxt,rating,votes,time], function(err, result){
            if(err) throw err;
            //refresh page
            res.redirect(req.get('referer'));
        });
    })

});

function getUserIdByEmail(email){
    return new Promise(function(resolve, reject){
        con.query('SELECT * FROM Users WHERE email = ?', [email], function(err, result){
            if(err) throw err;
            else resolve(result[0].userId);
        });
    })
}


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

var searchResultJson = {
    movies: {},
    songs: {},
    games: {},
    books: {}
};
app.get('/search', function(req,res){
    res.render('search.ejs');
});

app.get('/searchQ', function(req,res){
    var searchFor = req.query.search;
    var requestSong = require('request');
    var gamesList;
    var songsList;
    var moviesList;
    var booksList;

    var songSearchRequest = {
        url: "https://api.spotify.com/v1/search?q="+searchFor+"&type=artist,track,album&limit=20",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    }

    requestSong(songSearchRequest, function(err,response,body){
        songsList = body;
        searchResultJson["songs"] = songsList;
        //res.send('/search')
    });

    var GRAPI = "GhFElaxrPCsozAErWzDA";
    var bookSearchRequest = {url: "https://www.goodreads.com/search/index.xml?key="+ GRAPI+ "&q=" + searchFor};
    request(bookSearchRequest, function(err,response,body){
        var booksList = convert.xml2json(body, {compact: true, spaces: 4});
        searchResultJson["books"] = booksList;

    });


    //movie search
    var movieSearchRequest = {url: 'https://api.themoviedb.org/3/search/movie?api_key=d26e26ba96250fb462f04e8c480e3351&language=en-US&query=' + searchFor + '&page=1&include_adult=false'};
    request(movieSearchRequest, function(err, response, body){
	var moviesList = body;
	searchResultJson["movies"] = moviesList;
    });


    //search through games..
    var gameSearchRequest = {
        url: 'https://api-2445582011268.apicast.io/games/?search=' + searchFor + '&fields=name,total_rating&limit=20',
        method: 'GET',
        headers: {
            'user-key' : '8b727bcfa8aac10e024257ebf5494be3',
            'Accept': 'application/json'
        }
    };
    request(gameSearchRequest, function(err,response,body){
        gamesList = body;
        searchResultJson["games"] = gamesList;
        res.send('/search');
    });
});

app.get('/searchResults', function(req, res){
    res.send(searchResultJson);
});


app.get('/getBook', function(req,res){
	var GRAPI = "GhFElaxrPCsozAErWzDA";
	if(req.headers.referer == null){
		res.setHeader('Content-Type', 'text/plain');
    	res.send("Access Denied");
    	return;
	}

	var bookName = req.headers.referer.substring(req.headers.referer.indexOf("/bookInfo/")+ 10, req.headers.referer.length );

	var options = { url: "https://www.goodreads.com/book/show/"+bookName+".xml?key=" + GRAPI};
	request.get(options, function(error, response, body) {
	  if (!error && response.statusCode === 200) {

	  	var json = convert.xml2json(body, {compact: true, spaces: 4});

	    // use the access token to access the Spotify Web API
	    res.setHeader('Content-Type', 'application/json');
    	res.send(json);

	  }
	});
});

app.get('/getBookID', function(req, res){
    var GRAPI = "GhFElaxrPCsozAErWzDA";
    if(req.headers.referer == null){
        res.setHeader('Content-Type', 'text/plain');
        res.send("Access Denied");
        return;
    }
    var options = { url: "https://www.goodreads.com/book/title.xml?key=" + GRAPI + "&title=" + req.query.title};
    request.get(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var json = convert.xml2json(body, {compact: true, spaces: 4});

        // use the access token to access the Spotify Web API
        res.setHeader('Content-Type', 'application/json');
        res.send(json);

      }
    });
})

//display information on a specific song
app.get('/song/:id', function(req,res){
    res.render('song.ejs');
});

app.get('/user/:id', function(req,res){
    res.render('users.ejs');
});

app.get('/username', function(req,res){
    var userID = req.headers.referer.substring(req.headers.referer.indexOf("/user/")+ 6, req.headers.referer.length );
    con.query('SELECT username FROM Users WHERE userId = ?', [userID], function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

app.post('/follow', function(req,res) {
	console.log("inside follow function");
	var email = req.session.user;
	var userID;
	var followID = req.headers.referer.substring(req.headers.referer.indexOf("/user/")+ 6, req.headers.referer.length );
	con.query('SELECT * FROM Users WHERE email = ?', [email], function(err, result){
		if (err) {
			throw err;
		} else {
			JSON.parse(result);
			userID = result[0][userId];	
		}
	});
	con.query('INSERT INTO Follows (userId, followingId) VALUES (?, ?)', [userID, followID], function(err, result) {
		if (err) {
			throw err;
		} else {
			console.log("followed successfully");
		}
	});
});

app.post('/unfollow', function(req, res) {
	console.log("inside unfollow function");
	var email = req.session.user;
	var userID;
	var followID = req.headers.referer.substring(req.headers.referer.indexOf("/user/")+ 6, req.headers.referer.length );
	var userIdPromise = getUserIdByEmail(email);
	userIdPromise.then(function(result){
		userID = result;
		console.log(userID);
		con.query('DELETE FROM Follows WHERE userId = ? AND followingId = ?', [userID, followID], function(err, result){
			if (err) {
				throw err;
			}
			res.redirect(req.get('referer'));
		});
	})
	console.log("post promise");

});

app.get('/followCheck', function(req,res){
	var userID = req.headers.referer.substring(req.headers.referer.indexOf("/user/")+ 6, req.headers.referer.length );
	console.log(userID);
	var email = req.session.user;
	con.query('SELECT followingId FROM Users, Follows WHERE email = ? AND Users.userId = Follows.userId AND Follows.followingId = ?', [email, userID], function(err, result){
		if (err) {
			throw err;
		}
		else {
			if (result.length > 0) {
				console.log("result length greater than 0, so they already follow them, load unfollow");
				res.send(result);
			} else {
				console.log("result is 0, load follow");
				res.send(result);
			}
		}
	});
});

app.get('/feedFill', function(req,res){
	var email = req.session.user;
	con.query('SELECT type, time, reviewTxt, rating, title FROM Users, Reviews, Follows WHERE email = ? AND Follows.userId = Users.userId AND Follows.followingId = Reviews.userId order by time desc', [email], function(err, result){
		if(err) {
			throw err;
		}
		else {
			res.send(result);
		}
	});
});

app.get('/profileReviews', function(req,res){
    var email = req.session.user
    con.query('SELECT type, time, reviewTxt, rating, title FROM Users, Reviews WHERE email = ? AND Users.userId = Reviews.userId order by time desc', [email], function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

app.get('/userReviews', function(req,res){
    var userID = req.headers.referer.substring(req.headers.referer.indexOf("/user/")+ 6, req.headers.referer.length );
    con.query('SELECT * FROM Reviews WHERE userId = ? order by time desc', [userID], function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

app.get('/mediaReviews', function(req,res){
    var apiID
    if(req.headers.referer.indexOf("/song/") != -1){
        apiID = req.headers.referer.substring(req.headers.referer.indexOf("/song/")+ 6, req.headers.referer.length );
    }
    else if (req.headers.referer.indexOf("/gameTitle/") != -1){
        apiID = req.headers.referer.substring(req.headers.referer.indexOf("/gameTitle/")+ 11, req.headers.referer.length );
    }
    else if (req.headers.referer.indexOf("/bookInfo/") != -1){
        apiID = req.headers.referer.substring(req.headers.referer.indexOf("/bookInfo/")+ 10, req.headers.referer.length );
    }
    else if (req.headers.referer.indexOf("/movie/") != -1){
        apiID = req.headers.referer.substring(req.headers.referer.indexOf("/movie/")+ 7, req.headers.referer.length );
    }
    con.query('SELECT r.userId, u.username, r.reviewTxt, r.time, r.rating FROM Reviews as r, Users as u WHERE r.apiId = ? AND r.userId = u.userId order by time desc', [apiID], function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
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
    if(req.session.user != null){
        res.setHeader('Content-Type', 'text/plain');
        res.send("Already Logged In");
        return;
    }
    res.render('login.ejs');
});

//logout button
app.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/');
});

//change password function
app.post('/changePassword', function(req, res) {
	var email;
	var password;
	var newPassword;
	email = req.session.user;
	password = req.body.password;
	newPassword = req.body.newPassword;
    console.log(req.session.user);
	con.query('SELECT * FROM Users WHERE email = ?', [email], function (err, result) {
		if (err) {
			throw err;
		} else {
			if (result.length > 0) {
				//user exists
				if (result[0].password == password){
					con.query('UPDATE Users SET password = ? WHERE email = ?', [newPassword, email], function(err, result){
						if (err) {
							throw err;
						} else {
							res.render('profile', { message: "PASSWORD CHANGE SUCCESSFUL" });
							console.log("password change successful!");
						}
					});
				} else {
					res.render('profile', { message: "INCORRECT PASSWORD"});
				}
			}
		}
	});
});

//delete account function
app.post('/deleteAccount', function(req,res){
    var email = req.session.user;
    var password = req.body.password_delete;
    console.log(email);
    con.query('SELECT * FROM Users WHERE email = ?', [email], function(err,result){
        if(err) throw err;
        else{
            console.log('exist');
            if(result.length > 0){
                console.log(password);
                console.log(result[0].password);
                if(result[0].password == password){
                    con.query('DELETE FROM Users WHERE email = ?',[email], function(err,result){
                        if(err) throw err;
                        else{
                            res.render('home.ejs');
                        }
                    });
                }
                else{
                 res.render('profile',{message: "INCORRECT PASSWORD"});
                }
            }
            else{
                res.render('profile',{message: "Account not found"});
            }
        }
    });
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
			res.render('feeds.ejs');
  //                  res.render('login', { message: "USER LOGIN SUCCESSFUL!" });
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
