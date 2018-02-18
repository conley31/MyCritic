import { Selector } from 'testcafe';
import {ClientFunction } from 'testcafe';


fixture('First fixture')
.page('localhost:8080');

const selectE = Selector(value => {
    return document.getElementById(value) || document.getElementsByClassName(value);
});

const getLocation = ClientFunction(() => window.location.href);
test('Game Test', async t => {
    const games = Selector(selectE('games'));
    await t
    .click(games);
    var choice;
    var rating;
    for(var i = 0; i < 50; i++){
        console.log(i);
         choice = Selector(selectE(i));
         await t
         .click(choice);
//         console.log(await Selector(selectE('ratingNumber')).textContent);
         rating = await Selector(selectE('ratingNumber')).textContent;

         console.log(rating.textContent);
         await t
         .expect(rating).match(/\d[\d|\.]+%/);
         //.expect(Selector(selectE('trating'))).notMatch(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,})?$)/);
         const goBack = ClientFunction(() => window.history.back());
         await goBack();
    }
});

