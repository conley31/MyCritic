import { Selector } from 'testcafe';

fixture 'Media Pages'
    .page `http://localhost:8080`;

test(`My first test`, async t => {
	await t
		.click('#music');
});