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
