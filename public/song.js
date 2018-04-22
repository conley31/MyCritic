var request3 = new XMLHttpRequest();
request3.open('GET', "/averages");
request3.responseType = 'json';
var average = "";
request3.onload = function(){
    if(request3.response[0]["AVG(rating)"] == null){
        average = "No MyCritic Ratings";
    }
    else {
        average = request3.response[0]["AVG(rating)"];
    }
    request.send();
}

request3.send();

var request = new XMLHttpRequest();
request.open('GET', "/getSong");
request.responseType = 'json';
var songObj;
request.onload = function() {
  songObj = request.response;
  populateHtml();
};

var populateHtml = function(){
    console.log(songObj);
    var bodyDiv = document.getElementById("songInfo");
    var html = "<h1 id=\"title\" style=\"text-align: center; margin-bottom: 2%\">" + songObj["name"] + "</h1>";
        html += "<p style=\"text-align: center; margin-bottom: 2%;\"><a href=\"" + songObj["preview_url"] + "\"><img width=\"500px\" src=\"" + songObj["album"]["images"][0]["url"] + "\" /></a></p>"
		html += "<h3 id=\"artist\" style=\"text-align: center;\">" + songObj["artists"][0]["name"] + "</h3>";
        html += "<h3 style=\"text-align: center; font-size: 2em; font-family: arial; width: 100%;\">The Movie Databse Average Score: <font color=\"#78dc52\">" + songObj["popularity"] + "</font></h3>";
        html += "<h3 style=\"text-align: center; font-size: 2em; margin-bottom: 3%; font-family: arial; width: 100%;\">MyCritic Average Score: <font color=\"#78dc52\">" + average + "</font></h3>";


		bodyDiv.innerHTML = html;
		//add hidden field to pass the title without having to make another api request
	    var titleInput = document.createElement('input');
	    titleInput.setAttribute('type','hidden');
	    titleInput.setAttribute('name','title');
	    titleInput.setAttribute('value', songObj["name"]);
        if (document.getElementById('reviewForm') != null){
            console.log('not null');
	        document.getElementById('reviewForm').appendChild(titleInput);
        }
}

var request2 = new XMLHttpRequest();
request2.open('GET', "/mediaReviews");
request2.responseType = 'json';
var reviews = "";
request2.onload = function() {
  reviews = request2.response;
  reviewsfunc();
};

request2.send();
var songInfo = function(){
	//initilize spotify api
	var spotifyApi = new SpotifyWebApi();
	spotifyApi.setAccessToken(token);
	var songName = window.location.pathname;
	var songName = songName.slice(6, songName.length);

	var bodyDiv = document.getElementById("songInfo");

	prev = spotifyApi.getTrack(songName);
	prev.then(function(data) {
		var html = "<h1 id=\"title\" style=\"text-align: center;\">" + data["name"] + "</h1>";
		html += "<h3 id=\"artist\" style=\"text-align: center;\"><font color=\"green\">Artist: </font>" + data["artists"][0]["name"] + "</h3>";
		html += "<h4 id=\"popularity\" style=\"text-align: center; padding-bottom: 2%;\"><font color=\"orange\">Rating: </font>" + data["popularity"] + "%</h4>";
        html += "<img style=\"margin-left: 37%; margin-bottom: 2%;\" width=25% src=\"" + data["album"]["images"][0]["url"] + "\" />";


		bodyDiv.innerHTML = html;

	}, function(err) {
		console.error(err);
	});


}

var reviewsfunc = function(){
	var bodyDiv = document.getElementById("songReviewList");
	var html = "";
	var display = 0;
	if(reviews.length > 20){
		display = 20;
	}
	else {
		display = reviews.length;
	}

	for(i = 0; i < display; i++){
        html += "<div id=\"" + i + "\" onclick=\"window.location=\'/user/"+reviews[i]["userId"] +"\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>"

        //add back for the type src=\"./staticImages/movieIcon.jpg\"
        html += "<img height=\"50px\" align=\"right\"><h3 style=\"font-family: Arial\">"

        html += reviews[i]["reviewTxt"] + "</h3> <span><font color=\"#dd4300\"> rating </font> : " + reviews[i]["rating"] + "</span><span style=\"margin-left:75%\"><font color=\"#dd4300\">user</font>: <u onmouseover=\"this.style.cursor='pointer'\">"+reviews[i]["username"]+"</u></span></font> </div>";
    }

	bodyDiv.innerHTML = html;
}
