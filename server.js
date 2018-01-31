const PORT = process.env.PORT || 8080

//Imports
var express = require('express');
	
var app = express();
var http = require('http').Server(app)
var nconf = require('nconf');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

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
