var request = new XMLHttpRequest();
request.open('GET', "/getMovie");
request.responseType = 'json';
request.onload = function() {
	var bodyDiv = document.getElementById("movInfo");
	json = request.response;
    //var json = JSON.parse(movieObj);

	var html = "";

		html += "<h1 style=\"font-size: 3.5em; text-align: center; margin-top: 3%\">" + json["title"] + "</h1>";

        html += "<div width=\"60%\" style=\"margin-top: 5%; margin-left: 24%\">";

        html += "<img style=\"height: 500px; float: left; margin-right: 8%;\" src=\"https://image.tmdb.org/t/p/w500/" + json["poster_path"] + "\" />";


		html += "<h3 style=\"font-size: 2em; margin-bottom: 3%; font-family: arial; width: 80%;\">average score: <font color=\"#78dc52\">" + json["vote_average"] + "</font></h3>";

		html += "<h5 style=\"font-family: arial; font-size: 1.4em; width: 70%; margin-bottom: 4%;\">" + json["overview"] + "</h5>";

		html += "<h5 style=\"font-family: arial; color: #6297bc; font-size: 1.4em; width: 70%;\">release date - " + json["release_date"] + "</h5>";

		html += "<h5 style=\"font-family: arial; color: #ee5622; font-size: 1.4em; width: 70%;\">runtime - " + json["runtime"] + " minutes</h5>";
        //html += "</p>";


        html += "</div>";
  
		bodyDiv.innerHTML = html;
		var titleInput = document.createElement('input');
	    titleInput.setAttribute('type','hidden');
	    titleInput.setAttribute('name','title');
	    titleInput.setAttribute('value', json["title"]);
        if (document.getElementById('reviewForm') != null)
	    document.getElementById('reviewForm').appendChild(titleInput);

	bodyDiv.innerHTML = html;

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

var reviewsfunc = function(){
    var bodyDiv = document.getElementById("movieReviewsList");
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

        html += reviews[i]["reviewTxt"] + "</h3> <span><font color=\"#dd4300\"> rating </font> : " + reviews[i]["rating"] + "</span><span style=\"margin-left:75%\"><font color=\"#dd4300\">user</font>: "+reviews[i]["username"]+"</span></font> </div>";
    }

    bodyDiv.innerHTML = html;

        }
request.send();
