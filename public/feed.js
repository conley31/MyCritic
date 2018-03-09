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

var change = function(opt){
    filt = opt;

    console.log(filt);
    request = new XMLHttpRequest();
    request.open('GET', '/feedFill');
    request.responseType = 'json';
    request.onload = function() {
        results = request.response;
        if(filt == 0 ){
            feedList();
        }
        else {
            console.log("here");
            filterFeed();
        }
    };

    request.send();
};

var feedList = function(){

	for (i = 0; i < 20 && i < token.length; i++) {
		html += "<div id:\"" + i + "\" onclick=\"window.location=\'/user/" + token[i]["userId"] + "\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>"; 

        	html += "<img height=\"50px\" align=\"right\"><h2 style=\"font-family: Arial\">"+token[i]["title"]+" ("+token[i]["type"]+")"+"</h2><h3 style=\"font-family: Arial\">"; 

	        html += token[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + token[i]["rating"] + "</font> </div>";
	}
	bodyDiv.innerHTML = html;
}

var filterFeed = function(){
	var count = 0;
	html = "";
	if (filt == 1) {
		for (i = 0; count < 20 && i < token.length; i++) {
			if (token[i]["type"] == 'song') {
				html += "<div id:\"" + i + "\" onclick=\"window.location=\'/user/" + token[i]["userId"] + "\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>"; 

        			html += "<img height=\"50px\" align=\"right\"><h2 style=\"font-family: Arial\">"+token[i]["title"]+" ("+token[i]["type"]+")"+"</h2><h3 style=\"font-family: Arial\">"; 
	
			        html += token[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + token[i]["rating"] + "</font> </div>";
		
			}
			count++;
		}
	}
	if (filt == 2) {
		for (i = 0; count < 20 && i < token.length; i++) {
			if (token[i]["type"] == 'movie') {
				html += "<div id:\"" + i + "\" onclick=\"window.location=\'/user/" + token[i]["userId"] + "\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>"; 

        			html += "<img height=\"50px\" align=\"right\"><h2 style=\"font-family: Arial\">"+token[i]["title"]+" ("+token[i]["type"]+")"+"</h2><h3 style=\"font-family: Arial\">"; 
	
			        html += token[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + token[i]["rating"] + "</font> </div>";
		
			}
			count++;
		}
	}
	if (filt == 3) {
		for (i = 0; count < 20 && i < token.length; i++) {
			if (token[i]["type"] == 'game') {
				html += "<div id:\"" + i + "\" onclick=\"window.location=\'/user/" + token[i]["userId"] + "\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>"; 

        			html += "<img height=\"50px\" align=\"right\"><h2 style=\"font-family: Arial\">"+token[i]["title"]+" ("+token[i]["type"]+")"+"</h2><h3 style=\"font-family: Arial\">"; 
	
			        html += token[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + token[i]["rating"] + "</font> </div>";
		
			}
			count++;
		}
	}
	if (filt == 4) {
		for (i = 0; i < 20 && i < token.length; i++) {
			if (token[i]["type"] == 'book') {
				html += "<div id:\"" + i + "\" onclick=\"window.location=\'/user/" + token[i]["userId"] + "\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>"; 

        			html += "<img height=\"50px\" align=\"right\"><h2 style=\"font-family: Arial\">"+token[i]["title"]+" ("+token[i]["type"]+")"+"</h2><h3 style=\"font-family: Arial\">"; 
	
			        html += token[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + token[i]["rating"] + "</font> </div>";
		
			}
			count++;
		}
	}
	bodyDiv.innerHTML = html;
}
