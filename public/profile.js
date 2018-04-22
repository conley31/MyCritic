var request = new XMLHttpRequest();
request.open('GET', "/profileReviews");
request.responseType = 'json';
var token = "";
request.onload = function() {
  token = request.response;
  reviewList();
};

request.send();
var bodyDiv = document.getElementById("reviewsList");
var html = "";

var reviewList = function(){
	var display = 0;
	if(token.length > 20){
		display = 20;
	}
	else {
		display = token.length;
	}

	for(i = 0; i < display; i++){
		html += "<div id:\"" + i + "\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>" 

		//add back for the type src=\"./staticImages/movieIcon.jpg\"
        html += "<img height=\"50px\" align=\"right\"><h2 style=\"font-family: Arial\">"+token[i]["title"]+" ("+token[i]["type"]+")"+"</h2><h3 style=\"font-family: Arial\">" 

        html += token[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + token[i]["rating"] + "</font> </div>";
	}

	bodyDiv.innerHTML = html;
}


var reviews = function(){
	document.getElementById("deleteAccount").style.display = 'none';
	document.getElementById("reviewsList").style.display = 'block';
	document.getElementById("changePassword").style.display = 'none';
}

var deleteAccount = function(){
	document.getElementById("deleteAccount").style.display = 'block';
	document.getElementById("reviewsList").style.display = 'none';
	document.getElementById("changePassword").style.display = 'none';
}

var changePassword = function(){
	document.getElementById("deleteAccount").style.display = 'none';
	document.getElementById("reviewsList").style.display = 'none';
	document.getElementById("changePassword").style.display = 'block';
}