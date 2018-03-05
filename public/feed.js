var request = new XMLHttpRequest();
request.open('GET', "/feedFill");
request.responseType = 'json';
var token = "";
request.onload = function() {
	token = request.response;
	feedList();
};

request.send();
var bodyDiv = document.getElementById("feed-list");
var html = "";

var feedList = function(){

	for (i = 0; i < 20 && i < token.length; i++) {

	console.log(token);
	for (i = 0; i < 20; i++) {
		html += "<div id:\"" + i + "\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>" 

        	html += "<img height=\"50px\" align=\"right\"><h2 style=\"font-family: Arial\">"+token[i]["title"]+" ("+token[i]["type"]+")"+"</h2><h3 style=\"font-family: Arial\">" 

	        html += token[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + token[i]["rating"] + "</font> </div>";
	}
	bodyDiv.innerHTML = html;
}
