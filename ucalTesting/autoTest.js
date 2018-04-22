import { Selector } from 'testcafe';
import {ClientFunction } from 'testcafe';
//node filesystem
var fs = require('fs');
var logFile = 'log.txt';

fixture('First fixture')
.page('http://ucal-purdue.herokuapp.com/login');
var currentdate = new Date();
var datetime = "Run Initiated at: " + currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " "  + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

/*
 *
 * Uncomment the below code to specify custome selector behavior
 *
 *
const selectE = Selector(value => {
    return document.getElementById(value) || document.getElementsByClassName(value) || document.getElementsByName(value)[0];
    });
  */
test('Register random users', async t => {
    const usernameInput = Selector('input').withAttribute('formcontrolname','email');;
    const passInput = Selector('input').withAttribute('formcontrolname','password');
    const register = Selector('button').withAttribute('class','btn btn-secondary');
    const logout = Selector('a').withAttribute('href',"/logout");
    var emailChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+|}{:?><,./;'[]=-";
    var passChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+|}{:?><,./;'[]=-";
    var randLength = 0;
    var emailStr = "";
    var passStr = "";
    var numRandUsers = 10;   //Change this value to specify the number of accounts registered. 
    var maxLength = 16 //change this to set the maximum length of the username
    fs.appendFileSync(logFile,"\n\n" + datetime + '\n');
    fs.appendFileSync(logFile, 'Registering ' + numRandUsers + ' randomly generated users:\n');
    for(var i = 0; i < numRandUsers; i++){
        
        randLength = Math.floor(Math.random() * Math.floor(maxLength));
        emailStr = "";
        passStr = "";
        for(var j = 0; j < randLength; j++){
            emailStr += emailChars.charAt(Math.floor(Math.random() * emailChars.length));
            passStr += passChars.charAt(Math.floor(Math.random() * passChars.length));
        }
        fs.appendFileSync(logFile,('Account ' + i + ': EMAIL= ' + emailStr + ' PASS= ' + passStr + '\n'));
        await t
        .typeText(usernameInput, emailStr)
        .typeText(passInput, passStr)
        .click(register)
        .click(logout);
    }
});
