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

test('Login, follow user, view feed', async t=>{
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
    var rev;
    var mediaValue;
    var randReview;
    await t
    .click(login);
    for(var i = 0; i < accounts.length; i++){
        mediaValue = i%mediaList.length;
        media = mediaList[mediaValue];
        email = accounts[i].email;
        pass = accounts[i].password;
        await t
        .typeText(emailInput, email)
        .typeText(passInput, pass)
        .click(submitButton)
        .click(media);
        choice = Selector(selectE(0));
        console.log(choice);
        await t
        .click(choice);
        //click the username link
        rev = Selector(selectE(0));
        await t
        .click(rev)
        .click(logoutButton)
        .click(login);
     }
});

