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
    /*
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
*/
test('Login and leave a review', async t=>{
    const login = Selector(selectE('navbarLogin'));
    const movies = Selector(selectE('movies'));
    const music = Selector(selectE('music'));
    const games = Selector(selectE('games'));
    const books = Selector(selectE('books'));
    const div = Selector(selectE('newMoviesList' || 'songList' || 'newGamesList' || 'bookList'));
    const reviewArea = Selector(selectE('review'));
    var mediaList = [movies,music,games,books];
    const emailInput = Selector(selectE('email'));
    const passInput = Selector(selectE('password'));
    const submitButton = Selector(selectE('idForHiding'));
    const logoutButton = Selector(selectE('logout'));
    var email;
    var pass;
    var media;
    var choice;
    var mediaValue;
    var randReview;
    await t
    .click(login);
    for(var i = 0; i < accounts.length; i++){
        console.log(mediaList.length);
        mediaValue = i%mediaList.length;
        console.log(mediaValue);
        media = mediaList[mediaValue];
        console.log(media);
        email = accounts[i].email;
        pass = accounts[i].password;
        await t
        .typeText(emailInput, email)
        .typeText(passInput, pass)
        .click(submitButton)
        .click(media);
        choice = Selector(selectE(0));
        await t
        .click(choice);
        randReview = Math.floor(Math.random() * reviews.length);
        console.log(randReview);
        await t
        .typeText(reviewArea, reviews[randReview].review)
        .click(submitButton)
        .click(logoutButton)
        .click(login);


    }
    

});

