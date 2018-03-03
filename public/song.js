var request = new XMLHttpRequest();
request.open('GET', "/access");
request.responseType = 'text';
var token = "";
request.onload = function() {
  token = request.response;
  songInfo();
};

var request2 = new XMLHttpRequest();
request2.open('GET', "/mediaReviews");
request2.responseType = 'json';
var reviews = "";
request2.onload = function() {
  reviews = request2.response;
  reviews();
};

request.send();
request2.send();
var songInfo = function(){
	//initilize spotify api
	var spotifyApi = new SpotifyWebApi();
	spotifyApi.setAccessToken(token);
	var songName = window.location.pathname;
	var songName = songName.slice(6, songName.length);
	
	console.log(songName);
	var bodyDiv = document.getElementById("songInfo");

	prev = spotifyApi.getTrack(songName);
	prev.then(function(data) {
		var html = "<h1 id=\"title\" style=\"margin-left: 10%\">" + data["name"] + "</h1>";
		html += "<h3 id=\"artist\" style=\"margin-left: 10%\">" + data["artists"][0]["name"] + "</h3>";
		html += "<h5 id=\"popularity\" style=\"margin-left: 10%\">Popularity " + data["popularity"] + "</h5>";
				
		bodyDiv.innerHTML = html;
		// ...render list of search results...
		console.log(data);
	
	}, function(err) {
		console.error(err);
	});
}

var reviews = function(){
	var bodyDiv = document.getElementById("userReviewList");
	var html = "";
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
        html += "<img height=\"50px\" align=\"right\"><h3 style=\"font-family: Arial\">" 

        html += reviews[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + reviews[i]["rating"] + "</font> </div>";
	}

	bodyDiv.innerHTML = html;
}