var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", //Enter the MySql password you created when installing mysql-server
    database: "mycritic"
});

con.connect(function(err){
    if(err) throw err;
    var sql = "CREATE TABLE IF NOT EXISTS Users (userId INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), username VARCHAR(16), password VARCHAR(16))";
    con.query(sql, function(err, res){
        if (err) throw err;
    });

    sql = "CREATE TABLE IF NOT EXISTS Reviews (reviewId INT AUTO_INCREMENT PRIMARY KEY, mediaId INT, userId INT, reviewTxt VARCHAR(10000), rating INT, votes INT, time DATETIME)";
    con.query(sql, function(err, res){
        if (err) throw err;
    });

    sql = "CREATE TABLE IF NOT EXISTS Media (mediaId INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(255), name VARCHAR(255))";
    con.query(sql, function(err, res){
        if (err) throw err;
    });

    sql = "CREATE TABLE IF NOT EXISTS Follows (userId INT, followingId INT)";
    con.query(sql, function(err,res){
        if (err) throw err;
        con.end(); //must add this in last query or else it hangs
    });
});
