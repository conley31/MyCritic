import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

fixture('First fixture')
.page('localhost:8080');

const selectE = Selector(value => {
        return document.getElementById(value) || document.getElementsByClassName(value);
});

const getLocation = ClientFunction(() => window.location.href);
test('Movie Test', async t => {
        const movies = Selector(selectE('movies'));
        await t
        .click(movies);
        var movie;
        var vote_average;
        for (var i = 0; i < 20; i++) {
                console.log(i);
                movie = Selector(selectE(i));
                await t
                .click(movie);
                vote_average = await Selector('font').withAttribute('color','#78dc52');
                //console.log(vote_average.textContent);
                await t
                .expect(vote_average).notMatch(/undefined/)
                const goBack = ClientFunction(() => window.history.back());
                await goBack();
        }
});
