import { Selector } from 'testcafe';

fixture 'Media Pages'
    .page `https://localhost:8282`;

test(`My first test`, async t => {
	await t
		.click('#music');
});