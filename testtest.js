import { Selector } from 'testcafe';

fixture('First fixture')
.page('localhost:8080');

const elementWithIdOrClassName = Selector(value => {
    return document.getElementById(value) || document.getElementsByClassName(value);
    });

test('First test', async t => {
    const searchbar = Selector(elementWithIdOrClassName('searchBar')); 
    await t
    // Create search query on google.com page
    .typeText(searchbar,'kingdom')
    // Start google search
    .pressKey('enter')
});

test('Music Test', async t => {
    const music = Selector(elementWithIdOrClassName('music')); 
    var choice1 = Math.floor(Math.random() * 50);
    var choice2 = Math.floor(Math.random() * 50);

    const choice1Cli = Selector(elementWithIdOrClassName(choice1));
    const choice2Cli = Selector(elementWithIdOrClassName(choice2));
    const title = Selector(elementWithIdOrClassName('title'));
    const artist = Selector(elementWithIdOrClassName('artist'));
    const popularity = Selector(elementWithIdOrClassName('popularity'));
    await t
    // go to the music page
    .click(music)    
    //pick two random elements 0-49
    await t.click(choice1Cli)
    .expect(title).notMatch("(n|e|d|undefined)")
    //.expect(artist).notMatch("undefined")
    //.expect(popularity).notMatch("undefined")
    .navigateTo('http://localhost:8080/music')
    .click(choice2Cli);
});