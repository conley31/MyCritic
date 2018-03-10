import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

var fs = require("fs");
var dictionary;
fs.readFile("1-1000.txt", function(err, data){
	if (err) throw err;
	dictionary = data.toString().split("\n");
});

fixture('First fixture')
.page('localhost:8080');

const selectE = Selector(value => {
	return document.getElementById(value) || document.getElementsByClassName(value);
});

const getLocation = ClientFunction(() => window.location.href);

test('Search using dictionary', async t=>{
	const searchBar = Selector(selectE('searchBar'));
	var searchList;
	for (var i = 0; i < dictionary.length; i++) {
		console.log("Word is: " + dictionary[i]);
		await t
		.typeText(searchBar, dictionary[i] + "\r");
		searchList = await Selector(selectE('searchList')).textContent;
		await t
		.expect(searchList).notMatch(/undefined/)
		const goBack = ClientFunction(() => window.history.back());
                await goBack();
	}
});
