import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

var fs = require('fs');
fixture('First fixture')
.page('http://ucal-purdue.herokuapp.com/login');

test('Create events', async t => {
	const usernameInput = Selector('input').withAttribute('formcontrolname', 'email');
	const passInput = Selector('input').withAttribute('formcontrolname', 'password');
	const login = Selector('button').withAttribute('class','btn btn-success');
	await t
	.typeText(usernameInput, "test")
	.typeText(passInput, "1")
	.click(login);

	const box = Selector('div').withAttribute('cal-cell-top');
	const createEvent = Selector('button').withAttribute('class','btn btn-sm btn-outline-primary d-block mx-auto');
	await t
	.hover(box)
	.click(createEvent);
	
	const eventName = Selector('input').withAttribute('name', 'eventName');
	const start = Selector('input').withAttribute('name', 'start');
	const startTime = Selector('input').withAttribute('name', 'usr_time');
	const end = Selector('input').withAttribute('name', 'end');
	const endTime = Selector('input').withAttribute('name', 'usr_time');
	const addEvent = Selector('button').withAttribute('class', 'btn btn-outline-primary float-right');
	var table1 = "ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+|}{:?><,./;'[]=-";
	var table2 = "0123456789";
	var table3 = "AP";
	var eventNameStr = "";
	var startStr = "";
	var startTimeStr = "";
	var endStr = "";
	var endTimeStr = "";
	var minYear = 2013;
	var maxYear = 2018;
	var numEvents = 10;
	for (var i = 0; i < numEvents; i++) {
		eventNameStr = "";
		startStr = "";
		startTimeStr = "";
		endStr = "";
		endTimeStr = "";
		var randLength = Math.floor(Math.random() * Math.floor(20));
		//generate random event name
		for (j = 0; j < randLength; j++) {
			eventNameStr += table1.charAt(Math.floor(Math.random() * table1.length));
		}

		//generate start random date
		var month = Math.floor(Math.random() * 12 + 1);
		startStr += month;
		if (month == 1) {
			startStr += '\t';
		}
		var day = Math.floor(Math.random() * 30 + 1);
		startStr += day;
		if (day < 10) {
			startStr += '\t';
		}
		//year
		startStr += Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);

		//generate start random time
		var hour = Math.floor(Math.random() * 12 + 1);
		startTimeStr += hour;
		if (hour == 1) {
			startTimeStr += '\t';
		}
		var min = Math.floor(Math.random() * 60 + 1);
		if (min < 10) {
			startTimeStr += '\t';
		}
		//AM or PM
		startTimeStr += table3.charAt(Math.floor(Math.random() * table3.length));

		//generate end random date
		month = Math.floor(Math.random() * 12 + 1);
		endStr += month;
		if (month == 1) {
			endStr += '\t';
		}
		day = Math.floor(Math.random() * 30 + 1);
		endStr += day;
		if (day < 10) {
			endStr += '\t';
		}
		//year
		endStr += Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);

		//generate end random time
		hour = Math.floor(Math.random() * 12 + 1);
		endTimeStr += hour;
		if (hour == 1) {
			endTimeStr += '\t';
		}
		min = Math.floor(Math.random() * 60 + 1);
		if (min < 10) {
			endTimeStr += '\t';
		}
		//AM or PM
		endTimeStr += table3.charAt(Math.floor(Math.random() * table3.length));

		await t
		.typeText(eventName, eventNameStr)
		.typeText(start, startStr)
		.typeText(startTime, startTimeStr)
		.typeText(end, endStr)
		.typeText(endTime, endTimeStr)
		.click(addEvent);
	}
});
