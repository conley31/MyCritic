import { Selector } from 'testcafe';
import {ClientFunction } from 'testcafe';


fixture('First fixture')
.page('localhost:8080');

const selectE = Selector(value => {
    return document.getElementById(value) || document.getElementsByClassName(value);
    });

    const getLocation = ClientFunction(() => window.location.href);
    test('Login tests', async t => {
         const login = Selector(selectE('button'));
         const emailInput = Selector(selectE('email'));
         const passInput = Selector(selectE('password'));
         const submitButton = Selector(selectE('idForHiding'));
         var emailStr = "";
         var passStr = "";
         var legalEmailChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+|}{:?><,./;'[]=-";
         var legalPassChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-";
         var randLength = 0;
        await t
        .click(login);
        for(var i = 0; i < 10; i++){
            randLength = Math.floor(Math.random() * Math.floor(16));
            for(var j = 0; j < randLength; j++){
                emailStr += legalEmailChars.charAt(Math.floor(Math.random() * legalEmailChars.length));
                passStr += legalPassChars.charAt(Math.floor(Math.random() * legalPassChars.length));
            }
            await t
            .typeText(emailInput, emailStr)
            .typeText(passInput, passStr)
            .click(submitButton);
            emailStr = "";
            passStr = "";
        }
});

