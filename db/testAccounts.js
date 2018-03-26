var mysql = require('mysql');
var mysqlConfig = require('./config.json');

var con = mysql .createConnection({
    host: mysqlConfig["mysql"]["host"],
    user: mysqlConfig["mysql"]["user"],
    password: mysqlConfig["mysql"]["password"],
    database: mysqlConfig["mysql"]["database"]
});

con.connect(function(err){
    if(err) throw err;



    var sql = "INSERT INTO Users(email,username,password) VALUES ?";
    var values = [
        ['apple@mail.com', 'apple123','password'],
        ['banana@mail.com', 'banana123','password'],
        ['carrot@mail.com', 'carrot123','password'],
        ['date@mail.com', 'date123', 'password'],
        ['grape@mail.com', 'grape123','password']
    ];
    con.query(sql,[values], function(err, res){
        if (err) throw err;
    });

    sql = "INSERT INTO Reviews(apiId,type,userId,title,reviewTxt,rating,votes,time) VALUES ?";
     var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var values = [
        ['337167','movie',1,'Fifty Shades Freed', 'Great Movie!', 4,0,time],
        ['7fCNUWi6uflDTQ08srxMZk','music',2,'No Excuses', 'Great Song!',4,0,time],
        ['36926','game',3,'Monster Hunter: World','Great Game!',4,0,time],
        ['25622889','book',4,'Most Blessed of the Patriarchs: Thomas Jefferson and the Empire of the Imagination', 'Great Book!',4,0,time],
        ['337167','movie',5,'Fifty Shades Freed', 'Hated it!', 1,0,time]
    ];
    con.query(sql,[values], function(err, res){
        if (err) throw err;
        con.end();
    });
});
