var mysql = require('mysql');
var nconf = require('nconf');

nconf.file({
    file: 'db/config.json'
    });
    if(!Object.keys(nconf.get()).length){
        throw new Error('Unable to load config file. Make sure MyCritic/db/config.json exists');
    }



var con = mysql.createConnection(nconf.get('mysql'));

con.connect(function(err){
    if(err) throw err;
    var sql = "CREATE TABLE IF NOT EXISTS Users (userId INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), username VARCHAR(16), password VARCHAR(16))";
    con.query(sql, function(err, res){
        if (err) throw err;
    });

    sql = "CREATE TABLE IF NOT EXISTS Reviews (reviewId INT AUTO_INCREMENT PRIMARY KEY, apiId VARCHAR(32),type VARCHAR(16), userId INT, title VARCHAR(256) ,reviewTxt VARCHAR(10000), rating INT, votes INT, time DATETIME)";
    con.query(sql, function(err, res){
        if (err) throw err;
    });

    sql = "CREATE TABLE IF NOT EXISTS Follows (userId INT, followingId INT)";
    con.query(sql, function(err,res){
        if (err) throw err;
        con.end(); //must add this in last query or else it hangs
    });
});
