//GET Spotify api Key
var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var request3 = new XMLHttpRequest();
request2.open('GET', "/username");
request2.responseType = 'json';
var name = "";
request2.onload = function() {
	name = request2.response[0]["username"];
}
request2.send();

request3.open('GET', "/followCheck");
request3.responseType = 'text';
var follows = "";
request3.onload = function() {
	follows = request3.response;
}
request3.send();
console.log("followcheck sent");
console.log(follows);
if (follows.length > 0) {
	document.getElementById('followButton').style.display = 'none';
	document.getElementById('unfollowButton').style.display = 'block';
} else  {
	document.getElementById('followButton').style.display = 'block';
	document.getElementById('unfollowButton').style.display = 'none';
}

request.open('GET', "/userReviews");
request.responseType = 'json';
var token = "";
request.onload = function() {
  token = request.response;
  reviewList();
};

request.send();
var bodyDiv = document.getElementById("userReviewList");
var html = "";

var reviewList = function(){
	html += "<h1 style=\"margin-left: 20%; margin-bottom 2%; 50%; background-color: \'white\';\";>" + name + "\'s Reviews</h1>";
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


