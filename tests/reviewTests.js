import { Selector } from 'testcafe';
import {ClientFunction } from 'testcafe';


fixture('First fixture')
.page('localhost:8080');

const selectE = Selector(value => {
    return document.getElementById(value) || document.getElementsByClassName(value);
    });

    const getLocation = ClientFunction(() => window.location.href);
    test('Login tests', async t => {
         const register = Selector(selectE('button2'));
         const emailInput = Selector(selectE('email'));
         const usernameInput = Selector(selectE('username'));
         const passInput = Selector(selectE('password'));
         const submitButton = Selector(selectE('anIdForHiding'));
         const logoutButton = Selector(selectE('logout'));
         var emailStr = "";
         var usrStr = "";
         var passStr = "";
         var maxEmailLength = 255;
         var maxPassLength = 15;
         var maxUserLength = 15;
         var legalEmailChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+|}{:?><,./;'[]=-";
         var legalUserChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
         var legalPassChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-";
         var users = [];
         var randEmailLength = 0;
         var randUserLength = 0;
         var randPassLength = 0;
        await t
        .click(register);
        for(var i = 0; i < 10; i++){
            randEmailLength = Math.floor(Math.random() * (maxEmailLength - 2 + 1)) + 2;
            randUserLength = Math.floor(Math.random() * (maxUserLength - 2 + 1)) + 2;
            randPassLength = Math.floor(Math.random() * (maxPassLength-6+1))+6;
            console.log(randEmailLength);
            console.log(randUserLength);
            console.log(randPassLength);
            for(var j = 0; j < randEmailLength; j++){
                emailStr += legalEmailChars.charAt(Math.floor(Math.random() * legalEmailChars.length));
            }
            for(var j = 0; j < randUserLength; j++){
                usrStr += legalUserChars.charAt(Math.floor(Math.random() * legalEmailChars.length));
            }
            for(var j = 0; j < randPassLength; j++){
                passStr += legalPassChars.charAt(Math.floor(Math.random() * legalPassChars.length));
            }

            users.push({email: emailStr, username: usrStr, password: passStr});

            await t
            .typeText(emailInput, emailStr)
            .typeText(usernameInput, usrStr)
            .typeText(passInput, passStr)
            .click(submitButton)
            .click(logoutButton)
            .click(register);
            emailStr = "";
            usrStr = "";
            passStr = "";
            console.log(i);
            console.log(users);
        }
        console.log(users);
});

