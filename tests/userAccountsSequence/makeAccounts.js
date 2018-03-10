import { Selector } from 'testcafe';
import {ClientFunction } from 'testcafe';

var accounts = require('./users.json');
var reviews = require('./reviews.json');

fixture('First fixture')
.page('localhost:8080');

const selectE = Selector(value => {
    return document.getElementById(value) || document.getElementsByClassName(value);
    });

    const getLocation = ClientFunction(() => window.location.href);

    test('Register preset users', async t => {
         const register = Selector(selectE('button2'));
         const emailInput = Selector(selectE('email'));
         const usernameInput = Selector(selectE('username'));
         const passInput = Selector(selectE('password'));
         const submitButton = Selector(selectE('anIdForHiding'));
         const logoutButton = Selector(selectE('logout'));
         var email;
         var user;
         var pass;
        await t
        .click(register);
         for(var i = 0; i < accounts.length; i++){
            email = accounts[i].email;
            user = accounts[i].username;
            pass = accounts[i].password;
            await t
            .typeText(emailInput, email)
            .typeText(usernameInput, user)
            .typeText(passInput, pass)
            .click(submitButton)
            .click(logoutButton)
            .click(register);
        }
});

